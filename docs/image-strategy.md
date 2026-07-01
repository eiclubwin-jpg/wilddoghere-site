# Image Strategy

本專案先維持靜態網站，不導入媒體庫、CMS 或外部圖片管理服務。圖片集中放在 `public/images/`，由資料檔引用。

## 建議資料夾

```text
public/images/characters/
public/images/contents/
public/images/og/
```

目前 repo 不放大量圖片。正式圖完成後，再依需求逐步加入。

## 角色圖片規格

角色圖片目前由 `data/characters.ts` 的 `image` 與 `imageAlt` 欄位管理。即使圖片檔案尚未放入 `public`，前端也會顯示乾淨 placeholder，不會造成 build error。

### 建議尺寸

- 角色主圖：`1200 x 900`，比例 4:3
- 建議保留主體在中央 70% 區域，避免手機版裁切時角色臉部或身體被切掉
- 若角色圖會用於社群分享或橫幅延伸，可額外輸出 `1600 x 1000`

### 命名規則

目前規劃的角色圖片路徑：

```text
public/images/characters/dog-dad.png
public/images/characters/dog-mom.png
public/images/characters/big-kid.png
public/images/characters/second-kid.png
public/images/characters/third-kid.png
public/images/characters/grandpa.png
public/images/characters/grandma.png
```

檔名使用小寫英文、數字與連字號，避免空白與中文檔名。若未來改用 WebP，請同步更新 `data/characters.ts` 的 `image` 路徑。

### 圖片壓縮建議

- PNG 只建議用於需要透明背景的角色圖
- 單張角色 PNG 建議壓到 500 KB 以下
- 若不需要透明背景，優先轉成 WebP，單張建議 300 KB 以下
- 上傳前先移除不必要的 metadata

### 可以放在 repo 的圖片

- 7 張正式角色圖
- 首頁少量代表作品封面
- Open Graph 分享圖
- 品牌 logo 或小型固定 UI 圖像

### 不建議放在 repo 的圖片

- 大量文章照片原圖
- 未壓縮相機照片
- 一次性活動側拍全檔
- 影片截圖大量批次輸出
- 未篩選的素材備份

大量文章圖片未來建議放在專門的媒體儲存或 CDN，再由文章資料引用。

## 通用命名規則

- 角色圖：`dog-dad.png`、`dog-mom.png`
- 作品封面：`content-toy-unboxing-notes.webp`
- SEO / 分享圖：`wilddoghere-og.webp`

檔名使用小寫英文、數字與連字號，避免空白與中文檔名。

## 通用尺寸建議

- 角色圖：`1200 x 900`，比例 4:3
- 作品封面：`1600 x 1000`，比例 16:10
- Open Graph 圖：`1200 x 630`

## 通用格式與壓縮

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
