# WildDogHere 流量查看說明

WildDogHere 是靜態網站，正式網站的流量由 Vercel Web Analytics 收集。
CMS 可以讀取 Vercel Analytics API，顯示：

- 全站總瀏覽數
- 每篇已發布文章的瀏覽數

## 1. 第一次啟用

1. 進入 Vercel。
2. 打開 `wilddoghere-site` 專案。
3. 進入 `Analytics`。
4. 若畫面顯示尚未啟用，點選 `Enable Analytics`。

網站已在 `app/layout.tsx` 加入 Vercel Analytics 追蹤 script。
Vercel Web Analytics 說明可參考：https://vercel.com/docs/analytics
Vercel REST API 說明可參考：https://vercel.com/docs/rest-api/web-analytics/aggregates-page-views

## 2. 讓 CMS 可以讀取流量

`cms/analytics.local.json` 是本機設定檔，不會推上 GitHub。

1. 複製範例檔：

```txt
cms/analytics.example.json
```

2. 另存成：

```txt
cms/analytics.local.json
```

3. 填入 Vercel 專案資料：

```json
{
  "projectId": "prj_xxxxxxxxxxxxxxxxxxxx",
  "teamId": "",
  "token": "vercel_xxxxxxxxxxxxxxxxxxxx",
  "days": 30,
  "domain": "www.wilddoghere.com"
}
```

`projectId` 可在 Vercel Project Settings 找到。
`token` 請在 Vercel Account Settings 建立，並確認有讀取專案 Analytics 的權限。
如果專案在 Team 底下，請填 `teamId`。

## 3. 在 CMS 查看流量

1. 開啟 WildDogHere CMS。
2. 按右上角「查看流量」。
3. CMS 會顯示「流量總覽」：
   - 全站總瀏覽數
   - 已發布文章數
   - 每篇文章瀏覽數

CMS 只讀取正式站流量，不會計算本機 `localhost`。

若 Vercel 或網路沒有回應，CMS 會在 18 秒內自動停止讀取，顯示錯誤原因與「重新讀取流量」按鈕，不會一直停在「正在更新流量」。

## 4. 如果還沒設定 token

CMS 不會壞掉，會顯示設定提示。
補上 `cms/analytics.local.json` 後，重新整理 CMS 再按「查看流量」即可。

## 5. Vercel 後台查看

進入：

```txt
Vercel Project -> Analytics
```

在 Analytics 總覽中查看 `Page Views`，這就是網站總瀏覽量。

## 6. 每一篇文章 views 對應方式

每篇文章都有自己的網址：

```txt
/posts/article-slug
```

在 Vercel Analytics 裡查看 Pages / Top Pages / Page URLs 相關區塊，找到 `/posts/` 開頭的網址。

例：

```txt
/posts/tomica-sushi-car-vol-2
/posts/neihu-dagouxi-yuanjue-waterfall-family-hike
```

每一列對應的 `Page Views` 就是該篇文章的瀏覽數。

## 7. 注意事項

- Analytics 只會統計正式網站，不會統計本機 `localhost`。
- 新部署後通常需要一點時間才會開始出現資料。
- 如果剛啟用 Analytics，舊流量不會補算，只會從啟用後開始計算。
- `cms/analytics.local.json` 不要提交到 GitHub。
- 若 Vercel 之後調整 API endpoint，可在 `analytics.local.json` 加入 `countEndpoint` 或 `aggregateEndpoint` 覆蓋預設值。
