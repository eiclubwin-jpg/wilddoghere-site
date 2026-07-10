import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { categoryEntries } from "@/data/categories";
import { contents } from "@/data/contents";
import { getPublishedContents, hasReadableContent } from "@/lib/content";

type CategoryPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return categoryEntries.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryEntries.find((item) => item.slug === slug);
  if (!category) return {};

  const canonical = `/categories/${category.slug}`;
  return {
    title: category.title,
    description: category.description,
    alternates: { canonical },
    openGraph: {
      title: `${category.title}｜WildDogHere`,
      description: category.description,
      type: "website",
      url: canonical,
      images: ["/images/hero/wilddog-family-hero.png"]
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryEntries.find((item) => item.slug === slug);
  if (!category) notFound();

  const posts = getPublishedContents(contents).filter((content) => hasReadableContent(content) && content.category === category.contentCategory);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-linen px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-cocoa/55" aria-label="麵包屑">
            <a href="/" className="hover:text-clay">首頁</a><span>/</span>
            <a href="/categories" className="hover:text-clay">文章分類</a><span>/</span>
            <span className="text-cocoa/75">{category.title}</span>
          </nav>

          <section className="paper-texture mt-8 rounded-[1.5rem] bg-cream px-6 py-10 shadow-soft sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-clay">Topic</p>
            <h1 className="mt-3 text-4xl font-black text-coffee sm:text-5xl">{category.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-cocoa/75">{category.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-cocoa/55">
              <span>{posts.length} 篇公開文章</span><span>·</span><a href="/#search" className="text-clay">搜尋全站文章</a>
            </div>
          </section>

          <section className="mt-10 grid gap-6 xl:grid-cols-2" aria-label={`${category.title}文章`}>
            {posts.length > 0 ? posts.map((post) => <ContentCard key={post.id} content={post} variant="list" />) : (
              <div className="rounded-[1.5rem] bg-white/80 p-8 text-cocoa/70 shadow-soft">這個分類的公開文章正在整理中。</div>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
