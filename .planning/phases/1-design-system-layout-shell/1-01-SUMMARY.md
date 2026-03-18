---
phase: 1-design-system-layout-shell
plan: 01
subsystem: design-tokens
tags: [brand-colors, typography, css-variables, tailwind, fonts]

dependency-graph:
  requires: []
  provides:
    - "Brand color tokens (midnight, gold, oxblood, off-white)"
    - "Typography system (DM Sans body, Montserrat labels, Playfair headings)"
    - "Dark mode CSS variables with correct brand values"
  affects:
    - "1-02 (layout shell uses brand tokens)"
    - "1-03 (components use brand tokens)"
    - "All subsequent phases depend on correct design tokens"

tech-stack:
  added:
    - "DM Sans (Google Font via next/font)"
    - "Montserrat (Google Font via next/font)"
  removed:
    - "Inter (Google Font)"
  patterns:
    - "CSS custom properties for design tokens"
    - "next/font/google for font loading with CSS variable injection"

key-files:
  created: []
  modified:
    - src/app/globals.css
    - src/app/layout.tsx

decisions:
  - id: "BRAND-COLORS-01"
    decision: "Use neutral blacks (#1A1A1A, #111111) instead of blue-tinted (#1A1A2E, #0F0F1A)"
    reason: "Brand spec requires pure neutral tones for premium feel"
  - id: "BRAND-COLORS-02"
    decision: "Replace bold-red #E94560 with oxblood #8B0000 for destructive/accent red"
    reason: "Oxblood is the Tauro brand red per brand spec"
  - id: "TYPOGRAPHY-01"
    decision: "DM Sans for body, Montserrat for labels/CTAs, Playfair Display for headings"
    reason: "Three-font system matching brand spec for premium real estate aesthetic"

metrics:
  duration: "1m 39s"
  completed: "2026-03-18"
  tasks: 2
  commits: 2
---

# Phase 1 Plan 01: Brand Tokens & Typography Summary

**Corrected all brand color tokens and typography to match Tauro brand spec, replacing blue-tinted neutrals with pure blacks and adding oxblood/off-white palette with DM Sans + Montserrat font system.**

## Tasks Completed

| Task | Name | Commit | Files Modified |
|------|------|--------|----------------|
| 1 | Fix brand color tokens in globals.css | 834ca7b | src/app/globals.css |
| 2 | Replace Inter with DM Sans and add Montserrat | 06ee0d8 | src/app/layout.tsx |

## What Changed

### Brand Colors (globals.css)

**@theme inline block:**
- `--color-midnight`: #1A1A2E -> #1A1A1A (neutral, not blue-tinted)
- `--color-gold`: #C9A96E -> #C9A84C (warmer, more saturated)
- `--color-gold-light`: #D4BC8A -> #D4B96A
- `--color-gold-dark`: #B08E4A -> #A8893D
- `--color-near-black`: #0F0F1A -> #111111 (neutral)
- Added `--color-oxblood`: #8B0000 (new brand red)
- Added `--color-off-white`: #F5F0E8 (warm off-white)
- Removed `--color-bold-red`: #E94560

**Light mode (:root):** Updated primary, secondary, muted, accent, destructive, foreground, ring to use new brand values.

**Dark mode (.dark):** Updated all variables including background (#111111), card (#1A1A1A), border (#2A2A2A neutral), and all foreground/accent values.

### Typography (layout.tsx)

- Removed Inter font import and config
- Added DM Sans as `--font-dm-sans` (body text default)
- Added Montserrat as `--font-montserrat` with weights 500/600/700 (labels, CTAs)
- Updated `--font-sans` CSS variable to reference DM Sans
- Added `--font-label` CSS variable for Montserrat

## Deviations from Plan

None -- plan executed exactly as written.

## Verification Results

- Zero references to old hex values (#1A1A2E, #C9A96E, #F5F3F0, #E94560): PASS
- All four brand colors present (midnight, gold, oxblood, off-white): PASS
- DM_Sans imported and configured: PASS
- Montserrat imported and configured: PASS
- Inter fully removed: PASS
- `npx next build` succeeds: PASS

## Next Phase Readiness

Design tokens are now correct and stable. All subsequent plans in Phase 1 (layout shell, component styling) can proceed using the correct brand colors and typography variables.
