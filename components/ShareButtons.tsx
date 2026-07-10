"use client";

import { useState } from "react";

type ShareButtonsProps = { title: string; url: string };

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="分享文章">
      <span className="mr-1 text-sm font-semibold text-cocoa/55">分享</span>
      <a href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`} target="_blank" rel="noreferrer" className="rounded-full border border-cocoa/15 bg-white px-4 py-2 text-sm font-bold text-cocoa">LINE</a>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noreferrer" className="rounded-full border border-cocoa/15 bg-white px-4 py-2 text-sm font-bold text-cocoa">Facebook</a>
      <a href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`} className="rounded-full border border-cocoa/15 bg-white px-4 py-2 text-sm font-bold text-cocoa">Email</a>
      <button type="button" onClick={copyLink} className="rounded-full border border-cocoa/15 bg-white px-4 py-2 text-sm font-bold text-cocoa">
        {copied ? "已複製" : "複製連結"}
      </button>
    </div>
  );
}
