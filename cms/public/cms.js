const state = {
  posts: [],
  meta: {
    categories: [],
    narrators: [],
    statuses: []
  },
  currentId: null,
  imageUpload: null,
  watermarkLogo: null
};

const form = document.querySelector("#postForm");
const postList = document.querySelector("#postList");
const searchInput = document.querySelector("#searchInput");
const imageInput = document.querySelector("#imageInput");
const imagePreview = document.querySelector("#imagePreview");
const imageFallback = document.querySelector("#imageFallback");
const previewCard = document.querySelector("#previewCard");
const saveState = document.querySelector("#saveState");
const buildOutput = document.querySelector("#buildOutput");
const bodyEditor = document.querySelector("#bodyEditor");
const inlineImageInput = document.querySelector("#inlineImageInput");
const watermarkEnabled = document.querySelector("#watermarkEnabled");

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function getWatermarkLogo() {
  if (state.watermarkLogo) {
    return state.watermarkLogo;
  }

  try {
    state.watermarkLogo = await loadImage("/images/brand/wilddoghere-watermark.png");
  } catch {
    state.watermarkLogo = null;
  }

  return state.watermarkLogo;
}

function roundedRect(context, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.arcTo(x + width, y, x + width, y + height, safeRadius);
  context.arcTo(x + width, y + height, x, y + height, safeRadius);
  context.arcTo(x, y + height, x, y, safeRadius);
  context.arcTo(x, y, x + width, y, safeRadius);
  context.closePath();
}

async function prepareImageUpload(file, preferredName) {
  const originalDataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  if (!watermarkEnabled.checked) {
    return {
      filename: preferredName || file.name,
      dataUrl: originalDataUrl,
      previewUrl: originalDataUrl
    };
  }

  const image = await loadImage(originalDataUrl);
  const maxSize = 1800;
  const scale = Math.min(1, maxSize / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  const logo = await getWatermarkLogo();
  const edge = Math.max(16, Math.round(width * 0.018));
  const badgeWidth = Math.min(Math.max(320, Math.round(width * 0.38)), Math.round(width - edge * 2));
  const badgeHeight = Math.max(74, Math.round(badgeWidth * 0.2));
  const x = width - badgeWidth - edge;
  const y = height - badgeHeight - edge;
  const radius = Math.round(badgeHeight * 0.22);

  context.save();
  roundedRect(context, x, y, badgeWidth, badgeHeight, radius);
  context.fillStyle = "rgba(47, 33, 27, 0.58)";
  context.fill();

  const logoSize = Math.round(badgeHeight * 0.72);
  const logoX = x + Math.round(edge * 0.75);
  const logoY = y + Math.round((badgeHeight - logoSize) / 2);

  if (logo) {
    context.globalAlpha = 0.78;
    context.drawImage(logo, logoX, logoY, logoSize, logoSize);
    context.globalAlpha = 1;
  }

  const textX = logo ? logoX + logoSize + Math.round(edge * 0.55) : x + edge;
  const brandSize = Math.max(18, Math.round(badgeHeight * 0.26));
  const subSize = Math.max(13, Math.round(badgeHeight * 0.18));
  context.fillStyle = "rgba(255, 248, 234, 0.95)";
  context.font = `800 ${brandSize}px "Noto Sans TC", "Microsoft JhengHei", sans-serif`;
  context.fillText("WildDogHere", textX, y + Math.round(badgeHeight * 0.43));
  context.font = `700 ${subSize}px "Noto Sans TC", "Microsoft JhengHei", sans-serif`;
  context.fillText("野狗軍團出沒中", textX, y + Math.round(badgeHeight * 0.69));
  context.restore();

  const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
  const baseName = String(preferredName || file.name || "wilddoghere-image")
    .replace(/\.(png|jpg|jpeg|webp)$/i, "")
    .replace(/\s+/g, "-");

  return {
    filename: `${baseName}.jpg`,
    dataUrl,
    previewUrl: dataUrl
  };
}

async function readJson(response) {
  if (response.status === 401) {
    window.location.href = "/login";
    throw new Error("請先登入後台。");
  }

  return response.json();
}

function slugify(value) {
  const slug = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `post-${Date.now()}`;
}

function extractFirstBodyImageSrc(html) {
  const template = document.createElement("template");
  template.innerHTML = html || "";
  const image = template.content.querySelector("img[src]");
  return image ? image.getAttribute("src") || "" : "";
}

function getYouTubeVideoId(input) {
  try {
    const url = new URL(String(input || "").trim());
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] || "";
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v") || "";
      }

      const parts = url.pathname.split("/").filter(Boolean);
      if (["embed", "shorts", "live"].includes(parts[0])) {
        return parts[1] || "";
      }
    }
  } catch {
    return "";
  }

  return "";
}

function insertHtmlAtCursor(html) {
  bodyEditor.focus();
  document.execCommand("insertHTML", false, html);
  form.elements.bodyHtml.value = bodyEditor.innerHTML.trim();
  updatePreview();
  saveState.textContent = "尚未儲存";
}

function getFormData() {
  const data = new FormData(form);
  const bodyHtml = bodyEditor.innerHTML.trim();
  const coverImage = String(data.get("coverImage") || "").trim() || extractFirstBodyImageSrc(bodyHtml);

  return {
    id: data.get("slug"),
    title: data.get("title"),
    slug: data.get("slug"),
    category: data.get("category"),
    excerpt: data.get("excerpt"),
    coverImage,
    imageAlt: data.get("imageAlt"),
    narrator: data.get("narrator"),
    date: data.get("date"),
    tags: String(data.get("tags") || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    bodyHtml,
    platform: data.get("platform"),
    link: data.get("link"),
    featured: data.get("featured") === "on",
    status: data.get("status")
  };
}

function setOptions(name, values) {
  const select = form.elements[name];
  select.innerHTML = values
    .map((value) => `<option value="${value}">${value}</option>`)
    .join("");
}

function setFormData(post) {
  form.elements.title.value = post.title || "";
  form.elements.slug.value = post.slug || "";
  form.elements.category.value = post.category || state.meta.categories[0];
  form.elements.excerpt.value = post.excerpt || "";
  form.elements.coverImage.value = post.coverImage || "";
  form.elements.imageAlt.value = post.imageAlt || "";
  form.elements.narrator.value = post.narrator || state.meta.narrators[0];
  form.elements.date.value = post.date || new Date().toISOString().slice(0, 10);
  form.elements.tags.value = Array.isArray(post.tags) ? post.tags.join(", ") : "";
  bodyEditor.innerHTML = post.bodyHtml || "";
  form.elements.bodyHtml.value = post.bodyHtml || "";
  form.elements.platform.value = post.platform || "Mobile01";
  form.elements.link.value = post.link || "#";
  form.elements.featured.checked = Boolean(post.featured);
  form.elements.status.value = post.status || "draft";
  state.currentId = post.id || post.slug || null;
  state.imageUpload = null;
  imageInput.value = "";
  updatePreview();
  updateImagePreview();
  saveState.textContent = "尚未儲存";
}

function newPost() {
  const today = new Date().toISOString().slice(0, 10);
  setFormData({
    id: "",
    title: "",
    slug: "",
    category: "野狗日常",
    excerpt: "",
    coverImage: "",
    imageAlt: "",
    narrator: "野狗軍團",
    date: today,
    tags: [],
    platform: "Mobile01",
    link: "#",
    featured: false,
    status: "draft"
  });
}

function renderList() {
  const keyword = searchInput.value.trim().toLowerCase();
  const posts = state.posts.filter((post) => {
    const haystack = [
      post.title,
      post.category,
      post.platform,
      post.narrator,
      ...(post.tags || [])
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(keyword);
  });

  postList.innerHTML = posts
    .map(
      (post) => `
        <button class="post-button ${post.id === state.currentId ? "active" : ""}" data-id="${post.id}">
          <strong>${post.title || "未命名文章"}</strong>
          <span>${post.category} · ${post.date} · ${post.status}</span>
        </button>
      `
    )
    .join("");
}

function updateImagePreview() {
  const src = form.elements.coverImage.value;
  if (!src) {
    imagePreview.removeAttribute("src");
    imagePreview.style.display = "none";
    imageFallback.style.display = "block";
    return;
  }

  imagePreview.src = src;
  imagePreview.style.display = "block";
  imageFallback.style.display = "none";
}

function updatePreview() {
  const post = getFormData();
  const imageHtml = post.coverImage
    ? `<img src="${post.coverImage}" alt="${post.imageAlt || ""}" onerror="this.style.display='none'" />`
    : "";
  const tags = post.tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join("");
  const hasBody = Boolean(post.bodyHtml.trim());
  const action =
    post.status === "published"
      ? hasBody
        ? "閱讀站內文章"
        : "閱讀外部原文"
      : "內容準備中";
  const body = post.bodyHtml
    ? `<div class="preview-content">${post.bodyHtml}</div>`
    : `<div class="preview-content"><p>文章內文預覽會顯示在這裡。</p></div>`;

  previewCard.innerHTML = `
    <div class="preview-image">
      <div class="preview-fallback">${post.category || "文章縮圖"}</div>
      ${imageHtml}
    </div>
    <div class="preview-body">
      <div class="chips">
        <span class="chip">${post.category || "未分類"}</span>
        <span class="chip">${post.date || ""}</span>
      </div>
      <h3>${post.title || "文章標題"}</h3>
      <div class="meta">
        <span>敘事者：${post.narrator || ""}</span>
        <span>平台：${post.platform || ""}</span>
      </div>
      <p>${post.excerpt || "文章摘要會顯示在這裡。"}</p>
      <div class="tags">${tags}</div>
      ${body}
      <p><strong>${action}</strong></p>
    </div>
  `;
}

async function loadAll() {
  const [metaResponse, postsResponse] = await Promise.all([
    fetch("/api/meta"),
    fetch("/api/posts")
  ]);
  state.meta = await readJson(metaResponse);
  state.posts = await readJson(postsResponse);
  setOptions("category", state.meta.categories);
  setOptions("narrator", state.meta.narrators);
  setOptions("status", state.meta.statuses);
  renderList();
  setFormData(state.posts[0] || {});
}

form.addEventListener("input", (event) => {
  if (event.target.name === "title" && !form.elements.slug.value) {
    form.elements.slug.value = slugify(event.target.value);
  }

  if (event.target.name === "slug") {
    form.elements.slug.value = slugify(event.target.value);
  }

  if (event.target.name === "coverImage") {
    updateImagePreview();
  }

  updatePreview();
  saveState.textContent = "尚未儲存";
});

bodyEditor.addEventListener("input", () => {
  form.elements.bodyHtml.value = bodyEditor.innerHTML.trim();
  updatePreview();
  saveState.textContent = "尚未儲存";
});

document.querySelectorAll(".toolbar [data-command]").forEach((button) => {
  button.addEventListener("click", () => {
    bodyEditor.focus();
    document.execCommand(button.dataset.command, false, button.dataset.value || null);
    form.elements.bodyHtml.value = bodyEditor.innerHTML.trim();
    updatePreview();
  });
});

document.querySelector("#insertLinkButton").addEventListener("click", () => {
  const url = prompt("請貼上連結網址");
  if (!url) return;
  bodyEditor.focus();
  document.execCommand("createLink", false, url);
  form.elements.bodyHtml.value = bodyEditor.innerHTML.trim();
  updatePreview();
});

document.querySelector("#insertYoutubeButton").addEventListener("click", () => {
  const url = prompt("請貼上 YouTube 影片網址");
  if (!url) return;

  const videoId = getYouTubeVideoId(url);
  if (!videoId) {
    alert("無法辨識這個 YouTube 網址，請使用 youtube.com/watch、youtube.com/shorts 或 youtu.be 連結。");
    return;
  }

  const title = prompt("影片標題（可留空）") || "WildDogHere YouTube video";
  insertHtmlAtCursor(`
    <div class="youtube-embed">
      <iframe
        src="https://www.youtube.com/embed/${videoId}"
        title="${title.replace(/"/g, "&quot;")}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
    <p><br></p>
  `);
});

document.querySelector("#insertImageButton").addEventListener("click", () => {
  inlineImageInput.click();
});

inlineImageInput.addEventListener("change", () => {
  const file = inlineImageInput.files[0];
  if (!file) return;
  const slug = form.elements.slug.value || slugify(form.elements.title.value) || "article";
  saveState.textContent = "圖片處理中...";

  prepareImageUpload(file, `${slug}-${Date.now()}`).then(async (upload) => {
    const slug = form.elements.slug.value || slugify(form.elements.title.value);
    const response = await fetch("/api/upload-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: {
          filename: upload.filename,
          dataUrl: upload.dataUrl
        }
      })
    });
    const result = await readJson(response);
    if (!result.ok) {
      alert(result.error || "圖片上傳失敗");
      return;
    }

    bodyEditor.focus();
    document.execCommand("insertImage", false, result.imagePath);
    form.elements.bodyHtml.value = bodyEditor.innerHTML.trim();
    updatePreview();
    inlineImageInput.value = "";
    saveState.textContent = "尚未儲存";
  }).catch((error) => {
    alert(error.message || "圖片處理失敗");
    saveState.textContent = "圖片處理失敗";
  });
});

postList.addEventListener("click", (event) => {
  const button = event.target.closest(".post-button");
  if (!button) return;
  const post = state.posts.find((item) => item.id === button.dataset.id);
  if (post) {
    setFormData(post);
    renderList();
  }
});

searchInput.addEventListener("input", renderList);

document.querySelector("#newPostButton").addEventListener("click", () => {
  newPost();
  renderList();
});

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const slug = form.elements.slug.value || slugify(form.elements.title.value) || "article-cover";
  saveState.textContent = "圖片處理中...";

  prepareImageUpload(file, slug).then((upload) => {
    state.imageUpload = {
      filename: upload.filename,
      dataUrl: upload.dataUrl
    };
    form.elements.coverImage.value = `/images/contents/${upload.filename}`;
    imagePreview.src = upload.previewUrl;
    imagePreview.style.display = "block";
    imageFallback.style.display = "none";
    updatePreview();
    saveState.textContent = "尚未儲存";
  }).catch((error) => {
    alert(error.message || "圖片處理失敗");
    saveState.textContent = "圖片處理失敗";
  });
});

async function savePost(statusOverride) {
  if (statusOverride) {
    form.elements.status.value = statusOverride;
    updatePreview();
  }

  saveState.textContent = "儲存中...";
  const post = getFormData();
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      originalId: state.currentId,
      post,
      image: state.imageUpload
        ? {
            ...state.imageUpload,
            filename: post.slug || state.imageUpload.filename
          }
        : null
    })
  });
  const result = await readJson(response);
  if (!result.ok) {
    saveState.textContent = "儲存失敗";
    alert(result.error || "儲存失敗");
    return null;
  }

  state.imageUpload = null;
  const postsResponse = await fetch("/api/posts");
  state.posts = await readJson(postsResponse);
  setFormData(result.post);
  renderList();
  saveState.textContent =
    result.post.status === "published" ? "已儲存在 CMS，正式網站尚未更新" : "已儲存";
  return result.post;
}

async function publishSite(post) {
  const publishButton = document.querySelector("#publishButton");
  publishButton.disabled = true;
  publishButton.textContent = "正在一鍵發布...";
  buildOutput.textContent = [
    "正在更新正式網站...",
    "1. 檢查 CMS 資料",
    "2. 檢查 TypeScript",
    "3. 建置網站",
    "4. 建立 Git commit",
    "5. 推送到 GitHub",
    "6. 等待 Vercel 自動部署"
  ].join("\n");

  try {
    const response = await fetch("/api/publish-site", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post })
    });
    const result = await readJson(response);
    buildOutput.textContent = result.output || result.error || "沒有輸出";

    if (!result.ok) {
      saveState.textContent = "正式更新失敗";
      alert("文章已儲存，但正式網站更新失敗。請查看下方檢查結果。");
      return false;
    }

    if (result.liveOk === false) {
      saveState.textContent = "已推送，等待 Vercel";
      alert("文章已推送到 GitHub，但正式網站尚未確認完成。請查看下方結果，稍後重新整理正式網址。");
    } else {
      saveState.textContent = result.skipped ? "正式網站已確認" : "已發布到正式網站";
    }
    if (result.postUrl) {
      buildOutput.textContent += `\n\n正式文章網址：${result.postUrl}`;
    }
    return true;
  } finally {
    publishButton.disabled = false;
    publishButton.textContent = "一鍵發布到正式網站";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const post = await savePost();

  if (post?.status === "published") {
    buildOutput.textContent = [
      "這篇文章已儲存在 CMS，但正式網站還不會更新。",
      "正式網站需要 commit / push 到 GitHub，並等待 Vercel 部署。",
      "",
      "若要現在更新正式網站，請按「確定」執行一鍵發布。"
    ].join("\n");

    if (confirm("文章已儲存在 CMS，但正式網站尚未更新。要現在一鍵發布到正式網站嗎？")) {
      await publishSite(post);
    }
  }
});

document.querySelector("#saveDraftButton").addEventListener("click", async () => {
  await savePost("draft");
});

document.querySelector("#publishButton").addEventListener("click", async () => {
  const post = await savePost("published");
  if (post) {
    await publishSite(post);
  }
});

document.querySelector("#deleteButton").addEventListener("click", async () => {
  const post = getFormData();
  if (!state.currentId || !confirm(`確定刪除「${post.title}」？`)) return;
  await fetch("/api/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: state.currentId })
  });
  const postsResponse = await fetch("/api/posts");
  state.posts = await readJson(postsResponse);
  renderList();
  setFormData(state.posts[0] || {});
});

document.querySelector("#buildButton").addEventListener("click", async () => {
  buildOutput.textContent = "建置中...";
  const response = await fetch("/api/build", { method: "POST" });
  const result = await readJson(response);
  buildOutput.textContent = result.output || result.error || "沒有輸出";
});

document.querySelector("#logoutButton").addEventListener("click", async () => {
  await fetch("/api/logout", { method: "POST" });
  window.location.href = "/login";
});

loadAll().catch((error) => {
  buildOutput.textContent = error.message;
});
