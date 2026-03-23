---
phase: 06-contact-lead-capture
plan: 03
status: complete
subsystem: lead-capture
tags: [sell-page, seller-inquiry, ghl-webhook, leads-api]
---

# Phase 06 Plan 03: Seller Inquiry + GHL Webhook — Summary

## One-liner

Built /sell page with SellerInquiryForm and verified /api/leads route handles all lead types (contact, showing, seller) with GoHighLevel webhook integration.

## What was built

### SellerInquiryForm component (`src/components/seller-inquiry-form.tsx`)
- Client component with 3 sections: Your Information, Property Details, Selling Details
- Section 1: firstName, lastName, email, phone
- Section 2: homeAddress, beds (select), baths (select), sqft
- Section 3: timeline (select), reason (select), message textarea
- Required field validation + email format check
- Submits to `/api/leads` with type "seller"
- Success state: "Inquiry Received!" with 24-hour response message
- Error state with retry button

### Sell page (`src/app/(site)/sell/page.tsx`)
- Hero: "Sell with Confidence" label, "List Your Home with Tauro" H1
- Value proposition: 4 cards (Expert Pricing, Market Analysis, Premium Marketing, Dedicated Agent) with Lucide icons in gold circles
- Form section in `bg-midnight` with "Request Your Free Home Valuation" heading
- Process section: "How It Works" with 3 numbered steps and gold badges
- Metadata via layout.tsx: title "Sell Your Home", SEO description

### API route verification (`src/app/api/leads/route.ts`)
- Handles all three lead types: contact, showing, seller
- `LeadPayload` includes seller fields: homeAddress, beds, baths, sqft, timeline, reason
- `buildGhlContact` maps seller fields to GHL custom fields
- Validates required fields, email format → returns 422 on failure
- Forwards to `GHL_WEBHOOK_URL` env var when configured
- Gracefully degrades (returns success) when GHL not configured
- Returns 502 for GHL failures, 500 for unexpected errors

## Verification

- `npx tsc --noEmit` passes
- `npm run build` succeeds
- /sell page renders with hero, value props, form, process steps
- Valid seller submission posts to /api/leads with type "seller"
- API returns 422 on empty body

## Files Created / Modified

- `src/app/(site)/sell/page.tsx` — Seller inquiry page
- `src/app/(site)/sell/layout.tsx` — Metadata
- `src/components/seller-inquiry-form.tsx` — SellerInquiryForm component
- `src/app/api/leads/route.ts` — Verified (no changes needed)
