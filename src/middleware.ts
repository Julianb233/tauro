import { NextRequest, NextResponse } from "next/server";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

// ---------------------------------------------------------------------------
// Next.js Middleware — rate limiting + CSRF (auth removed for open access)
// ---------------------------------------------------------------------------

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- API routes: rate limiting + CSRF origin check ---
  if (pathname.startsWith("/api")) {
    const ip = getClientIp(request.headers);

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const method = request.method.toUpperCase();
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      const origin = request.headers.get("origin");
      const host = request.headers.get("host");

      if (origin && host) {
        try {
          const originHost = new URL(origin).host;
          if (originHost !== host) {
            return NextResponse.json({ error: "Forbidden: origin mismatch" }, { status: 403 });
          }
        } catch {
          return NextResponse.json({ error: "Forbidden: invalid origin" }, { status: 403 });
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
