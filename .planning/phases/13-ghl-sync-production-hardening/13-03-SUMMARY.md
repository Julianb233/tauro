# 13-03 Summary: Analytics & Error Tracking

## What was built

1. **Analytics (already in place from earlier work)**:
   - `src/components/GoogleAnalytics.tsx` - GA4 with `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - `@vercel/analytics` - Vercel Analytics imported in layout.tsx
   - `@vercel/speed-insights` - Speed Insights imported in layout.tsx

2. **Sentry error tracking (new)**:
   - `sentry.client.config.ts` - Browser-side Sentry init (10% trace sampling, replay on error)
   - `sentry.server.config.ts` - Server-side Sentry init (10% trace sampling)
   - `sentry.edge.config.ts` - Edge runtime Sentry init (10% trace sampling)
   - All configs: enabled only in production (`NODE_ENV === "production"`)

3. **`next.config.ts`** - Wrapped with `withSentryConfig`:
   - Source map upload suppressed in local dev
   - `/monitoring` tunnel route to bypass ad blockers
   - Source maps hidden from client

4. **`src/app/global-error.tsx`** - Updated to capture exceptions:
   - `Sentry.captureException(error)` in useEffect
   - Branded error page with Try Again / Go Home buttons

## Packages installed

- `@vercel/analytics`
- `@vercel/speed-insights`
- `@sentry/nextjs`

## Env vars required

- `NEXT_PUBLIC_SENTRY_DSN` - Sentry DSN for error reporting
- `SENTRY_AUTH_TOKEN` - Sentry auth token for source map uploads
- `SENTRY_ORG` - Sentry organization slug
- `SENTRY_PROJECT` - Sentry project slug

## Verification

- TypeScript type checking passes
- Build compilation succeeds (Sentry plugin loads correctly)
- All analytics components render in layout
- Global error boundary captures exceptions
