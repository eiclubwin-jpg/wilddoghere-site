# Image Strategy

本專案先維持靜態網站，不導入媒體庫、CMS 或外部圖片管理服務。圖片集中放在 `public/images/`，由資料檔引用。

## 建議資料夾

```text
public/images/characters/
public/images/contents/
public/images/og/
```

目前 repo 不放大量圖片。正式圖完成後，再依需求逐步加入。

## 命名規則

- 角色圖：`wilddog-dad.webp`、`wilddog-mom.webp`
- 作品封面：`content-toy-unboxing-notes.webp`
- SEO / 分享圖：`wilddoghere-og.webp`

檔名使用小寫英文、數字與連字號，避免空白與中文檔名。

## 尺寸建議

- 角色圖：`1200 x 900`，比例 4:3
- 作品封面：`1600 x 1000`，比例 16:10
- Open Graph 圖：`1200 x 630`

## 格式與壓縮

- 優先使用 `.webp`
- 單張圖片建議控制在 300 KB 以下
- 若需要透明背景，可使用 `.png`，但要壓縮後再加入

## 替換方式

1. 將圖片放入對應資料夾。
2. 更新資料檔中的 `image.src`。
3. 將 `image.status` 從 `placeholder` 改成 `ready`。
4. 執行 `npm run build` 確認路徑正確。

## 不建議

- 不把大量原始照片直接放進 repo。
- 不使用外部熱連圖片作為主要資產。
- 不在 Phase 2 導入 CMS 或雲端媒體資料庫。
