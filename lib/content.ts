import type { ContentItem } from "@/data/contents";

export const siteUrl = "https://www.wilddoghere.com";

export function getPublishedContents(items: ContentItem[]) {
  return items
    .filter((item) => item.status === "published")
    .sort(
      (current, next) =>
        new Date(next.date).getTime() - new Date(current.date).getTime()
    );
}

export function normalizeExternalLink(link: string) {
  return String(link || "").replace(/^#(?=https?:\/\/)/, "");
}

export function hasLocalArticle(content: ContentItem) {
  return Boolean(content.bodyHtml?.trim());
}

export function getContentUrl(content: ContentItem) {
  const externalLink = normalizeExternalLink(content.link);
  if (hasLocalArticle(content)) return `/posts/${content.slug}`;
  if (externalLink.startsWith("http")) return externalLink;
  return "#";
}

export function hasReadableContent(content: ContentItem) {
  return getContentUrl(content) !== "#";
}

export function toAbsoluteUrl(value: string) {
  if (!value) return siteUrl;
  if (/^https?:\/\//.test(value)) return value;
  return `${siteUrl}${value.startsWith("/") ? value : `/${value}`}`;
}

export function stripHtml(value: string) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function getPostDescription(content: ContentItem) {
  const excerpt = content.excerpt?.trim();
  if (excerpt) return excerpt;
  const text = stripHtml(content.bodyHtml || "");
  return text ? `${text.slice(0, 150)}${text.length > 150 ? "…" : ""}` : `${content.title}，WildDogHere 野狗軍團家族生活實際體驗紀錄。`;
}

export type ArticleHeading = {
  id: string;
  level: 2 | 3;
  text: string;
};

export function getArticleHeadings(html: string): ArticleHeading[] {
  const headings: ArticleHeading[] = [];
  const matcher = /<h([23])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match = matcher.exec(html);

  while (match) {
    const text = stripHtml(match[2]);
    if (text) {
      headings.push({
        id: `article-section-${headings.length + 1}`,
        level: Number(match[1]) as 2 | 3,
        text
      });
    }
    match = matcher.exec(html);
  }

  return headings;
}

export function enhanceArticleHtml(html: string) {
  let headingIndex = 0;
  const withHeadings = String(html || "").replace(
    /<h([23])\b([^>]*)>/gi,
    (tag, level: string, attributes: string) => {
      headingIndex += 1;
      if (/\sid\s*=/.test(attributes)) return tag;
      return `<h${level}${attributes} id="article-section-${headingIndex}">`;
    }
  );

  return withHeadings.replace(/<img\b([^>]*)>/gi, (tag, attributes: string) => {
    let additions = "";
    if (!/\sloading\s*=/.test(attributes)) additions += ' loading="lazy"';
    if (!/\sdecoding\s*=/.test(attributes)) additions += ' decoding="async"';
    if (!/\sreferrerpolicy\s*=/.test(attributes)) additions += ' referrerpolicy="no-referrer"';
    return `<img${attributes}${additions}>`;
  });
}

export function getRelatedContents(content: ContentItem, items: ContentItem[], limit = 3) {
  const currentTags = new Set(content.tags);
  return getPublishedContents(items)
    .filter((item) => item.id !== content.id && hasReadableContent(item))
    .map((item) => ({
      item,
      score:
        (item.category === content.category ? 4 : 0) +
        item.tags.filter((tag) => currentTags.has(tag)).length * 2 +
        (item.narrator === content.narrator ? 1 : 0)
    }))
    .sort(
      (current, next) =>
        next.score - current.score ||
        new Date(next.item.date).getTime() - new Date(current.item.date).getTime()
    )
    .slice(0, limit)
    .map(({ item }) => item);
}
