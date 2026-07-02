import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { contents } from "@/data/contents";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return contents.map((post) => ({
    slug: post.slug
  }));
}

export async function generateMetadata({
  params
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = contents.find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title}｜WildDogHere`,
    description: post.excerpt
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = contents.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-cream px-5 py-16 sm:px-8">
      <article className="mx-auto max-w-4xl">
        <a href="/" className="text-sm font-semibold text-clay">
          ← 回首頁
        </a>
        <header className="mt-8">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-clay">
              {post.category}
            </span>
            <span className="rounded-full bg-linen px-3 py-1 text-xs font-semibold text-cocoa/65">
              {post.date}
            </span>
            <span className="rounded-full bg-linen px-3 py-1 text-xs font-semibold text-cocoa/65">
              {post.platform}
            </span>
          </div>
          <h1 className="mt-5 text-4xl font-black leading-tight text-coffee sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg leading-9 text-cocoa/75">{post.excerpt}</p>
          <p className="mt-3 text-sm font-semibold text-cocoa/55">
            敘事者：{post.narrator}
          </p>
        </header>

        <div className="mt-8 overflow-hidden rounded-[1.5rem] bg-linen shadow-soft">
          <img
            src={post.coverImage}
            alt={post.imageAlt}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        {post.bodyHtml ? (
          <div
            className="article-body mt-10 rounded-[1.5rem] bg-white/80 p-6 text-cocoa shadow-soft sm:p-8"
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />
        ) : (
          <div className="mt-10 rounded-[1.5rem] bg-white/80 p-6 text-cocoa/70 shadow-soft sm:p-8">
            這篇文章目前以外部平台為主，完整內容請回到文章卡片點擊原文連結。
          </div>
        )}
      </article>
    </main>
  );
}
