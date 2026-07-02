# Content Update SOP

WildDogHere 目前是靜態網站，內容更新以資料檔為主，不使用資料庫、登入系統或 CMS。

## 更新角色

1. 編輯 `data/characters.ts`。
2. 新增或修改角色的 `id`、`name`、`dogType`、`roleTitle`、`keywords`、`description`、`quote`。
3. 若已有正式角色圖，將圖片放在 `public/images/characters/`。
4. 將 `image` 改成 `/images/characters/檔名.png` 或實際檔案路徑。
5. 保留 `imageAlt`，讓圖片有可讀描述。
6. 核心敘事者請將 `isCoreNarrator` 設為 `true`。

## 更新文章

1. 執行 `npm run cms`。
2. 開啟 `http://127.0.0.1:4173`。
3. 在本機 CMS 新增或選取文章。
4. 填寫標題、摘要、分類、敘事者、日期、平台、正式連結與標籤。
5. 在所見所得內文編輯器撰寫站內文章內容，可加入標題、清單、連結與圖片。
6. 上傳文章縮圖；CMS 會把圖片放進 `public/images/contents/`。
7. 若正式連結尚未確定，`status` 使用 `draft` 或 `coming-soon`。
8. 若文章已上線，可將外部文章網址填進 `link`，並把 `status` 改成 `published`。
9. 若要發佈站內文章，可不填外部網址；CMS 會使用 `/posts/文章-slug`。
10. 若要顯示在首頁精選文章，勾選 `featured`。
11. 右側預覽沒問題後按「儲存文章」。
12. CMS 會更新 `data/contents.json`。`data/contents.ts` 只保留型別與資料匯出，通常不需要手動修改。

## 更新社群連結

1. 編輯 `data/socialLinks.ts`。
2. 正式帳號確認後，替換 `url` 與 `name`。
3. 已正式公開的連結將 `status` 設為 `active`。
4. 尚未確認的連結保留 `pending`，避免誤導訪客。

## 發佈流程

```bash
npm run build
git add .
git commit -m "Update site content"
git push
```

Vercel 會在 `main` branch push 後自動部署。
