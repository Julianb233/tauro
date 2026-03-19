---
phase: 12-email-notifications
plan: 02
status: complete
completed_at: 2026-03-19
---

## Summary

Wired email triggers into the existing `/api/leads` POST handler so every form submission fires the appropriate confirmation and notification emails. All email calls use fire-and-forget pattern (not awaited, with `.catch()` safety net) so email failures never block or break the API response.

### Changes Made

- **src/app/api/leads/route.ts** — Added email section (section 2) between DB insert and GHL webhook:
  - **2a. Visitor confirmation**: All lead types except `agent-application` trigger `sendLeadConfirmation` with firstName, type, and message.
  - **2b. Application confirmation**: `agent-application` type triggers `sendApplicationConfirmation` with firstName and licenseNumber.
  - **2c. Agent notification**: Non-application leads trigger `sendAgentNotification`. Resolves agent email from Supabase if `agentId` is set, falls back to `ADMIN_EMAIL` (or hardcoded default).

### Approach

Email functions were already imported at the top of the file (from 12-01 work). The email section sits inside a try/catch block as an additional safety layer. Each individual email call uses `.catch()` for fire-and-forget semantics. The existing DB insert, GHL webhook, rate limiting, and validation logic remain untouched.

### Verification

- `npm run build` passes without errors
- `npx tsc --noEmit` passes
- POST with type "contact" triggers sendLeadConfirmation + sendAgentNotification
- POST with type "agent-application" triggers sendApplicationConfirmation only
- All email calls are fire-and-forget — no email failure can cause a non-200 response
