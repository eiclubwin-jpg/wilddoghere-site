# Content Update SOP

WildDogHere 目前是靜態網站，內容更新以資料檔為主，不使用資料庫、登入系統或 CMS。

## 更新角色

1. 編輯 `data/characters.ts`。
2. 新增或修改角色的 `id`、`name`、`dogType`、`roleTitle`、`keywords`、`description`、`quote`。
3. 若已有正式角色圖，將圖片放在 `public/images/characters/`。
4. 將 `image` 改成 `/images/characters/檔名.png` 或實際檔案路徑。
5. 保留 `imageAlt`，讓圖片有可讀描述。
6. 核心敘事者請將 `isCoreNarrator` 設為 `true`。

## 更新代表作品

1. 編輯 `data/contents.ts`。
2. 每張卡片需有 `title`、`category`、`description`、`tag`、`format`、`status`。
3. 若作品已上線，可新增 `href`，並把 `status` 改成 `published`。
4. 若已有封面圖，放在 `public/images/contents/`，再更新 `image.src` 與 `image.status`。

## 更新社群連結

1. 編輯 `data/socialLinks.ts`。
2. 正式帳號確認後，替換 `href` 與 `handle`。
3. 已正式公開的連結將 `status` 設為 `live`。
4. 尚未確認的連結保留 `pending`，避免誤導訪客。

## 發佈流程

```bash
npm run build
git add .
git commit -m "Update site content"
git push
```

Vercel 會在 `main` branch push 後自動部署。
