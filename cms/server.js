const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { spawn } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const contentsPath = path.join(rootDir, "data", "contents.json");
const authPath = path.join(__dirname, "auth.json");
const imagesDir = path.join(rootDir, "public", "images", "contents");
const publicDir = path.join(__dirname, "public");
const port = Number(process.env.CMS_PORT || 4173);

const categories = [
  "親子開箱",
  "玩具收藏",
  "美食旅行",
  "生活用品",
  "3C與收納",
  "野狗日常"
];
const narrators = ["野狗媽", "野狗爸", "野狗爸 × 野狗媽", "野狗軍團"];
const statuses = ["published", "draft", "coming-soon"];
const sessions = new Map();
const sessionMaxAgeSeconds = 60 * 60 * 8;

function parseCookies(request) {
  return String(request.headers.cookie || "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((cookies, part) => {
      const index = part.indexOf("=");
      if (index >= 0) {
        cookies[part.slice(0, index)] = decodeURIComponent(part.slice(index + 1));
      }
      return cookies;
    }, {});
}

function loadAuth() {
  return JSON.parse(fs.readFileSync(authPath, "utf8"));
}

function hashPassword(salt, password) {
  return crypto.createHash("sha256").update(`${salt}:${password}`).digest("hex");
}

function verifyPassword(password, auth) {
  const attempted = Buffer.from(hashPassword(auth.salt, password), "hex");
  const expected = Buffer.from(auth.passwordHash, "hex");

  return (
    attempted.length === expected.length &&
    crypto.timingSafeEqual(attempted, expected)
  );
}

function createSession(username) {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, {
    username,
    expiresAt: Date.now() + sessionMaxAgeSeconds * 1000
  });
  return token;
}

function isAuthenticated(request) {
  const token = parseCookies(request).wilddog_cms_session;
  const session = token ? sessions.get(token) : null;

  if (!session) {
    return false;
  }

  if (session.expiresAt < Date.now()) {
    sessions.delete(token);
    return false;
  }

  return true;
}

function requireAuth(request, response) {
  if (isAuthenticated(request)) {
    return true;
  }

  if (request.url.startsWith("/api/")) {
    sendJson(response, 401, { ok: false, error: "Unauthorized" });
  } else {
    response.writeHead(302, { Location: "/login" });
    response.end();
  }

  return false;
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 10_000_000) {
        request.destroy();
        reject(new Error("Request body is too large."));
      }
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload, null, 2));
}

function sendFile(response, filePath, contentType) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "Content-Type": contentType });
    response.end(data);
  });
}

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".html") return "text/html; charset=utf-8";
  if (extension === ".css") return "text/css; charset=utf-8";
  if (extension === ".js") return "text/javascript; charset=utf-8";
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".webp") return "image/webp";
  if (extension === ".png") return "image/png";
  return "application/octet-stream";
}

function loadContents() {
  return JSON.parse(fs.readFileSync(contentsPath, "utf8"));
}

function saveContents(contents) {
  fs.writeFileSync(contentsPath, JSON.stringify(contents, null, 2) + "\n");
}

function slugify(input) {
  const fallback = `post-${Date.now()}`;
  const slug = String(input || "")
    .trim()
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function normalizePost(post) {
  const slug = slugify(post.slug || post.title);
  const category = categories.includes(post.category) ? post.category : "野狗日常";
  const narrator = narrators.includes(post.narrator) ? post.narrator : "野狗軍團";
  const status = statuses.includes(post.status) ? post.status : "draft";

  return {
    id: slug,
    title: String(post.title || "未命名文章").trim(),
    slug,
    category,
    excerpt: String(post.excerpt || "").trim(),
    coverImage: String(post.coverImage || `/images/contents/${slug}.png`).trim(),
    imageAlt: String(post.imageAlt || `${post.title || "文章"}縮圖`).trim(),
    narrator,
    date: String(post.date || new Date().toISOString().slice(0, 10)),
    tags: Array.isArray(post.tags)
      ? post.tags.map(String).filter(Boolean)
      : String(post.tags || "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
    bodyHtml: String(post.bodyHtml || "").trim(),
    platform: String(post.platform || "Mobile01").trim(),
    link: String(post.link || "").trim() || `/posts/${slug}`,
    featured: Boolean(post.featured),
    status
  };
}

function saveImage(payload) {
  if (!payload || !payload.dataUrl || !payload.filename) {
    return null;
  }

  const match = String(payload.dataUrl).match(/^data:image\/(png|jpeg|webp);base64,(.+)$/);
  if (!match) {
    throw new Error("Only PNG, JPG, and WebP images are supported.");
  }

  const extension = match[1] === "jpeg" ? "jpg" : match[1];
  const filename = `${slugify(payload.filename).replace(/\.(png|jpg|jpeg|webp)$/i, "")}.${extension}`;
  fs.mkdirSync(imagesDir, { recursive: true });
  fs.writeFileSync(path.join(imagesDir, filename), Buffer.from(match[2], "base64"));
  return `/images/contents/${filename}`;
}

function runBuild(response) {
  const child = spawn("npm", ["run", "build"], {
    cwd: rootDir,
    shell: true
  });
  let output = "";

  child.stdout.on("data", (data) => {
    output += data.toString();
  });
  child.stderr.on("data", (data) => {
    output += data.toString();
  });
  child.on("close", (code) => {
    sendJson(response, code === 0 ? 200 : 500, {
      ok: code === 0,
      output
    });
  });
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://localhost:${port}`);

    if (request.method === "GET" && url.pathname === "/login") {
      sendFile(response, path.join(publicDir, "login.html"), "text/html; charset=utf-8");
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/login") {
      const body = await readJsonBody(request);
      const auth = loadAuth();

      if (body.username === auth.username && verifyPassword(body.password || "", auth)) {
        const token = createSession(auth.username);
        response.writeHead(200, {
          "Content-Type": "application/json; charset=utf-8",
          "Set-Cookie": `wilddog_cms_session=${token}; HttpOnly; SameSite=Lax; Max-Age=${sessionMaxAgeSeconds}; Path=/`
        });
        response.end(JSON.stringify({ ok: true }));
        return;
      }

      sendJson(response, 401, { ok: false, error: "帳號或密碼錯誤" });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/logout") {
      const token = parseCookies(request).wilddog_cms_session;
      if (token) {
        sessions.delete(token);
      }
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Set-Cookie": "wilddog_cms_session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/"
      });
      response.end(JSON.stringify({ ok: true }));
      return;
    }

    if (request.method === "GET" && url.pathname === "/") {
      if (!requireAuth(request, response)) return;
      sendFile(response, path.join(publicDir, "index.html"), "text/html; charset=utf-8");
      return;
    }

    if (request.method === "GET" && url.pathname === "/cms.css") {
      sendFile(response, path.join(publicDir, "cms.css"), "text/css; charset=utf-8");
      return;
    }

    if (request.method === "GET" && url.pathname === "/cms.js") {
      sendFile(response, path.join(publicDir, "cms.js"), "text/javascript; charset=utf-8");
      return;
    }

    if (request.method === "GET" && url.pathname.startsWith("/images/")) {
      const imagePath = path.join(rootDir, "public", url.pathname);
      sendFile(response, imagePath, getContentType(imagePath));
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/meta") {
      if (!requireAuth(request, response)) return;
      sendJson(response, 200, { categories, narrators, statuses });
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/posts") {
      if (!requireAuth(request, response)) return;
      sendJson(response, 200, loadContents());
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/posts") {
      if (!requireAuth(request, response)) return;
      const body = await readJsonBody(request);
      const contents = loadContents();
      const post = normalizePost(body.post || {});
      const imagePath = saveImage(body.image);

      if (imagePath) {
        post.coverImage = imagePath;
      }

      const existingIndex = contents.findIndex(
        (item) => item.id === body.originalId || item.id === post.id
      );
      if (existingIndex >= 0) {
        contents[existingIndex] = post;
      } else {
        contents.unshift(post);
      }

      saveContents(contents);
      sendJson(response, 200, { ok: true, post });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/upload-image") {
      if (!requireAuth(request, response)) return;
      const body = await readJsonBody(request);
      const imagePath = saveImage(body.image);
      sendJson(response, 200, { ok: true, imagePath });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/delete") {
      if (!requireAuth(request, response)) return;
      const body = await readJsonBody(request);
      const contents = loadContents().filter((item) => item.id !== body.id);
      saveContents(contents);
      sendJson(response, 200, { ok: true });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/build") {
      if (!requireAuth(request, response)) return;
      runBuild(response);
      return;
    }

    response.writeHead(404);
    response.end("Not found");
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`WildDogHere CMS running at http://127.0.0.1:${port}`);
});
