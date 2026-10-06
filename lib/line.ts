// 用 LINE 官方帳號的 Messaging API 推播通知給自己（LINE Notify 已停止服務）。
// 需要的環境變數：
//   LINE_CHANNEL_ACCESS_TOKEN：LINE Developers 後台 Messaging API 分頁的 Channel access token（long-lived）
//   LINE_OWNER_USER_ID：你自己的 userId（U 開頭 33 碼，在 Basic settings 的 Your user ID），不是 LINE ID
// 你要先把這個官方帳號加為好友，才收得到推播。每則推播會算進官方帳號每月的免費訊息則數。

export function isLineNotifyConfigured(): boolean {
  return Boolean(process.env.LINE_CHANNEL_ACCESS_TOKEN?.trim() && process.env.LINE_OWNER_USER_ID?.trim());
}

export async function pushLineTextToOwner(text: string): Promise<{ ok: boolean; status?: number }> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN?.trim();
  const to = process.env.LINE_OWNER_USER_ID?.trim();
  if (!token || !to) return { ok: false };

  try {
    const response = await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      // LINE 文字訊息上限 5,000 字
      body: JSON.stringify({ to, messages: [{ type: "text", text: text.slice(0, 4900) }] }),
      signal: AbortSignal.timeout(10_000)
    });
    return { ok: response.ok, status: response.status };
  } catch {
    return { ok: false };
  }
}
