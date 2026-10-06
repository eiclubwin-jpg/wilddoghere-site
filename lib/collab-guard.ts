// 送進 Gemini 之前一定先跑這裡。命中任何一條就轉真人，訊息不會送給 Gemini。
// 原則：寧可多轉真人，也不要讓聯絡資料或未公開資訊進到 Gemini 免費層。
// 網站 AI 小幫手和之後的 LINE bot 共用同一套規則。

export type GuardReason = "contact" | "intent" | "too_long";
export type GuardResult = { handoff: false } | { handoff: true; reason: GuardReason };

/** 超過這個字數，通常是完整的自我介紹或合作需求，直接轉真人 */
export const MAX_AI_QUESTION_LENGTH = 120;

const contactPatterns: RegExp[] = [
  /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, // Email
  /(?:\d[\s-]?){8,}/, // 電話、手機、統編等長串數字
  /https?:\/\/|www\.|\.com\b|\.tw\b/i, // 網址
  /line\s*id|@[a-z0-9._-]{3,}|加賴|賴我/i // LINE ID
];

const intentKeywords = [
  // 自我介紹：後面通常接品牌名稱或職稱
  "我是",
  "我們是",
  "敝司",
  "敝公司",
  "本公司",
  "我司",
  "我們公司",
  "我們品牌",
  "我們家",
  // 邀約與合作細節
  "邀請",
  "邀約",
  "想找",
  "業配",
  "提案",
  "報價",
  "價格",
  "費用",
  "收費",
  "預算",
  "檔期",
  "寄送",
  "寄給",
  "寄出",
  "樣品",
  "試用品",
  "合約",
  "簽約",
  "統編",
  "發票",
  "匯款",
  "窗口",
  "聯絡",
  "電話",
  "手機",
  "地址",
  // 未公開資訊
  "新品",
  "上市",
  "未公開",
  "沒公開",
  "未發表",
  "沒發表",
  "保密",
  "搶先"
];

export function checkBeforeAi(input: string): GuardResult {
  // NFKC 會把全形數字、字母、＠轉成半形，避免「０９１２」之類的寫法漏掉
  const text = input.normalize("NFKC");
  if (contactPatterns.some((pattern) => pattern.test(text))) return { handoff: true, reason: "contact" };
  if (intentKeywords.some((keyword) => text.includes(keyword))) return { handoff: true, reason: "intent" };
  if ([...text].length > MAX_AI_QUESTION_LENGTH) return { handoff: true, reason: "too_long" };
  return { handoff: false };
}

export const HANDOFF_MESSAGE_WEB =
  "收到！這部分會由野狗爸、野狗媽親自回覆。請填寫下方的合作需求表單，或用下面的方式聯絡我們。";

export const HANDOFF_MESSAGE_LINE = "收到！這部分會由野狗爸、野狗媽親自在這裡回覆你，請稍等一下。";
