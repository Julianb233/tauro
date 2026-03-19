---
phase: 08-proposal-payment
plan: 01
subsystem: proposal
tags: [proposal, payment, onboarding]
status: COMPLETED
key-files:
  created:
    - src/components/proposal-scope.tsx
    - src/components/onboarding-steps.tsx
  modified:
    - src/app/proposal/page.tsx
    - src/app/proposal/layout.tsx
metrics:
  completed: "2026-03-18"
---
# Phase 8 Plan 01: Client Proposal and Payment Page

**Status: COMPLETED**

## What was done

### Task 1: Extract ProposalScope and OnboardingSteps components
- Created `src/components/proposal-scope.tsx` with `ProposalScope` named export
  - Contains ScopeCard sub-component with useState for expand/collapse
  - Includes all 4 scope pillars: Custom Website, GoHighLevel CRM, Marketing Engine, Automations
  - Each pillar has expandable deliverables list with checkmarks and gold accents
- Created `src/components/onboarding-steps.tsx` with `OnboardingSteps` named export
  - Server component (no client interactivity needed)
  - Renders 5 numbered onboarding steps with gold circle numbers

### Task 2: Refactor proposal page to use extracted components
- Updated `src/app/proposal/page.tsx` to import and render `<ProposalScope />` and `<OnboardingSteps />`
- Removed inline scope/onboarding data and rendering
- Kept all other sections inline: hero, stats bar, timeline, investment, after launch, final CTA, footer
- All 4 payment CTAs link to `https://www.fanbasis.com/agency-checkout/Aiacrobatics/TAURO`
- Updated `src/app/proposal/layout.tsx` metadata title to "Proposal | Tauro"

## Requirements verified
- PROPOSAL-01: Build scope with 4 pillars and 4-week timeline displayed
- PROPOSAL-02: FanBasis payment link accessible from 4 CTAs (nav, hero, investment, final)
- PROPOSAL-03: 5 post-payment onboarding steps clearly presented
- Components extracted for cleanliness (ProposalScope, OnboardingSteps)
- `npx tsc --noEmit` passes clean
