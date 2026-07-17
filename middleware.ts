import { NextRequest, NextResponse } from "next/server";

const CONTROL_STATUS_URL = "https://calmagic-is-fat.lakontratw.workers.dev/api/control/wilddoghere";

const inactiveHtml = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WildDogHere｜暫停使用</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:#f5f7fb;color:#13233a;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans TC",sans-serif}.panel{width:min(100%,620px);padding:42px;border:1px solid #d6deea;border-radius:24px;background:#fff;box-shadow:0 24px 70px rgba(19,35,58,.12)}h1{margin:.4rem 0 1rem;font-size:clamp(32px,7vw,56px);line-height:1.05}.eyebrow{color:#a33e37;font-weight:900;letter-spacing:.12em}.muted{color:#526175;line-height:1.7}</style></head><body><main class="panel"><div class="eyebrow">目前暫停</div><h1>WildDogHere 暫時不可用</h1><p class="muted">管理者目前將此專案設為 Inactive。重新切換為 Active 後即可恢復使用。</p></main></body></html>`;

export async function middleware(_request: NextRequest) {
  try {
    const response = await fetch(CONTROL_STATUS_URL, { cache: "no-store" });
    const status = await response.json() as { active?: boolean };
    if (response.ok && status.active === true) return NextResponse.next();
  } catch {
    // Fail closed when the control plane is unavailable.
  }
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
