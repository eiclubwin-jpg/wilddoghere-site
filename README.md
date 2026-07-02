# WildDogHere / 野狗軍團出沒中

Next.js + Tailwind CSS + TypeScript 製作的部落格型品牌網站 MVP。
目前是靜態網站，沒有資料庫、CMS、登入、購物車或複雜表單。正式網站主網址為：

```text
https://www.wilddoghere.com
```

## 本機預覽

```bash
npm install
npm run dev
```

開啟：

```text
http://localhost:3000
```

如果本機 npm 快取權限異常，可以改用專案外的暫存快取：

```bash
npm install --cache /tmp/wilddog-npm-cache
```

或使用 pnpm：

```bash
pnpm install
pnpm dev
```

## 可維護資料

- `data/characters.ts`：野狗軍團家庭成員與敘事者資料
- `data/contents.ts`：文章與精選內容資料
- `data/socialLinks.ts`：社群與聯絡方式

角色與作品資料都已保留正式圖片欄位。圖片檔案尚未放入 repo 前，網站會顯示輕量 placeholder。

## Reusable components

- `components/CharacterCard.tsx`
- `components/ContentCard.tsx`
- `components/SectionTitle.tsx`
- `components/CTAButton.tsx`

## Phase 2 文件

- `docs/content-update-sop.md`：文章、角色與社群連結更新流程
- `docs/image-strategy.md`：圖片命名、存放位置、尺寸與壓縮策略
- `docs/blog-roadmap.md`：未來文章系統規劃，不導入 CMS 的前提下逐步擴充

## 部署到 Vercel

1. 將此資料夾推到 GitHub repository。
2. 到 Vercel 建立 New Project。
3. 選擇該 repository。
4. Framework Preset 選 Next.js。
5. Build Command 使用 `npm run build`。
6. Output Directory 維持 Vercel 預設值。
7. Deploy。

## 綁定自訂網域

1. 在 Vercel 專案頁面進入 Settings → Domains。
2. 輸入要綁定的網域，例如 `wilddoghere.com` 或 `www.wilddoghere.com`。
3. 依照 Vercel 顯示的指示，到網域商後台新增 DNS 記錄。
4. 根網域通常使用 A record 指向 Vercel 指定 IP；`www` 子網域通常使用 CNAME 指向 Vercel 指定主機。
5. 回到 Vercel Domains 頁面，等待狀態變成 Valid Configuration。
6. 若正式網域不是 `www.wilddoghere.com`，請同步更新 `app/layout.tsx` 的 `metadataBase` 與 Open Graph `url`。

## 後續內容更新

- 更新文章：編輯 `data/contents.ts`。
- 更新家庭成員與敘事者：編輯 `data/characters.ts`。
- 更新社群與合作信箱：編輯 `data/socialLinks.ts`。
- 若要加入真實照片，請依照 `docs/image-strategy.md` 放在 `public/images/`，再逐步替換目前的 placeholder 視覺。
