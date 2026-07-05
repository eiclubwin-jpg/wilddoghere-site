const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const requiredFiles = [
  "cms/server.js",
  "cms/auth.json",
  "cms/public/index.html",
  "cms/public/login.html",
  "cms/public/cms.css",
  "cms/public/cms.js",
  "data/contents.json",
  "data/contents.ts",
  "data/categories.ts",
  "app/categories/page.tsx",
  "app/categories/[slug]/page.tsx",
  "open-wilddog-cms.command",
  "scripts/set-cms-password.js",
  "scripts/package-windows-cms.js",
  "scripts/check-windows-package.js",
  "scripts/write-windows-release-notes.js",
  "scripts/check-windows-release-notes.js",
  "WINDOWS-README-FIRST.txt",
  "WINDOWS-SETUP.cmd",
  "WINDOWS-VERIFY.cmd",
  "WINDOWS-CREATE-EXE.cmd",
  "WINDOWS-CHANGE-ACCOUNT.cmd",
  "windows/Setup-WildDogHere-CMS.cmd",
  "windows/Ensure-Node-LTS.cmd",
  "windows/Change-CMS-Account.cmd",
  "windows/Verify-WildDogHere-CMS.cmd",
  "windows/Start-WildDogHere-CMS.cmd",
  "windows/Build-WildDogHere-CMS-EXE.ps1",
  "windows/Build-WildDogHere-CMS-SelfExtracting-EXE.ps1",
  "windows/Build-WildDogHere-CMS-SelfExtracting-EXE.cmd"
];

for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing required CMS file: ${file}`);
  }
}

const posts = JSON.parse(
  fs.readFileSync(path.join(root, "data", "contents.json"), "utf8")
);
const server = fs.readFileSync(path.join(root, "cms", "server.js"), "utf8");

if (!Array.isArray(posts) || posts.length === 0) {
  throw new Error("data/contents.json must contain at least one article.");
}

const requiredFields = [
  "id",
  "title",
  "slug",
  "category",
  "excerpt",
  "coverImage",
  "imageAlt",
  "narrator",
  "date",
  "tags",
  "platform",
  "link",
  "featured",
  "status"
];

for (const post of posts) {
  for (const field of requiredFields) {
    if (!(field in post)) {
      throw new Error(`Article "${post.title || post.id}" is missing ${field}.`);
    }
  }
}

const page = fs.readFileSync(path.join(root, "app", "page.tsx"), "utf8");
const requiredAnchors = [
  "/categories/parenting",
  "/categories/toys",
  "/categories/food-travel",
  "/categories/lifestyle",
  "/categories/tech"
];

for (const anchor of requiredAnchors) {
  if (!page.includes(anchor)) {
    throw new Error(`Missing category link: ${anchor}`);
  }
}

if (!server.includes("/api/upload-image")) {
  throw new Error("CMS image upload API is missing.");
}

if (!server.includes("/api/login") || !server.includes("requireAuth")) {
  throw new Error("CMS login protection is missing.");
}

const cmsHtml = fs.readFileSync(path.join(root, "cms", "public", "index.html"), "utf8");

if (!cmsHtml.includes("bodyEditor")) {
  throw new Error("CMS WYSIWYG editor is missing.");
}

if (!cmsHtml.includes("publishButton") || !cmsHtml.includes("saveDraftButton")) {
  throw new Error("CMS publish/draft workflow buttons are missing.");
}

if (!cmsHtml.includes("一鍵發布到正式網站")) {
  throw new Error("CMS one-click website publish button is missing.");
}

if (!cmsHtml.includes("只儲存在 CMS")) {
  throw new Error("CMS local-only save label is missing.");
}

if (!cmsHtml.includes("logoutButton")) {
  throw new Error("CMS logout button is missing.");
}

const cmsClient = fs.readFileSync(path.join(root, "cms", "public", "cms.js"), "utf8");

if (!cmsClient.includes("/api/publish-site") || !cmsClient.includes("postUrl")) {
  throw new Error("CMS one-click publish client flow is incomplete.");
}

if (!cmsClient.includes("getYouTubeVideoId") || !cmsHtml.includes("insertYoutubeButton")) {
  throw new Error("CMS YouTube embed workflow is missing.");
}

if (!cmsClient.includes("正式網站尚未更新") || !cmsClient.includes("要現在一鍵發布到正式網站嗎")) {
  throw new Error("CMS must warn when a published post is only saved locally.");
}

if (
  !server.includes("npm run typecheck") ||
  !server.includes("collectReferencedImagePaths") ||
  !server.includes("git push origin HEAD:main") ||
  !server.includes("waitForLivePost") ||
  !server.includes("cmd.exe") ||
  !server.includes("prepareGitlessPublishRoot") ||
  !server.includes(".wilddoghere-publish-worktree")
) {
  throw new Error("CMS publish API must typecheck, publish referenced assets, push to GitHub main, support Windows command execution and gitless Windows packages, and confirm the live post.");
}

const globalsCss = fs.readFileSync(path.join(root, "app", "globals.css"), "utf8");
const cmsCss = fs.readFileSync(path.join(root, "cms", "public", "cms.css"), "utf8");

if (!globalsCss.includes(".article-body .youtube-embed") || !cmsCss.includes(".youtube-embed")) {
  throw new Error("YouTube embed responsive styles are missing.");
}

console.log(`CMS check passed. ${posts.length} articles available.`);
