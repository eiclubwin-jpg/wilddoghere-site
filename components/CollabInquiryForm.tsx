"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import type { InquiryReply } from "@/lib/collab-api";

type FormValues = {
  brand: string;
  contactName: string;
  contact: string;
  product: string;
  timeline: string;
  budget: string;
  message: string;
  /** 防機器人的隱藏欄位，真人看不到 */
  website: string;
};

const emptyValues: FormValues = {
  brand: "",
  contactName: "",
  contact: "",
  product: "",
  timeline: "",
  budget: "",
  message: "",
  website: ""
};

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "failed"; message: string; offerEmail: boolean };

type CollabInquiryFormProps = {
  formats: string[];
  email: string;
  lineUrl: string;
};

const inputClass =
  "mt-2 min-h-12 w-full rounded-xl border border-cocoa/15 bg-cream px-4 text-base text-coffee outline-none transition placeholder:text-cocoa/35 focus:border-clay";

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-bold text-coffee">
        {label}
        {required ? <span className="text-clay"> *</span> : <span className="font-semibold text-cocoa/45">（選填）</span>}
      </label>
      {children}
    </div>
  );
}

export function CollabInquiryForm({ formats, email, lineUrl }: CollabInquiryFormProps) {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [selected, setSelected] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  function update(key: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function toggleFormat(format: string) {
    setSelected((current) => (current.includes(format) ? current.filter((item) => item !== format) : [...current, format]));
  }

  // 表單送不出去時，改用 Email 寄出，內容自動帶入
  function mailtoHref() {
    const body = [
      `品牌／公司：${values.brand}`,
      `聯絡人：${values.contactName}`,
      `聯絡方式：${values.contact}`,
      `產品或活動：${values.product}`,
      `希望的內容形式：${selected.join("、") || "未選"}`,
      `預計時程：${values.timeline || "未填"}`,
      `預算：${values.budget || "未填"}`,
      "",
      values.message
    ].join("\n");
    return `mailto:${email}?subject=${encodeURIComponent(`合作洽詢：${values.brand || "品牌名稱"}`)}&body=${encodeURIComponent(body)}`;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "sending") return;
    setStatus({ state: "sending" });
    try {
      const response = await fetch("/api/collab/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, formats: selected, consent })
      });
      const result = (await response.json()) as InquiryReply;
      if (result.ok) {
        setStatus({ state: "sent" });
        setValues(emptyValues);
        setSelected([]);
        setConsent(false);
        return;
      }
      setStatus({ state: "failed", message: result.message, offerEmail: result.error !== "invalid" });
    } catch {
      setStatus({ state: "failed", message: "連線好像出了點問題，請再試一次，或改用 Email 聯絡我們。", offerEmail: true });
    }
  }

  return (
    <section
      id="inquiry"
      aria-labelledby="inquiry-title"
      className="relative scroll-mt-24 rounded-[1.5rem] bg-white/80 p-7 shadow-soft sm:p-9"
    >
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay">合作需求表單</p>
      <h2 id="inquiry-title" className="mt-2 text-2xl font-bold text-coffee">
        留下合作需求，我們親自回覆
      </h2>
      <p className="mt-3 text-sm leading-7 text-cocoa/68">送出後會直接通知野狗爸、野狗媽。這份資料不會交給 AI 處理。</p>

      {status.state === "sent" ? (
        <div role="status" className="mt-6 rounded-xl bg-butter/50 px-5 py-4 text-sm leading-7 text-coffee">
          已收到！野狗爸、野狗媽會用你留下的聯絡方式回覆。
          <button type="button" onClick={() => setStatus({ state: "idle" })} className="ml-2 font-bold text-clay underline">
            再填一份
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="inquiry-brand" label="品牌／公司名稱" required>
              <input
                id="inquiry-brand"
                required
                maxLength={80}
                value={values.brand}
                onChange={(event) => update("brand", event.target.value)}
                autoComplete="organization"
                className={inputClass}
              />
            </Field>
            <Field id="inquiry-name" label="聯絡人" required>
              <input
                id="inquiry-name"
                required
                maxLength={40}
                value={values.contactName}
                onChange={(event) => update("contactName", event.target.value)}
                autoComplete="name"
                className={inputClass}
              />
            </Field>
          </div>
          <Field id="inquiry-contact" label="聯絡方式（Email、電話或 LINE ID）" required>
            <input
              id="inquiry-contact"
              required
              maxLength={120}
              value={values.contact}
              onChange={(event) => update("contact", event.target.value)}
              className={inputClass}
            />
          </Field>
          <Field id="inquiry-product" label="產品或活動" required>
            <input
              id="inquiry-product"
              required
              maxLength={120}
              value={values.product}
              onChange={(event) => update("product", event.target.value)}
              placeholder="例如：兒童積木新系列、親子餐廳體驗"
              className={inputClass}
            />
          </Field>

          <fieldset>
            <legend className="text-sm font-bold text-coffee">
              希望的內容形式<span className="font-semibold text-cocoa/45">（可複選）</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {formats.map((format) => {
                const checked = selected.includes(format);
                return (
                  <label
                    key={format}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-clay/40 ${
                      checked ? "border-clay bg-orange-50 text-clay" : "border-cocoa/15 bg-cream text-cocoa/75 hover:border-clay/60"
                    }`}
                  >
                    <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggleFormat(format)} />
                    {format}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="inquiry-timeline" label="預計時程">
              <input
                id="inquiry-timeline"
                maxLength={80}
                value={values.timeline}
                onChange={(event) => update("timeline", event.target.value)}
                placeholder="例如：11 月中上線"
                className={inputClass}
              />
            </Field>
            <Field id="inquiry-budget" label="預算">
              <input
                id="inquiry-budget"
                maxLength={80}
                value={values.budget}
                onChange={(event) => update("budget", event.target.value)}
                placeholder="例如：產品體驗、1～3 萬"
                className={inputClass}
              />
            </Field>
          </div>
          <Field id="inquiry-message" label="補充說明">
            <textarea
              id="inquiry-message"
              rows={4}
              maxLength={1000}
              value={values.message}
              onChange={(event) => update("message", event.target.value)}
              className={`${inputClass} py-3 leading-7`}
            />
          </Field>

          <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
            <label>
              請勿填寫
              <input
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(event) => update("website", event.target.value)}
              />
            </label>
          </div>

          <label className="flex items-start gap-3 text-sm leading-6 text-cocoa/75">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-clay"
            />
            <span>
              我同意 WildDogHere 使用以上資料回覆這次合作洽詢。資料會透過 LINE 傳給野狗爸、野狗媽，不會用在其他用途，也不會交給 AI 處理。
            </span>
          </label>

          {status.state === "failed" ? (
            <div role="alert" className="rounded-xl bg-orange-50 px-5 py-4 text-sm leading-7 text-coffee">
              {status.message}
              {status.offerEmail ? (
                <>
                  {" "}
                  <a href={mailtoHref()} className="font-bold text-clay underline">
                    改用 Email 寄出
                  </a>
                </>
              ) : null}
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={status.state === "sending"}
              className="min-h-12 rounded-full bg-cocoa px-7 text-sm font-bold text-cream transition hover:bg-coffee disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status.state === "sending" ? "送出中…" : "送出合作需求"}
            </button>
            {lineUrl ? (
              <a href={lineUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-clay underline">
                或直接用 LINE 洽詢
              </a>
            ) : null}
          </div>
        </form>
      )}
    </section>
  );
}
