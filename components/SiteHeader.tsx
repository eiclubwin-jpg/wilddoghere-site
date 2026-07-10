"use client";

import { useState } from "react";

const navItems = [
  { label: "首頁", href: "/" },
  { label: "最新文章", href: "/#latest-posts" },
  { label: "親子開箱", href: "/categories/parenting" },
  { label: "3C科技生活", href: "/categories/tech" },
  { label: "玩具收藏", href: "/categories/toys" },
  { label: "美食旅行", href: "/categories/food-travel" },
  { label: "生活用品", href: "/categories/lifestyle" },
  { label: "關於野狗軍團", href: "/about" },
  { label: "合作洽詢", href: "/collaboration" }
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-cocoa/10 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3.5 sm:px-8">
        <a href="/" className="shrink-0 text-lg font-black text-coffee" aria-label="WildDogHere 首頁">
          WildDogHere
          <span className="block text-xs font-semibold text-clay">野狗軍團出沒中</span>
        </a>
        <nav className="hidden min-w-0 flex-1 items-center justify-end gap-4 xl:flex" aria-label="主要導覽">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap text-sm font-semibold text-cocoa/72 transition hover:text-clay">
              {item.label}
            </a>
          ))}
          <a href="/#search" className="rounded-full border border-cocoa/20 bg-white/70 px-4 py-2 text-sm font-semibold text-cocoa transition hover:bg-white">
            搜尋
          </a>
        </nav>
        <button
          type="button"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-cocoa/20 bg-white/70 px-4 text-sm font-bold text-cocoa xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "關閉" : "選單"}
        </button>
      </div>
      {open ? (
        <nav id="mobile-navigation" className="border-t border-cocoa/10 bg-cream px-5 py-4 xl:hidden" aria-label="手機版導覽">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 sm:grid-cols-3">
            {[...navItems, { label: "搜尋文章", href: "/#search" }].map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg bg-white/70 px-3 py-3 text-sm font-semibold text-cocoa">
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
