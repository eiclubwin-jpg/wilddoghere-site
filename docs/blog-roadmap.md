# Blog Roadmap

未來文章系統先採靜態內容路線，不導入資料庫、登入、CMS 或複雜後端。

## Phase 2：先保留資料結構

目前以 `data/contents.ts` 管理代表作品卡片，先不建立文章頁。卡片可標示內容方向、格式、狀態與未來連結。

## Phase 3：加入靜態文章頁

建議新增：

```text
data/posts.ts
app/posts/page.tsx
app/posts/[slug]/page.tsx
```

每篇文章可以用 TypeScript 資料管理：

```ts
{
  slug: "toy-unboxing-first-note",
  title: "玩具開箱第一篇",
  category: "Toys",
  publishedAt: "2026-07-01",
  excerpt: "文章摘要",
  coverImage: "/images/contents/example.webp"
}
```

## Phase 4：導入 MDX，但仍不使用 CMS

若文章量增加，可以使用 MDX 檔案：

```text
content/posts/toy-unboxing-first-note.mdx
```

優點是可以保留 Git 版本控管，也不需要後台登入。

## 何時才考慮 CMS

只有在出現以下需求時才評估 CMS：

- 非技術成員需要頻繁自行發文
- 文章數量明顯增加
- 需要排程、草稿、多人審稿
- 需要大量圖片管理與搜尋

在那之前，靜態文章最適合目前的品牌官網 MVP。
