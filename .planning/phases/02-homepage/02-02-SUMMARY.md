---
phase: 02-homepage
plan: 02
subsystem: homepage
tags: [search, tilt-card, image-optimization, routing, micro-interactions]
dependency-graph:
  requires: ["01-01", "01-02", "01-03", "02-01"]
  provides: ["functional-search-bar", "tiltcard-integration", "correct-link-targets", "optimized-images"]
  affects: ["03-properties", "05-areas", "06-seller", "07-seller-guide"]
tech-stack:
  added: []
  patterns: ["client-component-extraction", "next-image-optimization", "server-client-boundary"]
key-files:
  created:
    - src/components/HeroSearchBar.tsx
  modified:
    - src/app/(site)/page.tsx
    - next.config.ts
decisions:
  - id: SEARCH-01
    summary: "Extract HeroSearchBar as client component to keep page.tsx as server component"
  - id: IMAGE-01
    summary: "Add Unsplash remote patterns to next.config.ts for Next.js Image optimization"
metrics:
  duration: "2m 17s"
  completed: "2026-03-18"
---

# Phase 02 Plan 02: Homepage Refinements Summary

**Functional search navigation, TiltCard micro-interactions, Next.js Image optimization, and corrected downstream routing links.**

## What Was Done

### Task 1: Make search bar functional and fix hero image
- Created `HeroSearchBar` client component (`src/components/HeroSearchBar.tsx`)
  - Uses `useState` for query and `useRouter` for navigation
  - On submit: navigates to `/properties?q={query}` (or `/properties` if empty)
  - Preserves exact visual styling from original inline search bar
- Replaced hero `<img>` with Next.js `<Image>` component with `fill`, `priority`, and `sizes="100vw"` for LCP optimization
- Added `images.remotePatterns` for `images.unsplash.com` in `next.config.ts`
- **Commit:** `addbe4b`

### Task 2: Integrate TiltCard micro-interactions and fix link targets
- Wrapped featured `PropertyCard` components in `<TiltCard>` for 3D mouse-tracking hover effect
- Replaced CSS-only `card-tilt` class on Why Tauro cards with `<TiltCard maxTilt={6}>` React component
- Changed neighborhood links from `/neighborhoods/{slug}` to `/areas/{slug}` to match Phase 5 routing
- Changed seller CTA link from `/contact` to `/sell` and added `shimmer-gold` class
- Converted all remaining `<img>` tags to Next.js `<Image>` (neighborhoods, buyer CTA, seller CTA) with appropriate `sizes` props
- **Commit:** `f1a735e`

## Decisions Made

| ID | Decision | Rationale |
|----|----------|-----------|
| SEARCH-01 | Extract HeroSearchBar as separate client component | Keeps page.tsx as server component, cleaner architecture |
| IMAGE-01 | Add Unsplash remote patterns to next.config.ts | Required for Next.js Image component to load external images |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added Unsplash remote image patterns to next.config.ts**
- **Found during:** Task 1
- **Issue:** Next.js `<Image>` requires remote patterns configured for external image domains
- **Fix:** Added `images.remotePatterns` with `images.unsplash.com` to `next.config.ts`
- **Files modified:** `next.config.ts`
- **Commit:** `addbe4b`

## Verification Results

| Check | Result |
|-------|--------|
| `npx next build` | Passes cleanly |
| `/neighborhoods/` in page.tsx | 0 occurrences (all changed to /areas/) |
| `href="/contact"` in CTA section | 0 occurrences (changed to /sell) |
| `TiltCard` in page.tsx | 5 occurrences (import + usages) |
| `<img` in page.tsx | 0 occurrences (all converted to Image) |
| `next/image` import | Present |
| HeroSearchBar.tsx | Exists with "use client" and router.push |

## Next Phase Readiness

- Search bar navigates to `/properties?q={query}` -- Phase 3 (Properties) will need to read this query param
- Neighborhood links point to `/areas/{slug}` -- Phase 5 (Areas) route convention is set
- Seller CTA links to `/sell` -- Phase 6/7 seller pages will match
- All images optimized with Next.js Image component
