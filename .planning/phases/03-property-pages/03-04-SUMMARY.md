---
phase: 03-property-pages
plan: 04
subsystem: map-view
tags: [properties, mapbox, map-view, grid-toggle]
dependency-graph:
  requires: [03-01, 03-02]
  provides: [property-map-view, grid-map-toggle]
  affects: [property-detail-pages]
tech-stack:
  added: [react-map-gl, mapbox-gl]
  patterns: [declarative-map, dark-theme-mapbox]
key-files:
  created: [src/components/PropertyMap.tsx]
  modified: [src/app/properties/page.tsx, package.json, .env.example, .env.local]
decisions:
  - id: MAP-VIEW-01
    summary: "Used react-map-gl/mapbox v8 with dark-v11 Mapbox style for brand-consistent dark map"
metrics:
  duration: "~5m"
  completed: "2026-03-18"
---

# Phase 3 Plan 4: Mapbox Map View Summary

**One-liner:** Interactive dark-themed Mapbox map with gold price markers, popups, and grid/map toggle on properties page

## What Was Done

### Task 1: PropertyMap component with Mapbox GL JS
- Created `src/components/PropertyMap.tsx` as a "use client" component
- Uses `react-map-gl/mapbox` v8 with `mapbox://styles/mapbox/dark-v11` style
- Gold price pill markers (`bg-midnight text-gold`) at each property's coordinates
- Popup cards showing address, city/state, price, beds/baths/sqft, and "View Details" button
- `singleMarker` prop for detail page usage (no popup on click)
- Graceful fallback with branded placeholder (gold MapPin icon) when token is missing or placeholder
- NavigationControl at top-right

### Task 2: Grid/map view toggle on properties page
- Added grid/map toggle buttons in properties page header (LayoutGrid + Map icons from lucide-react)
- Active view highlighted with `bg-gold text-near-black` styling
- Grid view: responsive 3-column card grid (unchanged)
- Map view: 50/50 split layout with map on left, scrollable property cards on right
- Mobile: cards above, map below (CSS order swap)
- Map height: `calc(100vh - 16rem)` fills viewport minus header/filters
- Filters from Plan 02 apply to both grid and map views simultaneously
- "View Details" in popup navigates to `/properties/[slug]`

### Environment Configuration
- `.env.example` documents `NEXT_PUBLIC_MAPBOX_TOKEN`
- `.env.local` has placeholder token for development

## Deviations from Plan

None. Implementation matches the plan specification exactly. Note: properties page is at `src/app/properties/page.tsx` (not `src/app/(site)/properties/page.tsx`) matching the actual project routing structure.

## Decisions Made

| ID | Decision | Rationale |
|----|----------|-----------|
| MAP-VIEW-01 | dark-v11 Mapbox style | Matches brand dark-mode-first aesthetic with midnight/gold color scheme |

## Verification

- `npm run build`: PASSED
- TypeScript compilation: PASSED
- PropertyMap uses react-map-gl/mapbox with dark-v11 style
- Properties page has grid/map toggle in header
- Grid view: responsive card grid
- Map view: dark map with gold markers + scrollable card sidebar
- Popup shows address, price, stats, "View Details" button
- "View Details" navigates to /properties/[slug]
- Filters apply to both views
- Fallback shown when Mapbox token missing
