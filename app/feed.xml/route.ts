import { contents } from "@/data/contents";
import { getContentUrl, getPostDescription, getPublishedContents, hasReadableContent, siteUrl, toAbsoluteUrl } from "@/lib/content";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = getPublishedContents(contents)
    .filter(hasReadableContent)
    .slice(0, 30)
    .map((post) => {
      const url = toAbsoluteUrl(getContentUrl(post));
      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${escapeXml(url)}</link>
          <guid isPermaLink="true">${escapeXml(url)}</guid>
          <description>${escapeXml(getPostDescription(post))}</description>
          <category>${escapeXml(post.category)}</category>
          <pubDate>${new Date(`${post.date}T00:00:00+08:00`).toUTCString()}</pubDate>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>WildDogHere｜野狗軍團出沒中</title>
        <link>${siteUrl}</link>
        <description>家族生活、親子開箱、玩具收藏、3C與美食旅行部落格。</description>
        <language>zh-TW</language>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
