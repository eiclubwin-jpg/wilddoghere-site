// 呼叫 Gemini API（免費層），只在伺服器端執行。金鑰放在環境變數 GEMINI_API_KEY，絕對不要放進前端程式。
// 使用 generateContent：每次呼叫各自獨立，Google 端不會保存對話串。
// 提醒：免費層送出的內容和回答可能被 Google 用來改善產品，所以呼叫前一定要先經過 lib/collab-guard.ts 過濾。

const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

/** Google 建議新專案使用的 Flash-Lite 模型，有免費層 */
export const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash-lite";

export type GeminiFailure = "not_configured" | "quota" | "busy" | "blocked" | "error";
export type GeminiResult = { ok: true; text: string } | { ok: false; reason: GeminiFailure; status?: number };

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string; thought?: boolean }> };
    finishReason?: string;
  }>;
  promptFeedback?: { blockReason?: string };
};

export async function askGemini(options: {
  system: string;
  question: string;
  maxOutputTokens?: number;
}): Promise<GeminiResult> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return { ok: false, reason: "not_configured" };
  const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;

  let response: Response;
  try {
    response = await fetch(`${API_BASE}/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: options.system }] },
        contents: [{ role: "user", parts: [{ text: options.question }] }],
        // 3.5 Flash-Lite 預設會做最少量的思考，思考用的 token 也算在這個上限裡，所以留寬一點
        generationConfig: { temperature: 0.3, maxOutputTokens: options.maxOutputTokens ?? 1024 }
      }),
      signal: AbortSignal.timeout(20_000)
    });
  } catch {
    return { ok: false, reason: "busy" };
  }

  if (response.status === 429) return { ok: false, reason: "quota", status: 429 };
  if (response.status >= 500) return { ok: false, reason: "busy", status: response.status };
  if (!response.ok) return { ok: false, reason: "error", status: response.status };

  const data = (await response.json().catch(() => null)) as GeminiResponse | null;
  const candidate = data?.candidates?.[0];
  const text = (candidate?.content?.parts ?? [])
    .filter((part) => !part.thought && typeof part.text === "string")
    .map((part) => part.text)
    .join("")
    .trim();

  if (!text) {
    const blocked = Boolean(data?.promptFeedback?.blockReason) || candidate?.finishReason === "SAFETY";
    return { ok: false, reason: blocked ? "blocked" : "error" };
  }
  return { ok: true, text };
}
