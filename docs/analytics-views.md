# WildDogHere 流量查看說明

WildDogHere 的正式流量由 Vercel Web Analytics 收集。CMS 可顯示：

- 網站總瀏覽數（Total Page Views）
- 每篇已發布文章的瀏覽數
- 匯入檔案與最後更新時間

## 1. 第一次啟用 Vercel Analytics

1. 進入 Vercel 並開啟 `wilddoghere-site` 專案。
2. 點選左側 `Analytics`。
3. 若尚未啟用，按 `Enable Analytics`。
4. 網站已使用官方 `@vercel/analytics` 元件，啟用後會開始累積正式站流量。

Vercel Web Analytics 官方說明：<https://vercel.com/docs/analytics>

## 2. 一鍵查看即時 Views

1. 開啟 WildDogHere CMS。
2. 按頁面頂部唯一的「查看網站 Views」。
3. 系統會直接開啟 WildDogHere 專案的 Vercel Analytics。
4. `Page Views` 顯示網站總 views，`Pages` 面板顯示各頁與各篇文章 views。

第一次使用若看到登入畫面，只需登入 Vercel；之後都是按一顆按鈕直接查看。

## 3. 匯出流量 CSV（選用備份）

1. 在 Vercel 專案進入 `Analytics`。
2. 切換到 `Page Views`。
3. 選擇要統計的期間，例如最近 30 天。
4. 找到 `Pages` 面板。
5. 點面板右下角的三點選單。
6. 選擇 `Export as CSV`。

請從 `Pages` 面板匯出，CSV 必須包含 Page（頁面）與 Page Views（瀏覽數）欄位。

## 4. 在 CMS 保存備份數字（選用）

1. 開啟 WildDogHere CMS。
2. 按流量區的「匯入 CSV 備份」。
3. 選擇剛才下載的 CSV。
4. CMS 會立即顯示網站總瀏覽數與每篇文章瀏覽數。

匯入結果會保存在：

```txt
cms/analytics.snapshot.json
```

這是本機資料，已加入 `.gitignore`，不會推到 GitHub。下次開啟 CMS 時可直接查看；需要最新流量時，再匯出並匯入一次即可。

## 5. 備份數字如何計算

- 網站總瀏覽數：CSV 內所有 Pages 的 Page Views 加總。
- 每篇文章瀏覽數：依 `/posts/文章-slug` 對應 CSV 的 Page 欄位。
- CMS 只列出目前資料檔中的已發布文章。
- 未出現在 CSV 的文章顯示 `0`。

Vercel Pages CSV 最多可匯出 250 個頁面。WildDogHere 目前頁面數遠低於限制，因此加總可作為所選期間的網站總瀏覽數。

## 6. 注意事項

- Analytics 只統計正式網站，不統計本機 `localhost`。
- 剛啟用時不會補算啟用前的流量。
- Vercel 後台的日期範圍會決定 CSV 的統計期間。
- 搜尋引擎與明顯的機器流量通常不會計入 Vercel Web Analytics。
- 日常查看只需按 CMS 頂部「查看網站 Views」，不需要匯出 CSV。

## 7. 進階 Token 模式

CMS 仍保留 `cms/analytics.local.json` 與自訂 API endpoint 支援，但 Vercel 目前公開文件建議從 Analytics 面板查看或匯出 CSV。一般使用不需要建立 Token，CSV 匯入是較穩定的方式。
