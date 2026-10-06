// 簡易頻率限制，記在伺服器記憶體裡。
// Vercel 可能同時開好幾台機器，所以只擋得住一般的狂按和簡單的機器人；
// 真的被刻意灌爆時，最壞情況是 Gemini 免費額度用完、AI 暫停到隔天，不會被收費。

const buckets = new Map<string, number[]>();

/** 回傳 true 代表這次可以放行 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 5000) {
    for (const [bucketKey, times] of buckets) {
      if (!times.some((time) => now - time < windowMs)) buckets.delete(bucketKey);
    }
  }
  return true;
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip")?.trim() || "unknown";
}
