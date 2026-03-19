---
phase: 12-email-notifications
plan: 03
status: complete
completed_at: 2026-03-19
---

## Summary

Created admin daily digest email system: a branded email template, a cron-triggered API route, the `sendDailyDigest` function in the email service, and Vercel Cron configuration for daily 8 AM ET delivery.

### Artifacts Created

- **src/emails/daily-digest.tsx** — Branded HTML email template with dark mode Tauro styling. Shows large total count (48px gold number), type breakdown with colored dot indicators (only types with count > 0), recent leads list (up to 10) with name/type badge/email/time, "View All Leads" CTA button, and a "Quiet day!" message when zero leads.
- **src/app/api/cron/daily-digest/route.ts** — GET handler that: verifies `CRON_SECRET` authorization, queries leads from last 24h via Supabase service role client, aggregates by type, formats recent leads with ET timezone, sends digest via `sendDailyDigest`. Returns 401 for unauthorized, 503 for unconfigured services, 500 for failures.
- **src/lib/email.ts** — Added `sendDailyDigest` function following same pattern as other email functions (lazy Resend client, graceful degradation, error-safe). Sends to `ADMIN_EMAIL`.
- **vercel.json** — Added `crons` array with `/api/cron/daily-digest` scheduled at `0 13 * * *` (1 PM UTC = 8 AM ET).

### Approach

The cron route uses `@supabase/supabase-js` directly with `SUPABASE_SERVICE_ROLE_KEY` instead of the cookie-based server client, since cron jobs have no cookie context. The daily digest template uses raw HTML strings (same pattern as other templates) to avoid React Email component dependency issues.

### Verification

- `npm run build` passes without errors
- `npx tsc --noEmit` passes
- Cron route exports GET and checks authorization header
- `sendDailyDigest` exported from `src/lib/email.ts`
- `vercel.json` is valid JSON with crons config
- Zero-lead days still send a digest with "Quiet day!" message
