import type { MetadataRoute } from "next";
import { categoryEntries } from "@/data/categories";
import { contents } from "@/data/contents";
import { getPublishedContents, hasLocalArticle, siteUrl } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const publishedPosts = getPublishedContents(contents);
  const latestDate = publishedPosts[0]?.date ? new Date(`${publishedPosts[0].date}T00:00:00+08:00`) : new Date("2026-07-10T00:00:00+08:00");
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: latestDate, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/categories`, lastModified: latestDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: new Date("2026-07-10T00:00:00+08:00"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/collaboration`, lastModified: new Date("2026-07-10T00:00:00+08:00"), changeFrequency: "monthly", priority: 0.5 }
  ];
  const categoryPages: MetadataRoute.Sitemap = categoryEntries.map((category) => {
    const latestCategoryPost = publishedPosts.find((post) => post.category === category.contentCategory);
    return {
      url: `${siteUrl}/categories/${category.slug}`,
      lastModified: latestCategoryPost ? new Date(`${latestCategoryPost.date}T00:00:00+08:00`) : latestDate,
      changeFrequency: "weekly",
      priority: 0.75
    };
  });
  const postPages: MetadataRoute.Sitemap = publishedPosts
    .filter(hasLocalArticle)
    .map((post) => ({
      url: `${siteUrl}/posts/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00+08:00`),
      changeFrequency: "monthly",
      priority: post.featured ? 0.9 : 0.7
    }));

  return [...staticPages, ...categoryPages, ...postPages];
}
