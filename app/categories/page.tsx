import type { Metadata } from "next";
import { SectionTitle } from "@/components/SectionTitle";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { categoryEntries } from "@/data/categories";
import { contents } from "@/data/contents";
import { getPublishedContents, hasReadableContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "文章分類",
  description: "瀏覽 WildDogHere 親子開箱、玩具收藏、美食旅行、生活用品、3C與家庭日常文章。",
  alternates: { canonical: "/categories" }
};

export default function CategoriesPage() {
  const publishedPosts = getPublishedContents(contents).filter(hasReadableContent);
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-cream px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Browse Topics" title="文章分類" description="從親子開箱到家庭旅行，選擇一個主題開始瀏覽。" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categoryEntries.map((category) => {
              const count = publishedPosts.filter((content) => content.category === category.contentCategory).length;
              return (
                <a key={category.slug} href={`/categories/${category.slug}`} className="hand-drawn bg-white/80 p-6 shadow-soft transition hover:-translate-y-1 hover:bg-white">
                  <p className="text-sm font-semibold text-clay">{count} 篇公開文章</p>
                  <h2 className="mt-2 text-2xl font-bold text-coffee">{category.title}</h2>
                  <p className="mt-3 text-base leading-7 text-cocoa/72">{category.description}</p>
                  <p className="mt-5 text-sm font-bold text-clay">開啟分類</p>
                </a>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
