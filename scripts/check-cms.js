const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const { parseAnalyticsCsv } = require(path.join(root, "cms", "server.js"));
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
  "app/posts/[slug]/page.tsx",
  "app/about/page.tsx",
  "app/collaboration/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "app/feed.xml/route.ts",
  "components/SiteHeader.tsx",
  "components/SiteFooter.tsx",
  "components/SearchPosts.tsx",
  "lib/content.ts",
  "docs/seo-growth-guide.md",
  "docs/analytics-views.md",
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
const siteHeader = fs.readFileSync(path.join(root, "components", "SiteHeader.tsx"), "utf8");
const requiredAnchors = [
  "/categories/parenting",
  "/categories/toys",
  "/categories/food-travel",
  "/categories/lifestyle",
  "/categories/tech"
];

for (const anchor of requiredAnchors) {
  if (!siteHeader.includes(anchor)) {
    throw new Error(`Missing category link: ${anchor}`);
  }
}

if (page.includes("Category Index") || page.includes("先用目前代表內容") || page.includes("依文章日期排序")) {
  throw new Error("Homepage still contains duplicated category index or internal maintenance copy.");
}

if (!page.includes("SearchPosts") || !page.includes("getPublishedContents")) {
  throw new Error("Homepage search or published-only filtering is missing.");
}

if (!server.includes("/api/upload-image")) {
  throw new Error("CMS image upload API is missing.");
}

if (!server.includes("hasPublishableContent") || !server.includes("上架前請先填入文章內文")) {
  throw new Error("CMS must prevent published articles from creating broken public links.");
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

if (!cmsHtml.includes("查看流量") || !cmsHtml.includes("vercel.com/dashboard")) {
  throw new Error("CMS analytics dashboard link is missing.");
}

if (
  !server.includes("/api/analytics") ||
  !server.includes("/api/analytics/import") ||
  !server.includes("loadAnalyticsOverview") ||
  !server.includes("analytics.snapshot.json") ||
  !server.includes("parseAnalyticsCsv") ||
  !server.includes("analytics.local.json") ||
  !server.includes("VERCEL_ANALYTICS_TOKEN")
) {
  throw new Error("CMS analytics API is missing.");
}

if (
  !cmsHtml.includes("analyticsPanel") ||
  !cmsHtml.includes("analyticsSummary") ||
  !cmsHtml.includes("analyticsTable") ||
  !cmsHtml.includes("analyticsImportButton") ||
  !cmsHtml.includes("analyticsCsvInput") ||
  !cmsHtml.includes("匯入 Vercel CSV")
) {
  throw new Error("CMS analytics panel is missing.");
}

const cmsClient = fs.readFileSync(path.join(root, "cms", "public", "cms.js"), "utf8");

if (!cmsClient.includes("/api/publish-site") || !cmsClient.includes("postUrl")) {
  throw new Error("CMS one-click publish client flow is incomplete.");
}

if (!cmsClient.includes("getYouTubeVideoId") || !cmsHtml.includes("insertYoutubeButton")) {
  throw new Error("CMS YouTube embed workflow is missing.");
}

if (
  !cmsHtml.includes("emojiGallery") ||
  !cmsHtml.includes("連點圖片兩下") ||
  !cmsClient.includes("emojiOptions") ||
  !cmsClient.includes("emoji-sticker") ||
  !cmsClient.includes("renderEmojiGallery") ||
  !cmsClient.includes("insertEmojiAtCursor") ||
  !cmsClient.includes('addEventListener("dblclick"')
) {
  throw new Error("CMS visual emoji gallery or double-click insertion is missing.");
}

if (
  !server.includes("AbortController") ||
  !server.includes("連線 Vercel Analytics 逾時") ||
  !cmsClient.includes("analyticsRetryButton") ||
  !cmsClient.includes("沒有卡住，已停止讀取")
) {
  throw new Error("CMS analytics timeout and retry handling is missing.");
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
const appLayout = fs.readFileSync(path.join(root, "app", "layout.tsx"), "utf8");
const postPage = fs.readFileSync(path.join(root, "app", "posts", "[slug]", "page.tsx"), "utf8");
const sitemapFile = fs.readFileSync(path.join(root, "app", "sitemap.ts"), "utf8");
const robotsFile = fs.readFileSync(path.join(root, "app", "robots.ts"), "utf8");
const feedFile = fs.readFileSync(path.join(root, "app", "feed.xml", "route.ts"), "utf8");

if (!appLayout.includes("@vercel/analytics/next") || !appLayout.includes("<Analytics />")) {
  throw new Error("Official Vercel Analytics tracking component is missing.");
}

if (
  !postPage.includes('"@type": "BlogPosting"') ||
  !postPage.includes("alternates: { canonical }") ||
  !postPage.includes("getRelatedContents") ||
  !postPage.includes("本文目錄") ||
  !postPage.includes("ShareButtons")
) {
  throw new Error("Article SEO, table of contents, sharing or related posts are incomplete.");
}

if (!sitemapFile.includes("getPublishedContents") || !robotsFile.includes("sitemap.xml") || !feedFile.includes("application/rss+xml")) {
  throw new Error("Sitemap, robots or RSS output is incomplete.");
}

if (!globalsCss.includes(".article-body .youtube-embed") || !cmsCss.includes(".youtube-embed")) {
  throw new Error("YouTube embed responsive styles are missing.");
}

if (!globalsCss.includes(".article-body img.emoji-sticker") || !cmsCss.includes("img.emoji-sticker")) {
  throw new Error("Emoji sticker responsive styles are missing.");
}

const analyticsDoc = fs.readFileSync(path.join(root, "docs", "analytics-views.md"), "utf8");
const gitignore = fs.readFileSync(path.join(root, ".gitignore"), "utf8");

if (!analyticsDoc.includes("cms/analytics.snapshot.json") || !analyticsDoc.includes("每篇文章瀏覽數") || !analyticsDoc.includes("Export as CSV")) {
  throw new Error("Analytics setup documentation is incomplete.");
}

if (!gitignore.includes("cms/analytics.local.json") || !gitignore.includes("cms/analytics.snapshot.json")) {
  throw new Error("Local analytics configs must be ignored by git.");
}

const analyticsCsvResult = parseAnalyticsCsv(
  "Page,Page Views\n/,12\n/posts/example-post,7\nhttps://www.wilddoghere.com/posts/second-post?source=test,3\n",
  "sample.csv"
);

if (
  analyticsCsvResult.totalViews !== 22 ||
  analyticsCsvResult.viewsByPath["/posts/example-post"] !== 7 ||
  analyticsCsvResult.viewsByPath["/posts/second-post"] !== 3
) {
  throw new Error("Vercel Analytics CSV parsing or article path matching failed.");
}

const emojiDataPath = path.join(root, "data", "emojis.ts");
const emojiImageDir = path.join(root, "public", "images", "emojis");

if (!fs.existsSync(emojiDataPath)) {
  throw new Error("Emoji data file is missing.");
}

if (!fs.existsSync(emojiImageDir)) {
  throw new Error("Emoji image directory is missing.");
}

const emojiFiles = fs.readdirSync(emojiImageDir).filter((fileName) => fileName.endsWith(".png"));

if (emojiFiles.length < 24) {
  throw new Error("Expected at least 24 emoji PNG files.");
}

console.log(`CMS check passed. ${posts.length} articles available.`);
