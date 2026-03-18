---
phase: 04-agent-pages
plan: 04
subsystem: agent-recruitment
tags: [join-page, agent-application, lead-capture, form]
dependencies:
  requires: [04-01]
  provides: [join-page, agent-application-leads]
  affects: []
tech-stack:
  added: []
  patterns: [form-state-machine, lead-payload-extension]
key-files:
  created:
    - src/app/(site)/join/page.tsx
  modified:
    - src/app/api/leads/route.ts
decisions: []
metrics:
  duration: 1m 45s
  completed: 2026-03-18
---

# Phase 4 Plan 4: Join Our Team Page Summary

**One-liner:** Agent recruitment page at /join with value proposition grid and application form capturing license info, experience, and brokerage via /api/leads.

## What Was Done

### Task 1: Extend LeadPayload for agent applications
- Added `"agent-application"` to the LeadPayload type union
- Added optional fields: `licenseNumber`, `yearsExperience`, `currentBrokerage`, `whyJoin`
- Added `agent-application` tag in `buildGhlContact`
- Mapped new fields to GHL custom fields (license_number, years_experience, current_brokerage, why_join)
- Note: 04-03 had concurrently added `agent-contact` type with `agentName`/`agentSlug` fields; both coexist cleanly

### Task 2: Create Join Our Team page
- Built `/join` page as a "use client" component following established form patterns
- **Hero section:** Gold "Careers" label, "Join the Tauro Team" heading, recruitment pitch
- **Benefits grid:** 6 cards in 3-column layout (Competitive Splits, Premium Brand, Cutting-Edge Tech, Ongoing Training, Lead Generation, Collaborative Culture)
- **Requirements checklist:** 4 items with gold CheckCircle icons (license, work ethic, communication, team growth)
- **Application form:** First/Last Name, Email, Phone, PA License Number (RS-XXXXXX), Years of Experience (select dropdown), Current Brokerage, Why Join Tauro (textarea), Additional Notes (textarea)
- Form submits to `/api/leads` with type `"agent-application"` and all agent-specific fields
- Success state: "Application Submitted!" with 2-3 business day response commitment
- Error state: Destructive banner with error message
- Privacy policy link at form bottom

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- TypeScript compilation passes cleanly (`npx tsc --noEmit`)
- All form fields properly typed and mapped to LeadPayload
- Form submission targets `/api/leads` with correct payload structure
- Benefits grid renders 6 cards with proper icons and styling
- Success/error states follow established patterns from contact and sell pages
