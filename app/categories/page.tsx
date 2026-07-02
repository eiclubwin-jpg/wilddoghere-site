import { SectionTitle } from "@/components/SectionTitle";
import { categoryEntries } from "@/data/categories";
import { contents } from "@/data/contents";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-cream px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <a href="/" className="text-sm font-semibold text-clay">
          ← 回首頁
        </a>
        <SectionTitle
          eyebrow="Categories"
          title="文章分類"
          description="選擇一個分類，查看 WildDogHere 目前整理好的文章目錄。"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categoryEntries.map((category) => {
            const count = contents.filter(
              (content) => content.category === category.contentCategory
            ).length;

            return (
              <a
                key={category.slug}
                href={`/categories/${category.slug}`}
                className="hand-drawn bg-white/80 p-6 shadow-soft transition hover:-translate-y-1 hover:bg-white"
              >
                <p className="text-sm font-semibold text-clay">
                  {category.title}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-coffee">
                  {count} 篇文章
                </h2>
                <p className="mt-3 text-base leading-7 text-cocoa/72">
                  {category.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}
