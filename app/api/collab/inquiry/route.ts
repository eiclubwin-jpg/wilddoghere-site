// 合作需求表單：POST 表單資料 → 用 LINE 推播給野狗爸、野狗媽。
// 這裡的資料（聯絡人、聯絡方式、產品細節）不會經過 Gemini。

import type { InquiryReply } from "@/lib/collab-api";
import { collabFormats } from "@/lib/collab-faq";
import { isLineNotifyConfigured, pushLineTextToOwner } from "@/lib/line";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const INQUIRY_LIMIT_PER_HOUR = 3;

const textFields = {
  brand: { label: "品牌／公司", max: 80, required: true },
  contactName: { label: "聯絡人", max: 40, required: true },
  contact: { label: "聯絡方式", max: 120, required: true },
  product: { label: "產品或活動", max: 120, required: true },
  timeline: { label: "預計時程", max: 80, required: false },
  budget: { label: "預算", max: 80, required: false },
  message: { label: "補充說明", max: 1000, required: false }
} as const;

type TextField = keyof typeof textFields;

function reply(body: InquiryReply, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function clean(value: unknown): string {
  if (typeof value !== "string") return "";
  // 拿掉控制字元，保留換行
  return value.replace(/[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
}

export async function POST(request: Request) {
  if (!isLineNotifyConfigured()) {
    return reply({ ok: false, error: "not_configured", message: "表單暫時無法送出，請改用 Email 聯絡我們。" }, 503);
  }

  const payload = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!payload) return reply({ ok: false, error: "invalid", message: "資料格式不正確，請重新整理後再試。" }, 400);

  // 隱藏欄位有填值的通常是機器人：假裝成功，但不發通知
  if (clean(payload.website)) return reply({ ok: true });

  if (payload.consent !== true) {
    return reply({ ok: false, error: "invalid", message: "請先勾選同意個資使用說明。" }, 400);
  }

  const values = {} as Record<TextField, string>;
  for (const [key, rule] of Object.entries(textFields) as Array<[TextField, (typeof textFields)[TextField]]>) {
    const value = clean(payload[key]);
    if (rule.required && !value) {
      return reply({ ok: false, error: "invalid", message: `請填寫「${rule.label}」。` }, 400);
    }
    if ([...value].length > rule.max) {
      return reply({ ok: false, error: "invalid", message: `「${rule.label}」請控制在 ${rule.max} 字以內。` }, 400);
    }
    values[key] = value;
  }

  const formats = Array.isArray(payload.formats)
    ? payload.formats.filter((item): item is string => typeof item === "string" && collabFormats.includes(item))
    : [];

  if (!rateLimit(`inquiry:${clientIp(request)}`, INQUIRY_LIMIT_PER_HOUR, 60 * 60 * 1000)) {
    return reply({ ok: false, error: "limited", message: "送出次數有點多，請稍後再試，或改用 Email 聯絡我們。" }, 429);
  }

  const sentAt = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei", hour12: false });
  const lines = [
    "【WildDogHere 新合作洽詢】",
    `品牌／公司：${values.brand}`,
    `聯絡人：${values.contactName}`,
    `聯絡方式：${values.contact}`,
    `產品或活動：${values.product}`,
    `希望的內容形式：${formats.length ? formats.join("、") : "未選"}`,
    `預計時程：${values.timeline || "未填"}`,
    `預算：${values.budget || "未填"}`,
    `補充說明：${values.message ? `\n${values.message}` : "未填"}`,
    "",
    `送出時間：${sentAt}（台灣時間）`
  ];

  const result = await pushLineTextToOwner(lines.join("\n"));
  if (!result.ok) {
    console.error("[collab-inquiry] LINE push failed", result.status ?? "");
    return reply({ ok: false, error: "send_failed", message: "送出失敗，請再試一次，或改用 Email 聯絡我們。" }, 502);
  }
  return reply({ ok: true });
}
