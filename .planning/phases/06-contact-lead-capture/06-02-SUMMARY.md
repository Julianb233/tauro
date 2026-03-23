---
phase: 06-contact-lead-capture
plan: 02
status: complete
subsystem: lead-capture
tags: [book-tour, forms, leads-api, scheduling]
---

# Phase 06 Plan 02: Book a Tour Page — Summary

## One-liner

Built standalone /book-tour page with TourBookingForm component — property selector, date/time picker, agent preference, visitor info, and /api/leads integration.

## What was built

### TourBookingForm component (`src/components/tour-booking-form.tsx`)
- Client component with property selector dropdown populated from properties data
- Date picker (min=today) + time slot selector (9 AM – 5 PM)
- Agent preference dropdown
- Visitor info fields: firstName, lastName, email, phone
- Message textarea
- Required field validation
- Submits to `/api/leads` with type "showing" and scheduling fields
- Supports `preselectedPropertyId` prop for deep-linking
- Success/error states with icons

### Book a Tour page (`src/app/(site)/book-tour/page.tsx`)
- Hero section with "Schedule a Visit" label, H1, subtext
- Info banner: 3 items (Flexible Scheduling, Private Showings, Expert Agents) with Lucide icons
- TourBookingForm rendered in centered card with Suspense boundary
- "What to Expect" section with 3 numbered steps and gold badges
- Metadata via layout.tsx: title "Book a Tour", SEO description
- Deep-link support: `?property={id}` pre-selects property in dropdown

## Verification

- `npx tsc --noEmit` passes
- `npm run build` succeeds
- /book-tour page renders with all sections
- Property dropdown populated from properties data
- Deep link via ?property={id} pre-selects property

## Files Created / Modified

- `src/app/(site)/book-tour/page.tsx` — Tour booking page
- `src/app/(site)/book-tour/BookTourClient.tsx` — Client wrapper for useSearchParams
- `src/app/(site)/book-tour/layout.tsx` — Metadata
- `src/components/tour-booking-form.tsx` — TourBookingForm component
