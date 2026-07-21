import { NextRequest, NextResponse } from "next/server";

const PROJECT_ID = "wilddoghere";

const inactiveHtml = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WildDogHere｜核准暫停</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:#f5f7fb;color:#13233a;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans TC",sans-serif}.panel{width:min(100%,620px);padding:42px;border:1px solid #d6deea;border-radius:24px;background:#fff;box-shadow:0 24px 70px rgba(19,35,58,.12)}h1{margin:.4rem 0 1rem;font-size:clamp(32px,7vw,56px);line-height:1.05}.eyebrow{color:#a33e37;font-weight:900;letter-spacing:.12em}.muted{color:#526175;line-height:1.7}</style></head><body><main class="panel"><div class="eyebrow">季度核准無效</div><h1>WildDogHere 暫時不可用</h1><p class="muted">此網站已脫離 CalMagic 控制中心，改由 WildDogHere 自己的季度核准閘門保護。核准有效後會自動恢復。</p></main></body></html>`;

function canonicalPayload(token: Record<string, unknown>) {
  const unsigned = Object.fromEntries(
    Object.entries(token)
      .filter(([key]) => key !== "signature")
      .sort(([a], [b]) => a.localeCompare(b)),
  );
  return new TextEncoder().encode(JSON.stringify(unsigned));
}

function pemToBytes(pem: string) {
  const base64 = pem.replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\s/g, "");
  return Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
}

async function approvalValid() {
  const tokenText = process.env.WILDDOG_APPROVAL_TOKEN;
  const publicKeyPem = process.env.WILDDOG_PUBLIC_KEY;
  const approvedVersion = process.env.WILDDOG_APPROVED_VERSION;
  if (!tokenText || !publicKeyPem || !approvedVersion) return false;
  try {
    const token = JSON.parse(tokenText) as Record<string, unknown>;
    if (
      token.project_id !== PROJECT_ID ||
      token.policy_version !== "1" ||
      token.test_only === true ||
      token.approved_version !== approvedVersion ||
      typeof token.expires_at !== "string" ||
      typeof token.signature !== "string" ||
      Date.parse(token.expires_at) <= Date.now()
    ) return false;
    const key = await crypto.subtle.importKey(
      "spki",
      pemToBytes(publicKeyPem),
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"],
    );
    return await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      Uint8Array.from(atob(token.signature), (char) => char.charCodeAt(0)),
      canonicalPayload(token),
    );
  } catch {
    return false;
  }
}

export async function middleware(_request: NextRequest) {
  if (await approvalValid()) return NextResponse.next();
  return new NextResponse(inactiveHtml, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow, noarchive",
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|feed.xml).*)"],
};
