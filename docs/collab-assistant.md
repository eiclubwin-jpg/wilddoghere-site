# 合作洽詢頁：AI 小幫手＋合作需求表單

## 運作方式

- **預設問題按鈕**：直接顯示 `lib/collab-faq.ts` 的答案，不呼叫 AI。
- **自由提問**：先經過 `lib/collab-guard.ts` 過濾。訊息含電話、Email、LINE ID、網址，出現「我是、報價、預算、檔期、樣品、新品、未公開」這類字，或超過 120 字，就直接轉真人，**完全不送 Gemini**。沒命中才交給 Gemini 3.5 Flash-Lite，而且 AI 只能根據 FAQ 回答。
- **合作需求表單**：送出後由 LINE 官方帳號推播到你自己的 LINE，**不經過 AI**。LINE 還沒設定時，表單會請品牌改用 Email，內容自動帶入。
- **地區限制**：Gemini 免費層不能服務歐洲經濟區、瑞士、英國的使用者，這些地區的訪客不會呼叫 AI。
- **頻率限制**：同一個 IP 每小時最多問 10 題、送 3 次表單。

## 上線前要準備

1. **Gemini 金鑰**：到 Google AI Studio 建立 API key。這個專案不要綁帳單，額度用完只會暫停到隔天，不會收費。額度在 AI Studio 的 Rate limit 頁面查看，每天台灣時間下午 3 點重置（11 月到隔年 3 月是 4 點）。
2. **LINE 官方帳號**：合作頁的「LINE 洽詢」按鈕連到 @253nhvlz（設定在 `lib/collab-config.ts`）。這個帳號要啟用 Messaging API：
   - 官方帳號管理後台 → 設定 → Messaging API → 啟用 Messaging API。
   - LINE Developers → 該 channel → Messaging API 分頁：發行 Channel access token（long-lived）。
   - Basic settings → 最下方的 **Your user ID**（U 開頭），不是 LINE ID。
   - 你自己要先加這個官方帳號為好友，才收得到通知。
3. **Vercel 環境變數**（Settings → Environment Variables），名稱見根目錄的 `.env.example`：
   `GEMINI_API_KEY`、`LINE_CHANNEL_ACCESS_TOKEN`、`LINE_OWNER_USER_ID`。設定後要重新部署才會生效。
4. **FAQ**：已填好，要改答案直接改 `lib/collab-faq.ts`。新增題目時，還沒想好的可以先標 `draft: true`，就不會上線。

## 本機測試

1. 把金鑰填進專案根目錄的 `.env.local`（已建好空白檔，不會推到 GitHub）。
2. `npm run dev`，打開 http://localhost:3000/collaboration 。

## 上線

CMS 的「發布」只會同步文章與圖片，不會帶上程式改動。這些程式要另外推送到 GitHub，Vercel 才會部署。

## 之後接 LINE bot

LINE bot 可以直接共用 `lib/collab-faq.ts`（FAQ 與 AI 指令）、`lib/collab-guard.ts`（過濾規則與轉真人訊息）、`lib/gemini.ts`。要另外做的是：轉真人後記住這位使用者的狀態，之後他傳的訊息都不再送 Gemini，等你手動切回。

## 注意

- 免費層送出的內容可能被 Google 用來改善產品，也可能經過人工審查，所以過濾規則寧可嚴一點。品牌常用的說法可以加到 `intentKeywords`。
- AI 回答的下方都會標示「AI 生成，僅供參考」。
