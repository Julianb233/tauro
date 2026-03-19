---
phase: 03-property-pages
plan: 05
subsystem: filters
tags: [property-filters, neighborhoods, philadelphia, area-filter]
dependency-graph:
  requires: [03-04]
  provides: [working-area-filter, neighborhood-filtering]
  affects: []
tech-stack:
  added: []
  patterns: [dynamic-filter-options]
key-files:
  created: []
  modified: [src/components/PropertyFilters.tsx, src/app/properties/page.tsx]
decisions: []
metrics:
  duration: "~1m"
  completed: "2026-03-18"
---

# Phase 3 Plan 5: Fix Area Filter Summary

**One-liner:** Area filter now shows 15 Philadelphia neighborhoods dynamically and correctly filters properties by neighborhood field

## What Was Done

### Task 1: Update PropertyFilters area dropdown with Philly neighborhoods
- Imported `neighborhoods` from `@/data/neighborhoods`
- Replaced hardcoded San Diego options (Mission Beach, La Jolla, San Diego, Carlsbad) with dynamically generated options from neighborhoods array
- All 15 Philadelphia neighborhoods now appear in the dropdown

### Task 2: Fix area filter logic to use neighborhood field
- Changed filter logic from `p.city === filters.area` to `p.neighborhood === filters.area`
- URL params like `?area=Fishtown` now correctly filter to Fishtown properties only

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- TypeScript compilation: PASSED
- npm run build: PASSED
- No San Diego references in PropertyFilters.tsx: CONFIRMED
- Area filter options match neighborhood.propertyFilter values: CONFIRMED
- Filter logic uses p.neighborhood: CONFIRMED
