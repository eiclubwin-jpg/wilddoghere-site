// 合作洽詢頁前後端共用的回應格式。

export type AskReplyType = "answer" | "handoff" | "unavailable" | "limited" | "error";
export type AskReply = { type: AskReplyType; message: string };

export type InquiryError = "not_configured" | "invalid" | "limited" | "send_failed";
export type InquiryReply = { ok: true } | { ok: false; error: InquiryError; message: string };

export const MAX_QUESTION_INPUT = 300;
