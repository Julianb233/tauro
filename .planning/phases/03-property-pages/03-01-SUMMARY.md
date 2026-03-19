---
phase: 03-property-pages
plan: 01
subsystem: property-components
tags: [mapbox, react-map-gl, lightbox, gallery, map, components]
depends_on: []
provides: [PropertyMap-component, ImageGallery-component, mapbox-env-setup]
affects: [03-02, 03-03]
tech-stack:
  added: [react-map-gl@8.1.0, mapbox-gl@3.20.0, yet-another-react-lightbox@3.29.1, "@types/mapbox-gl@3.4.1"]
  patterns: [declarative-map-markers, lightbox-plugin-architecture]
key-files:
  created: [src/components/PropertyMap.tsx, src/components/ImageGallery.tsx, .env.example]
  modified: [package.json, package-lock.json]
decisions: []
metrics:
  duration: 1m 34s
  completed: 2026-03-18
---

# Phase 3 Plan 1: Map & Gallery Components Summary

**One-liner:** Dark-themed Mapbox map with gold price markers via react-map-gl and full-featured lightbox gallery with zoom/fullscreen/thumbnails via yet-another-react-lightbox

## What Was Done

### Task 1: Install dependencies and configure env
- Installed react-map-gl@8.1.0, mapbox-gl@3.20.0, yet-another-react-lightbox@3.29.1, @types/mapbox-gl@3.4.1
- Created `.env.example` with `NEXT_PUBLIC_MAPBOX_TOKEN` documentation
- Created `.env.local` with placeholder token (gitignored)
- **Commit:** d885262

### Task 2: Create PropertyMap and ImageGallery components
- **PropertyMap.tsx:** Client component using react-map-gl/mapbox declarative API
  - Dark-v11 map style, NavigationControl, gold price markers
  - Popup with mini property card (address, price, beds/baths/sqft, View Details button)
  - `singleMarker` mode for property detail pages (no popup)
  - Graceful fallback when Mapbox token is missing/placeholder
  - Props: properties, onPropertyClick, center, zoom, singleMarker
- **ImageGallery.tsx:** Client component with yet-another-react-lightbox
  - Hero image (16:9 / 21:9 on large screens, max 500px height)
  - Thumbnail row with up to 4 thumbnails and "+N more" overlay
  - Lightbox with Counter, Fullscreen, Thumbnails, Zoom plugins
  - Graceful fallback for empty image arrays
- **Commit:** e9f7155

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- All 4 npm packages installed and verified via `npm ls`
- TypeScript compilation passes (`npx tsc --noEmit`)
- Full Next.js build succeeds
- `.env.example` documents `NEXT_PUBLIC_MAPBOX_TOKEN`

## Next Phase Readiness

Both components are ready for integration:
- **Plan 03-02:** Can import PropertyMap for the property listings page map view
- **Plan 03-03:** Can import both PropertyMap (single marker) and ImageGallery for property detail pages
- Mapbox token is placeholder; real token needed for live map rendering but components handle this gracefully
