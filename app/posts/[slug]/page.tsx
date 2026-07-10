import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentCard } from "@/components/ContentCard";
import { ShareButtons } from "@/components/ShareButtons";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { categoryEntries } from "@/data/categories";
import { contents } from "@/data/contents";
import {
  enhanceArticleHtml,
  getArticleHeadings,
  getPostDescription,
  getPublishedContents,
  getRelatedContents,
  hasLocalArticle,
  normalizeExternalLink,
  siteUrl,
  toAbsoluteUrl
} from "@/lib/content";

type PostPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedContents(contents)
    .filter(hasLocalArticle)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = contents.find((item) => item.slug === slug && item.status === "published");
  if (!post || !hasLocalArticle(post)) return {};

  const description = getPostDescription(post);
  const canonical = `/posts/${post.slug}`;
  const image = toAbsoluteUrl(post.coverImage);

  return {
    title: post.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: canonical,
      siteName: "WildDogHere",
      locale: "zh_TW",
      publishedTime: `${post.date}T08:00:00+08:00`,
      authors: [post.narrator],
      tags: post.tags,
      images: [{ url: image, alt: post.imageAlt }]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [image]
    }
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = contents.find((item) => item.slug === slug && item.status === "published");
  if (!post || !hasLocalArticle(post)) notFound();

  const description = getPostDescription(post);
  const articleUrl = `${siteUrl}/posts/${post.slug}`;
  const sourceLink = normalizeExternalLink(post.link);
  const hasSourceLink = sourceLink.startsWith("http");
  const category = categoryEntries.find((item) => item.contentCategory === post.category);
  const headings = getArticleHeadings(post.bodyHtml || "");
  const articleHtml = enhanceArticleHtml(post.bodyHtml || "");
  const relatedPosts = getRelatedContents(post, contents, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: [toAbsoluteUrl(post.coverImage)],
    datePublished: `${post.date}T08:00:00+08:00`,
    dateModified: `${post.date}T08:00:00+08:00`,
    inLanguage: "zh-Hant",
    mainEntityOfPage: articleUrl,
    articleSection: post.category,
    keywords: post.tags.join(", "),
    author: { "@type": "Organization", name: post.narrator, url: `${siteUrl}/about` },
    publisher: {
      "@type": "Organization",
      name: "WildDogHere",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/brand/wilddoghere-watermark.png` }
    }
  };

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-cream px-5 py-12 sm:px-8 sm:py-16">
        <article className="mx-auto max-w-4xl">
          <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-cocoa/55" aria-label="麵包屑">
            <a href="/" className="hover:text-clay">首頁</a><span>/</span>
            <a href={category ? `/categories/${category.slug}` : "/categories"} className="hover:text-clay">{post.category}</a><span>/</span>
            <span className="line-clamp-1 text-cocoa/75">{post.title}</span>
          </nav>

          <header className="mt-8">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-clay">{post.category}</span>
              <time dateTime={post.date} className="rounded-full bg-linen px-3 py-1 text-xs font-semibold text-cocoa/65">{post.date}</time>
              <span className="rounded-full bg-linen px-3 py-1 text-xs font-semibold text-cocoa/65">{post.platform}</span>
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight text-coffee sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-lg leading-9 text-cocoa/75">{description}</p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-cocoa/10 pt-5">
              <p className="text-sm font-semibold text-cocoa/60">文字：{post.narrator}　·　發布日期：{post.date}</p>
              <ShareButtons title={post.title} url={articleUrl} />
            </div>
          </header>

          <figure className="mt-8 overflow-hidden rounded-[1.5rem] bg-linen shadow-soft">
            <img src={post.coverImage} alt={post.imageAlt} className="aspect-[16/9] w-full object-cover" width="1280" height="720" fetchPriority="high" referrerPolicy="no-referrer" />
          </figure>

          <section className="mt-8 grid gap-4 rounded-[1.5rem] border border-cocoa/10 bg-butter/35 p-6 sm:grid-cols-[1fr_auto] sm:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay">30 秒快速了解</p>
              <p className="mt-3 text-base leading-8 text-cocoa/78">{description}</p>
              <p className="mt-3 text-sm font-semibold text-cocoa/58">內容原則：以實際使用、親自到訪或家庭生活觀察為主；合作內容會於文內清楚標示。</p>
            </div>
            <a href={category ? `/categories/${category.slug}` : "/categories"} className="rounded-full border border-cocoa/15 bg-white/80 px-4 py-2 text-sm font-bold text-cocoa">更多{post.category}</a>
          </section>

          {headings.length >= 2 ? (
            <nav className="mt-8 rounded-[1.5rem] border border-cocoa/10 bg-white/70 p-6" aria-label="本文目錄">
              <h2 className="text-xl font-bold text-coffee">本文目錄</h2>
              <ol className="mt-4 grid gap-2 text-sm leading-6 text-cocoa/70 sm:grid-cols-2">
                {headings.map((heading) => (
                  <li key={heading.id} className={heading.level === 3 ? "sm:pl-3" : "font-semibold"}>
                    <a href={`#${heading.id}`} className="transition hover:text-clay">{heading.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <div className="article-body mt-8 rounded-[1.5rem] bg-white/80 p-6 text-cocoa shadow-soft sm:p-8" dangerouslySetInnerHTML={{ __html: articleHtml }} />

          <section className="mt-8 rounded-[1.5rem] border border-cocoa/10 bg-white/70 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-coffee">關於這篇紀錄</h2>
            <p className="mt-3 text-sm leading-7 text-cocoa/70">
              這篇文章由 {post.narrator} 以真實家庭情境整理。我們重視實際使用感受、不回避缺點，也會在資訊改變時持續更新。
            </p>
            {hasSourceLink ? (
              <a href={sourceLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-bold text-clay underline underline-offset-4">查看這篇文章的外部發布版本</a>
            ) : null}
            <div className="mt-6"><ShareButtons title={post.title} url={articleUrl} /></div>
          </section>
        </article>

        {relatedPosts.length > 0 ? (
          <section className="mx-auto mt-16 max-w-7xl border-t border-cocoa/10 pt-12">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-clay">Keep Reading</p>
            <h2 className="mt-2 text-3xl font-bold text-coffee">接著看野狗軍團的其他紀錄</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {relatedPosts.map((item) => <ContentCard key={item.id} content={item} />)}
            </div>
          </section>
        ) : null}

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </main>
      <SiteFooter />
    </>
  );
}
