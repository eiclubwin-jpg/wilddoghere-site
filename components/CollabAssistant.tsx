"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { MAX_QUESTION_INPUT, type AskReply, type AskReplyType } from "@/lib/collab-api";

type Preset = { id: string; question: string; answer: string };

type AssistantKind = AskReplyType | "faq" | "pending";

type ChatMessage =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; text: string; kind: AssistantKind };

type CollabAssistantProps = {
  presets: Preset[];
  email: string;
  lineUrl: string;
};

// 這幾種回覆要附上表單、LINE、Email 的按鈕
const needsContactOptions = new Set<AssistantKind>(["handoff", "unavailable", "limited", "error"]);

export function CollabAssistant({ presets, email, lineUrl }: CollabAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const nextId = useRef(1);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages]);

  // 預設問題直接顯示 FAQ 的答案，不呼叫 AI
  function showPreset(preset: Preset) {
    const userId = nextId.current++;
    const replyId = nextId.current++;
    setMessages((current) => [
      ...current,
      { id: userId, role: "user", text: preset.question },
      { id: replyId, role: "assistant", text: preset.answer, kind: "faq" }
    ]);
  }

  async function ask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    const userId = nextId.current++;
    const pendingId = nextId.current++;
    setMessages((current) => [
      ...current,
      { id: userId, role: "user", text: question },
      { id: pendingId, role: "assistant", text: "想一下…", kind: "pending" }
    ]);
    setInput("");
    setLoading(true);

    let result: AskReply;
    try {
      const response = await fetch("/api/collab/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });
      result = (await response.json()) as AskReply;
      if (!result?.message) throw new Error("empty reply");
    } catch {
      result = { type: "error", message: "連線好像出了點問題，請稍後再試，或直接填寫下方表單。" };
    }

    setMessages((current) =>
      current.map((message) =>
        message.id === pendingId ? { id: pendingId, role: "assistant", text: result.message, kind: result.type } : message
      )
    );
    setLoading(false);
  }

  return (
    <section
      id="assistant"
      aria-labelledby="assistant-title"
      className="scroll-mt-24 rounded-[1.5rem] bg-white/80 p-7 shadow-soft sm:p-9"
    >
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay">AI 小幫手</p>
      <h2 id="assistant-title" className="mt-2 text-2xl font-bold text-coffee">
        先問問野狗軍團 AI 小幫手
      </h2>
      <p className="mt-3 text-sm leading-7 text-cocoa/68">
        品類、內容形式、合作原則這類一般問題，可以先在這裡問。報價、檔期與正式邀約，會由野狗爸、野狗媽親自回覆。
      </p>

      {presets.length > 0 ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => showPreset(preset)}
              className="rounded-full border border-cocoa/15 bg-cream px-4 py-2 text-sm font-semibold text-cocoa transition hover:border-clay hover:text-clay"
            >
              {preset.question}
            </button>
          ))}
        </div>
      ) : null}

      {messages.length > 0 ? (
        <ol ref={listRef} aria-live="polite" className="mt-6 grid max-h-[26rem] gap-3 overflow-y-auto pr-1">
          {messages.map((message) =>
            message.role === "user" ? (
              <li
                key={message.id}
                className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-cocoa px-4 py-3 text-sm leading-7 text-cream"
              >
                {message.text}
              </li>
            ) : (
              <li
                key={message.id}
                className="max-w-[92%] rounded-2xl rounded-bl-md bg-cream px-4 py-3 text-sm leading-7 text-cocoa"
              >
                <p className={message.kind === "pending" ? "animate-pulse text-cocoa/55" : "whitespace-pre-line"}>
                  {message.text}
                </p>
                {message.kind === "answer" ? (
                  <p className="mt-2 text-xs text-cocoa/50">AI 生成，僅供參考，以野狗爸、野狗媽的回覆為準。</p>
                ) : null}
                {needsContactOptions.has(message.kind) ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href="#inquiry" className="rounded-full bg-cocoa px-4 py-2 text-xs font-bold text-cream">
                      填寫合作需求表單
                    </a>
                    {lineUrl ? (
                      <a
                        href={lineUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-cocoa/20 bg-white px-4 py-2 text-xs font-bold text-cocoa"
                      >
                        LINE 洽詢
                      </a>
                    ) : null}
                    <a
                      href={`mailto:${email}`}
                      className="rounded-full border border-cocoa/20 bg-white px-4 py-2 text-xs font-bold text-cocoa"
                    >
                      寄 Email
                    </a>
                  </div>
                ) : null}
              </li>
            )
          )}
        </ol>
      ) : null}

      <form onSubmit={ask} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="collab-question" className="sr-only">
          輸入你想問的合作問題
        </label>
        <input
          id="collab-question"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          maxLength={MAX_QUESTION_INPUT}
          autoComplete="off"
          placeholder="例如：玩具開箱會拍影片嗎？"
          className="min-h-12 w-full rounded-xl border border-cocoa/15 bg-cream px-4 text-base text-coffee outline-none transition placeholder:text-cocoa/35 focus:border-clay"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="min-h-12 shrink-0 rounded-full bg-cocoa px-6 text-sm font-bold text-cream transition hover:bg-coffee disabled:cursor-not-allowed disabled:opacity-45"
        >
          {loading ? "回覆中…" : "送出"}
        </button>
      </form>
      <p className="mt-3 text-xs leading-6 text-cocoa/55">
        請不要在這裡輸入聯絡資料或未公開的產品資訊，正式洽詢請用下方表單。問題會交給 Google Gemini 產生回答，內容可能被 Google 用來改善服務。
      </p>
    </section>
  );
}
