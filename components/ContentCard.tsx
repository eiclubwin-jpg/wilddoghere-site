"use client";

import type { ContentItem } from "@/data/contents";
import { getContentUrl, getPostDescription } from "@/lib/content";

type ContentCardProps = {
  content: ContentItem;
  variant?: "feature" | "list";
};

export function ContentCard({ content, variant = "feature" }: ContentCardProps) {
  const contentUrl = getContentUrl(content);
  const isPublished = content.status === "published" && contentUrl !== "#";
  const isExternalLink = contentUrl.startsWith("http");
  const dateLabel = new Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(content.date));
  const isList = variant === "list";
  const description = getPostDescription(content);

  return (
    <article
      className={`group grid h-full overflow-hidden rounded-[1.5rem] border border-cocoa/10 bg-white shadow-soft ${
        isList ? "md:grid-cols-[minmax(13rem,38%)_1fr]" : ""
      }`}
    >
      <a
        href={isPublished ? contentUrl : undefined}
        target={isPublished && isExternalLink ? "_blank" : undefined}
        rel={isPublished && isExternalLink ? "noreferrer" : undefined}
        aria-label={`閱讀：${content.title}`}
        className={`relative flex items-center justify-center overflow-hidden bg-linen ${
          isList ? "aspect-[16/10] md:aspect-auto md:min-h-full" : "aspect-[16/10]"
        }`}
      >
        <div className="absolute inset-4 rounded-[1rem] border border-dashed border-cocoa/20" />
        <div className="relative px-5 text-center">
          <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-cocoa/45">
            {content.category}
          </span>
          <span className="mt-3 block text-xs font-semibold text-cocoa/40">
            {content.coverImage.split("/").pop()}
          </span>
        </div>
        <img
          src={content.coverImage}
          alt={content.imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      </a>
      <div className="flex min-w-0 flex-1 flex-col p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-clay">
            {content.category}
          </span>
          <span className="w-fit rounded-full bg-linen px-3 py-1 text-xs font-semibold text-cocoa/65">
            {dateLabel}
          </span>
        </div>
        <h3 className={`${isList ? "text-xl" : "text-2xl"} font-bold leading-tight text-coffee`}>
          {isPublished ? <a href={contentUrl} target={isExternalLink ? "_blank" : undefined} rel={isExternalLink ? "noreferrer" : undefined} className="transition hover:text-clay">{content.title}</a> : content.title}
        </h3>
        <div className="mt-3 grid gap-2 text-sm font-semibold text-cocoa/60">
          <p>敘事者：{content.narrator}</p>
          <p>平台：{content.platform}</p>
        </div>
        <p className="mt-3 flex-1 text-base leading-7 text-cocoa/75">
          {description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {content.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-cocoa/60"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-cocoa/45">{content.tags.length > 0 ? content.tags.slice(0, 2).join("・") : content.category}</p>
          {isPublished ? (
            <a
              href={contentUrl}
              target={isExternalLink ? "_blank" : undefined}
              rel={isExternalLink ? "noreferrer" : undefined}
              className="text-sm font-semibold text-clay transition hover:text-cocoa"
            >
              閱讀更多
            </a>
          ) : (
            <span className="text-sm font-semibold text-cocoa/45">
              內容準備中
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
