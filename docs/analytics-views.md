# WildDogHere 流量查看說明

WildDogHere 是靜態網站，網站本身不使用資料庫，所以文章瀏覽數不會存在本機 CMS 裡。

正式網站的瀏覽數建議使用 Vercel Web Analytics 查看。

## 1. 第一次啟用

1. 進入 Vercel。
2. 打開 `wilddoghere-site` 專案。
3. 進入 `Analytics`。
4. 若畫面顯示尚未啟用，點選 `Enable Analytics`。

網站已在 `app/layout.tsx` 加入 Vercel Analytics 追蹤 script。

## 2. 查看 total views

進入：

```txt
Vercel Project -> Analytics
```

在 Analytics 總覽中查看 `Page Views`，這就是網站總瀏覽量。

## 3. 查看每一篇文章 views

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

## 4. CMS 入口

CMS 右上角有「查看流量」按鈕，會開啟 Vercel Dashboard。

打開後請選：

```txt
wilddoghere-site -> Analytics
```

## 5. 注意事項

- Analytics 只會統計正式網站，不會統計本機 `localhost`。
- 新部署後通常需要一點時間才會開始出現資料。
- 如果剛啟用 Analytics，舊流量不會補算，只會從啟用後開始計算。
- 若要把 view 數直接顯示在網站或 CMS 文章列表內，需要額外串接 Vercel API 或使用資料庫；目前先不加入，避免破壞靜態網站架構。
