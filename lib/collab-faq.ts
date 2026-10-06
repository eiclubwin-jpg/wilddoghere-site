// 合作洽詢 FAQ：合作頁、網站 AI 小幫手，以及之後的 LINE bot 共用這一份。
// AI 只能根據這裡的內容回答，所以答案要寫成可以直接給品牌看的句子。
// draft: true 的題目還沒填好，不會出現在網站上，也不會交給 AI 參考；填好後把 draft 拿掉即可。

import { COLLAB_EMAIL, LINE_ADD_FRIEND_URL } from "@/lib/collab-config";

export const collabCategories = [
  "親子用品與家庭玩具",
  "3C、拍攝與收納配件",
  "美食體驗與家族聚餐",
  "親子旅遊、住宿與景點",
  "生活用品與家庭實測",
  "品牌活動與短影音紀錄"
];

export const collabFormats = [
  "部落格長文與 SEO 實測",
  "YouTube 影片與 Shorts",
  "Instagram Reels 與圖文",
  "親子實際使用紀錄",
  "多平台內容整合",
  "活動、住宿與餐飲體驗"
];

export type CollabFaq = {
  id: string;
  question: string;
  answer: string;
  /** 顯示成預設問題按鈕；點了直接顯示答案，不呼叫 AI */
  preset?: boolean;
  /** 還沒填好的題目 */
  draft?: boolean;
};

const contactWays = LINE_ADD_FRIEND_URL
  ? `填寫本頁下方的合作需求表單、加入 LINE 官方帳號，或寄信到 ${COLLAB_EMAIL}`
  : `填寫本頁下方的合作需求表單，或寄信到 ${COLLAB_EMAIL}`;

export const collabFaqs: CollabFaq[] = [
  {
    id: "categories",
    question: "接受哪些品類的合作？",
    answer: `目前適合合作的品類有：${collabCategories.join("、")}。`,
    preset: true
  },
  {
    id: "formats",
    question: "可以製作哪些內容形式？",
    answer: `可以製作：${collabFormats.join("、")}。`,
    preset: true
  },
  {
    id: "disclosure",
    question: "合作內容會標示嗎？會寫缺點嗎？",
    answer:
      "會。受邀、贈品或付費合作都會在內容中說明。內容以家庭實際使用經驗為主，野狗軍團會保留實際使用感受與優缺點描述。",
    preset: true
  },
  {
    id: "pricing",
    question: "合作費用怎麼算？",
    answer: `報價會依內容形式與需求，由野狗爸、野狗媽親自回覆。請${contactWays}。`,
    preset: true
  },
  {
    id: "perspective",
    question: "內容是用什麼角度呈現？",
    answer:
      "WildDogHere 以野狗爸與野狗媽的雙視角，結合孩子真實反應與家庭日常，製作有使用脈絡、有優缺點也有溫度的內容，不只展示產品外觀。"
  },
  {
    id: "platforms",
    question: "內容會發布在哪些平台？",
    answer:
      "主要發布在 WildDogHere 網站與 Mobile01，另有 YouTube、Instagram 與 Facebook。實際發布的平台會依合作內容討論。"
  },
  {
    id: "contact",
    question: "要怎麼聯絡你們？",
    answer: `可以${contactWays}，會由野狗爸、野狗媽親自回覆。`
  },
  {
    id: "process",
    question: "合作流程怎麼走？",
    answer: `${LINE_ADD_FRIEND_URL ? "填寫合作需求表單、加 LINE 或來信" : "填寫合作需求表單或來信"} → 野狗爸、野狗媽在 3 個工作天內回覆，確認需求與檔期 → 寄送產品或安排體驗 → 全家實際使用 → 發布內容並提供連結。`,
    preset: true
  },
  {
    id: "turnaround",
    question: "收到產品後多久會發布？",
    answer: "一般約 2～4 週；活動、住宿或餐廳體驗約 1～2 週，也可以配合品牌檔期討論。",
    preset: true
  },
  {
    id: "gifted",
    question: "接受純贈品（公關品）合作嗎？",
    answer: "會依產品和家裡的實際需求評估，適合的話接受產品體驗合作。"
  },
  {
    id: "report",
    question: "發布後會提供成效數據嗎？",
    answer: "發布後 30 天，提供網站瀏覽數與社群後台數據截圖。"
  }
];

export const liveCollabFaqs = collabFaqs.filter((faq) => !faq.draft && faq.answer.trim());

export const presetCollabFaqs = liveCollabFaqs
  .filter((faq) => faq.preset)
  .map(({ id, question, answer }) => ({ id, question, answer }));

/** 給 AI 參考的系統指令。只放已填好的 FAQ。 */
export function buildCollabSystemPrompt(): string {
  const faqText = liveCollabFaqs.map((faq) => `Q：${faq.question}\nA：${faq.answer}`).join("\n\n");
  return [
    "你是 WildDogHere（野狗軍團出沒中）網站「合作洽詢」頁的 AI 小幫手，回答品牌或公關窗口的一般問題。",
    "WildDogHere 是野狗爸與野狗媽經營的家族生活部落格，內容包括親子開箱、玩具收藏、美食旅行、生活用品與 3C。",
    "",
    "回答規則：",
    "1. 只能根據下方「合作 FAQ」回答，不要自己編造數字、價格、日期或成效。",
    `2. FAQ 沒提到的事，回答「這部分會由野狗爸、野狗媽親自回覆」，並請對方${contactWays}。`,
    "3. 不報價、不承諾檔期或成效，也不代表野狗軍團答應任何合作。",
    "4. 不要向對方索取姓名、電話、Email、LINE ID 或未公開的產品資訊。",
    "5. 只回答和合作有關的問題；其他問題就簡短說明你只能回答合作相關問題。",
    "6. 使用台灣繁體中文，語氣親切自然，150 字以內，不要使用 Markdown 格式。",
    "",
    "合作 FAQ：",
    faqText
  ].join("\n");
}
