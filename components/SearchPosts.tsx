"use client";

import { useMemo, useState } from "react";
import { ContentCard } from "@/components/ContentCard";
import type { ContentItem } from "@/data/contents";

type SearchPostsProps = { posts: ContentItem[] };

export function SearchPosts({ posts }: SearchPostsProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("zh-Hant");
  const matches = useMemo(() => {
    if (!normalizedQuery) return [];
    return posts.filter((post) =>
      [post.title, post.excerpt, post.category, post.narrator, post.platform, ...post.tags]
        .join(" ")
        .toLocaleLowerCase("zh-Hant")
        .includes(normalizedQuery)
    ).slice(0, 8);
  }, [normalizedQuery, posts]);

  return (
    <section id="search" className="bg-cream px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[1.5rem] border border-cocoa/10 bg-white/80 p-6 shadow-soft sm:p-8">
          <label htmlFor="site-search" className="text-xl font-bold text-coffee">搜尋野狗軍團文章</label>
          <p className="mt-2 text-sm leading-6 text-cocoa/65">輸入產品、地點、品牌或文章分類。</p>
          <input
            id="site-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例如：Tomica、親子步道、MacBook"
            className="mt-5 min-h-12 w-full rounded-xl border border-cocoa/15 bg-cream px-4 text-base text-coffee outline-none transition placeholder:text-cocoa/35 focus:border-clay"
          />
        </div>
        {normalizedQuery ? (
          <div className="mt-8">
            <p className="mb-5 text-sm font-semibold text-cocoa/60">
              {matches.length > 0 ? `找到 ${matches.length} 篇相關文章` : "目前找不到相關文章"}
            </p>
            <div className="grid gap-6 xl:grid-cols-2">
              {matches.map((post) => <ContentCard key={post.id} content={post} variant="list" />)}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
