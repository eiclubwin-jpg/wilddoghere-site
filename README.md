# WildDogHere / 野狗軍團出沒中

Next.js + Tailwind CSS + TypeScript 製作的品牌官網 MVP。  
目前是靜態網站，沒有資料庫、CMS、登入、購物車或複雜表單。

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

- `data/characters.ts`：野狗軍團角色資料
- `data/contents.ts`：代表作品卡片資料
- `data/socialLinks.ts`：社群與聯絡方式

## Reusable components

- `components/CharacterCard.tsx`
- `components/ContentCard.tsx`
- `components/SectionTitle.tsx`
- `components/CTAButton.tsx`

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
6. 若正式網域不是 `wilddoghere.com`，請同步更新 `app/layout.tsx` 的 `metadataBase` 與 Open Graph `url`。

## 上線前建議替換

- 將 `data/socialLinks.ts` 的 placeholder 連結換成正式社群網址。
- 將 `mailto:hello@wilddoghere.com` 換成正式合作信箱。
- 若要加入真實照片，建議放在 `public/`，再逐步替換目前的 placeholder 視覺。
