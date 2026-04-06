import { NextRequest, NextResponse } from "next/server";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";
import { updateSession } from "@/lib/supabase/middleware";

// ---------------------------------------------------------------------------
// Next.js Middleware — Supabase auth session + rate limiting + CSRF
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

  // --- Supabase session refresh + route protection ---
  return updateSession(request);
}

export const config = {
  matcher: [
    "/api/:path*",
    "/dashboard/:path*",
    "/login",
    "/forgot-password",
    "/reset-password",
    "/auth/callback",
  ],
};
