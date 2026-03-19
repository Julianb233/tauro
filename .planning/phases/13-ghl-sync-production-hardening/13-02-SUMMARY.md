# 13-02 Summary: Security Hardening

## What was built

1. **`src/middleware.ts`** - Next.js middleware with:
   - Rate limiting: 10 req/min per IP on all `/api/*` routes
   - CSRF origin check on mutating requests (POST/PUT/PATCH/DELETE)
   - Auth session management for `/dashboard` and `/login` routes
   - IP extraction from `x-forwarded-for` / `x-real-ip` headers

2. **`src/lib/rate-limit.ts`** - Shared in-memory rate limiter:
   - `isRateLimited(ip)` - Track and limit requests per IP
   - `getClientIp(headers)` - Extract client IP from headers
   - Auto-cleanup of stale entries every 5 minutes

3. **`src/components/turnstile.tsx`** - Cloudflare Turnstile CAPTCHA component:
   - Dark theme to match Tauro design
   - Graceful degradation when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` not set
   - Script loaded via `next/script` with `afterInteractive` strategy

4. **`src/lib/turnstile.ts`** - Server-side Turnstile verification:
   - Validates tokens against Cloudflare API
   - Gracefully skips when `TURNSTILE_SECRET_KEY` not set (dev mode)

5. **`src/lib/sanitize.ts`** - Input sanitization:
   - Strips HTML tags to prevent stored XSS

6. **All 5 public forms updated** with Turnstile integration:
   - `src/components/contact-form.tsx`
   - `src/components/tour-booking-form.tsx`
   - `src/components/seller-inquiry-form.tsx`
   - `src/app/(site)/join/page.tsx`
   - `src/app/(site)/home-value/page.tsx`
   - Submit buttons disabled until CAPTCHA solved
   - Token sent as `captchaToken` in POST body

7. **`src/app/api/leads/route.ts`** - Server-side validation:
   - Turnstile token verified before processing
   - HTML sanitization applied to all text fields
   - Per-route rate limiting removed (handled by middleware)

## Env vars required

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` - Turnstile site key (client-side)
- `TURNSTILE_SECRET_KEY` - Turnstile secret key (server-side)

## Verification

- TypeScript type checking passes
- All 5 forms import and render Turnstile component
- Server validates tokens when TURNSTILE_SECRET_KEY is set
- Graceful degradation in development (no keys required)
