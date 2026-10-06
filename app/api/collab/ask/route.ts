// 合作洽詢頁 AI 小幫手：POST { question } → { type, message }
// 順序：檢查輸入 → 過濾（命中就轉真人，不送 Gemini）→ 地區限制 → 頻率限制 → 呼叫 Gemini

import { MAX_QUESTION_INPUT, type AskReply } from "@/lib/collab-api";
import { buildCollabSystemPrompt } from "@/lib/collab-faq";
import { HANDOFF_MESSAGE_WEB, checkBeforeAi } from "@/lib/collab-guard";
import { askGemini, type GeminiFailure } from "@/lib/gemini";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { isPaidOnlyRegion } from "@/lib/region";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ASK_LIMIT_PER_HOUR = 10;

const failureMessages: Record<GeminiFailure, AskReply> = {
  not_configured: {
    type: "unavailable",
    message: "AI 小幫手還沒啟用，可以先點上面的常見問題，或直接填寫下方表單。"
  },
  quota: { type: "unavailable", message: "AI 小幫手今天的額度用完了，請稍後再試，或直接填寫下方表單。" },
  busy: { type: "error", message: "AI 小幫手現在比較忙，請稍後再試一次。" },
  blocked: { type: "handoff", message: HANDOFF_MESSAGE_WEB },
  error: { type: "error", message: "這題 AI 小幫手暫時答不出來，請改用下方表單，我們會親自回覆。" }
};

function reply(body: AskReply, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as { question?: unknown } | null;
  const question = typeof payload?.question === "string" ? payload.question.trim() : "";
  if (!question || [...question].length > MAX_QUESTION_INPUT) {
    return reply({ type: "error", message: `問題請控制在 ${MAX_QUESTION_INPUT} 字以內。` }, 400);
  }

  // 1. 含聯絡資料、合作意圖或太長的訊息直接轉真人，完全不送 Gemini
  if (checkBeforeAi(question).handoff) return reply({ type: "handoff", message: HANDOFF_MESSAGE_WEB });

  // 2. 免費層不能服務歐洲經濟區、瑞士、英國的使用者
  if (isPaidOnlyRegion(request)) {
    return reply({ type: "unavailable", message: "AI 小幫手不提供給你所在的地區，請改用下方表單或 Email 聯絡我們。" });
  }

  // 3. 同一個 IP 每小時最多問 10 題，保護免費額度
  if (!rateLimit(`ask:${clientIp(request)}`, ASK_LIMIT_PER_HOUR, 60 * 60 * 1000)) {
    return reply({ type: "limited", message: "問題有點多，休息一下再問，或直接填寫下方表單。" }, 429);
  }

  const result = await askGemini({ system: buildCollabSystemPrompt(), question });
  if (result.ok) return reply({ type: "answer", message: result.text });

  if (result.reason !== "not_configured") {
    console.error("[collab-ask] Gemini failed", result.reason, result.status ?? "");
  }
  return reply(failureMessages[result.reason]);
}
