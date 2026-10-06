// Gemini API 條款：服務歐洲經濟區、瑞士、英國的使用者時只能用付費服務。
// 目前用的是免費層，所以這些地區的訪客不呼叫 AI。國家代碼來自 Vercel 的 x-vercel-ip-country 標頭。

const PAID_ONLY_REGIONS = new Set([
  // 歐盟
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  // 歐洲經濟區其他國家、瑞士、英國
  "IS", "LI", "NO", "CH", "GB"
]);

export function isPaidOnlyRegion(request: Request): boolean {
  const country = request.headers.get("x-vercel-ip-country")?.trim().toUpperCase();
  return Boolean(country && PAID_ONLY_REGIONS.has(country));
}
