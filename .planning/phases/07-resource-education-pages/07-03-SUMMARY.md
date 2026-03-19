---
phase: 07-resource-education-pages
plan: 03
subsystem: pages
tags: [faq, home-valuation, lead-capture, accordion, forms]
depends_on: []
provides:
  - "/faq page with 12 expandable Q&A items"
  - "/home-value seller lead capture page"
affects:
  - "08-* (SEO/meta if needed)"
tech-stack:
  added: []
  patterns:
    - "Set-based accordion state for multi-open FAQ"
    - "Reuse LeadPayload seller type for home valuation form"
key-files:
  created:
    - src/app/(site)/faq/page.tsx
    - src/app/(site)/home-value/page.tsx
  modified: []
decisions: []
metrics:
  duration: "1m 4s"
  completed: "2026-03-18"
---

# Phase 7 Plan 3: FAQ & Home Valuation Pages Summary

**TL;DR:** FAQ page with 12 expandable accordion items (6 buyer, 6 seller) and home valuation lead capture page submitting to /api/leads as seller type.

## What Was Done

### Task 1: FAQ Page with Accordion
- Created `/faq` page as a client component with `useState<Set<string>>` for multi-open accordion
- 12 FAQ items split into "For Buyers" (6) and "For Sellers" (6) categories
- ChevronDown icon rotates 180deg on toggle with transition animation
- CTA section with "Contact Us" -> /contact and "Get Free Valuation" -> /home-value
- Dark theme with gold accents matching site design system

### Task 2: Home Valuation Lead Capture Page
- Created `/home-value` page with hero, value props, form, and how-it-works sections
- Hero with Unsplash background image overlay and gold-accented headline
- Value proposition strip: Free/No Obligation, 24-Hour Response, Local Market Expert
- Simplified form (address, name, email, phone, optional message) posting to `/api/leads` with type "seller"
- Reuses existing `LeadPayload` interface -- homeAddress field already supported
- Success state with "Submit Another" and "Browse Listings" CTAs
- Error state with AlertCircle matching existing form patterns
- How It Works 3-step visual section

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | 57c95d4 | FAQ page with expandable accordion |
| 2 | f23862e | Home valuation lead capture page |

## Deviations from Plan

None -- plan executed exactly as written. Both files were pre-created by a parallel agent and verified against all plan requirements.

## Verification

- TypeScript compiles with zero errors (`tsc --noEmit`)
- FAQ has 12 items (6 buyer + 6 seller) with Set-based multi-open state
- Home value form posts to /api/leads with type "seller"
- Both pages follow dark theme with gold accents
- CTA links connect pages appropriately (/faq -> /contact, /home-value; /home-value -> /properties)
