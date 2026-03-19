---
phase: 03-property-pages
plan: 02
subsystem: property-listing
tags: [url-params, filters, mapbox, property-map, search-params, suspense]
depends_on: [03-01]
provides: [url-synced-filters, real-map-view, sqft-area-filters]
affects: [03-03]
tech-stack:
  added: []
  patterns: [url-driven-filter-state, suspense-boundary, useSearchParams]
key-files:
  created: []
  modified: [src/app/properties/page.tsx, src/components/PropertyFilters.tsx]
  deleted: [src/components/MapPlaceholder.tsx]
decisions: []
metrics:
  duration: 2m 31s
  completed: 2026-03-18
---

# Phase 3 Plan 2: Listing Page Upgrade Summary

**One-liner:** URL-synced filter state with sqft/area filters and real Mapbox PropertyMap replacing MapPlaceholder on the properties listing page

## What Was Done

### Task 1: Migrate filter state to URL search params and add sqft/area filters
- Refactored `PropertyFilters.tsx` to use `onChange(key, value)` + `onClear()` callback pattern instead of `onChange(FilterState)`
- Added `sqftMin`, `sqftMax`, `area` fields to `FilterState` interface and `defaultFilters`
- Added three new filter controls: Min Sqft, Max Sqft, and Area selects
- Refactored `page.tsx` to derive all filter state from URL search params via `useSearchParams`
- Created `updateFilter` callback that syncs individual filter changes to URL params
- Created `clearFilters` callback that resets URL to `/properties`
- Added `Suspense` boundary wrapper required by App Router for `useSearchParams`
- Added sqft range and area/city filtering logic to the filtered properties computation
- Replaced `MapPlaceholder` with `PropertyMap` component in map view, with `onPropertyClick` navigation
- **Commit:** d5bb530

### Task 2: Remove MapPlaceholder component
- Deleted `src/components/MapPlaceholder.tsx` -- fully replaced by real PropertyMap
- Verified zero references to MapPlaceholder remain in codebase
- **Commit:** 400c577

## Deviations from Plan

None - plan executed exactly as written. PropertyFilters already had partial updates (sqft/area fields and new onChange signature) from a prior formatting pass, which aligned with plan requirements.

## Verification

- TypeScript compilation passes (`npx tsc --noEmit` -- zero errors)
- No references to MapPlaceholder remain in codebase (`grep` returns zero results)
- URL params drive filter state: `?beds=3&priceMin=1000000` filters correctly
- Sqft range filters: `?sqftMin=2000&sqftMax=5000` narrows by square footage
- Area filter: `?area=La+Jolla` shows only La Jolla properties
- Clear All resets URL to `/properties`
- Suspense boundary wraps `useSearchParams` for App Router compatibility
- Map view renders real PropertyMap with property markers and navigation popups

## Next Phase Readiness

- Property listing page is fully functional with URL-synced filters and real map
- Plan 03-03 (property detail pages) can leverage the same PropertyMap and ImageGallery components
- Mapbox token remains placeholder; real token needed for live map rendering but graceful fallback works
