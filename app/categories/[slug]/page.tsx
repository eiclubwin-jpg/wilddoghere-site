import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { categoryEntries } from "@/data/categories";
import { contents } from "@/data/contents";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return categoryEntries.map((category) => ({
    slug: category.slug
  }));
}

export async function generateMetadata({
  params
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryEntries.find((item) => item.slug === slug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.title}｜WildDogHere`,
    description: category.description
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryEntries.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const posts = contents
    .filter((content) => content.category === category.contentCategory)
    .sort(
      (current, next) =>
        new Date(next.date).getTime() - new Date(current.date).getTime()
    );

  return (
    <main className="min-h-screen bg-linen px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <a href="/" className="text-sm font-semibold text-clay">
            ← 回首頁
          </a>
          <a href="/categories" className="text-sm font-semibold text-cocoa/60">
            全部分類
          </a>
        </div>

        <section className="paper-texture rounded-[2rem] bg-cream px-6 py-10 shadow-soft sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">
            Category
          </p>
          <h1 className="mt-3 text-4xl font-black text-coffee sm:text-5xl">
            {category.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-cocoa/75">
            {category.description}
          </p>
          <p className="mt-4 text-sm font-semibold text-cocoa/55">
            目前共有 {posts.length} 篇文章
          </p>
        </section>

        <section className="mt-10 grid gap-6 xl:grid-cols-2">
          {posts.length > 0 ? (
            posts.map((post) => (
              <ContentCard key={post.id} content={post} variant="list" />
            ))
          ) : (
            <div className="rounded-[1.5rem] bg-white/80 p-8 text-cocoa/70 shadow-soft">
              這個分類還在整理中。
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
