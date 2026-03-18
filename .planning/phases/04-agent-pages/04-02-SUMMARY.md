---
phase: 04-agent-pages
plan: 02
subsystem: frontend-pages
tags: [agents, team-page, grid, nextjs, tailwind]
dependency-graph:
  requires: ["04-01"]
  provides: ["AgentCard component", "/agents team page"]
  affects: ["04-03", "04-04"]
tech-stack:
  added: []
  patterns: ["server-component page with client card", "responsive grid layout"]
key-files:
  created:
    - src/components/AgentCard.tsx
    - src/app/(site)/agents/page.tsx
  modified: []
decisions:
  - id: AGENT-CARD-EMAIL-01
    description: "Email on agent card uses onClick with stopPropagation instead of nested <a> to avoid invalid HTML inside Link"
metrics:
  duration: "1m 22s"
  completed: "2026-03-18"
---

# Phase 4 Plan 2: Agent Team Page Summary

**AgentCard component and /agents team page with responsive grid, hero section, and join CTA**

## What Was Built

### AgentCard Component (`src/components/AgentCard.tsx`)
- Client component wrapping a Next.js Link to `/agents/{slug}`
- Portrait photo (3:4 aspect) with hover scale effect
- Agent name (Playfair heading), title (gold, Montserrat label), short bio (line-clamp-2)
- Stats row showing properties sold and total volume with gold-highlighted numbers
- Contact row with phone and clickable email (uses onClick + stopPropagation to avoid nested anchor)
- "View Profile" text with ArrowRight icon, revealed on hover (opacity transition)
- card-tilt 3D hover effect applied via CSS class

### /agents Team Page (`src/app/(site)/agents/page.tsx`)
- Server component with SEO metadata (title + description)
- Hero section: dark background with gradient overlay, gold "Our Team" label, heading, subtitle
- Responsive agent grid: 1 column mobile, 2 columns sm, 4 columns lg
- Join CTA section: rounded card with heading, subtitle, and shimmer-gold "Learn More" button linking to /join

## Decisions Made

| ID | Decision | Rationale |
|----|----------|-----------|
| AGENT-CARD-EMAIL-01 | Email uses onClick with stopPropagation instead of nested `<a>` | Avoids invalid HTML (anchor inside anchor) while still allowing email clicks |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Added missing "use client" directive to AgentCard**
- **Found during:** Task 1 re-verification
- **Issue:** AgentCard uses onClick/onKeyDown handlers and window.location.href which require client-side JavaScript, but was missing "use client" directive
- **Fix:** Added "use client" at top of AgentCard.tsx
- **Commit:** 2e31fce

## Verification

- `npx tsc --noEmit` passes cleanly
- `npx next build` succeeds with `/agents` route listed
- AgentCard renders photo, name, title, bio, stats, contact, and profile link
- 4 agent cards display in responsive grid
- Join CTA links to /join with shimmer-gold effect

## Commits

| Hash | Message |
|------|---------|
| c7e2c2c | feat(04-02): create AgentCard component |
| 2e31fce | feat(04-02): add "use client" directive to AgentCard |
| dc36176 | feat(04-02): create /agents team page with agent grid and join CTA |

## Next Phase Readiness

Ready for 04-03 (individual agent profile pages at `/agents/[slug]`). The AgentCard component links to these profile pages, and the agent data is fully available from `@/data/agents`.
