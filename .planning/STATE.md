# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-03-18)

**Core value:** Premium Philadelphia real estate brokerage website rivaling Compass, Serhant, and The Agency
**Current focus:** Phase 10 — Database & Supabase (backend infrastructure)

## Current Position

Phase: 10 of 13 (Database & Supabase)
Plan: 06 of 07 (schema and seed gap fixes)
Status: In progress
Last activity: 2026-03-23 — Completed 10-06: migration renumbering, video_intro_id column, storage policies migration, database.ts type sync, seed open-house field mappings

Progress: █████████████████░░░░░ 69% (9/13 phases)

### Milestone: v1 Frontend — COMPLETE
Phases 1-9 shipped and deployed to https://tauro-henna.vercel.app

### Milestone: v2 Backend — IN PROGRESS
Phases 10-13: database, auth portal, email, GHL sync, production hardening

## Performance Metrics

**Velocity:**
- Total plans completed: 21
- Average duration: ~2m 15s
- Total execution time: ~0.7 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1 | 4/4 | 10m 39s | 2m 40s |
| 2 | 1/? | 2m 17s | 2m 17s |
| 3 | 3/3 | 6m 46s | 2m 15s |
| 4 | 5/5 | 8m 40s | 1m 44s |
| 5 | 2/2 | 6m 19s | 3m 10s |
| 7 | 4/4 | 10m 54s | 2m 44s |
| 9 | 4/4 | ~7m | ~1m 45s |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- BRAND-COLORS-01: Use neutral blacks (#1A1A1A, #111111) not blue-tinted
- BRAND-COLORS-02: Oxblood #8B0000 replaces bold-red #E94560
- TYPOGRAPHY-01: DM Sans body + Montserrat labels + Playfair headings
- FOOTER-01: Social icons in bottom bar with GoldShimmer hover effect
- FOOTER-02: Map placeholder links to Google Maps with Philadelphia query
- FOOTER-03: Quick links simplified to match nav (Properties, Agents, Sell, About, Contact)
- NAV-HOOK-01: Extract scroll detection into reusable useScrolled hook
- NAV-SHIMMER-01: Replace GoldShimmer wrapper with shimmer-gold CSS class on CTA
- NAV-COLOR-01: Use bg-near-black/95 for scrolled header state
- SEARCH-01: Extract HeroSearchBar as client component to keep page.tsx as server component
- IMAGE-01: Add Unsplash remote patterns to next.config.ts for Next.js Image optimization
- AGENT-CARD-EMAIL-01: Email uses onClick with stopPropagation instead of nested anchor
- NEIGHBORHOOD-DATA-01: Used neighborhood name as propertyFilter value since current properties are placeholder San Diego data
- PROPERTY-DATA-01: Expanded to 16 curated Philadelphia properties with neighborhood field matching neighborhoods.ts propertyFilter values
- SEO-TITLE-TEMPLATE-01: Page titles use short form (e.g. "Contact Us") since root layout template appends "| Tauro" automatically
- AGENT-SERVER-CLIENT-01: agents/[slug] split into server page.tsx (metadata/SSG) + AgentProfileClient.tsx (interactivity)
- JSONLD-01: Consolidated PropertyJsonLd into JsonLd.tsx with named exports (OrganizationJsonLd, RealEstateListingJsonLd)
- OPENGRAPH-01: metadataBase set to https://tauro.com for absolute URL resolution
- HOMEPAGE-REFACTOR-01: Homepage decomposed into 7 section components with separated data files
- AGENTS-ADD-AUTH-01: /api/agents/add uses UPLOAD_API_KEY (x-api-key header) for auth — same key as /api/upload
- AGENTS-ADD-STORAGE-01: Agent photos upload to Supabase Storage (agent-photos bucket) not filesystem
- MIGRATION-NUMBERING-01: Sequential 001-009 numbering with no gaps or collisions
- STORAGE-POLICIES-01: storage-policies.sql promoted to 009_storage_policies.sql migration
- AGENT-VIDEO-ID-01: video_intro_id stored separately from video_intro_url for embed URL construction

### Roadmap Evolution

- Phases 10-13 added: Backend infrastructure (database, auth, email, production hardening)
- Supabase chosen for database + auth + storage (all-in-one)
- Resend chosen for transactional email
- GHL two-way sync scoped for Phase 13

### Pending Todos

- FanBasis payment link needs to be swapped into proposal (Product ID: qI1D7)
- Mapbox production API token needed
- Custom domain configuration on Vercel
- GHL webhook URL from LYL's GoHighLevel account

### Blockers/Concerns

- GHL webhook URL required from client before Phase 13 can complete
- Custom domain requires DNS access from client

## Session Continuity

Last session: 2026-03-23
Stopped at: Completed 10-06-PLAN — schema/seed gap fixes (migration renumbering, video_intro_id, storage policies, type sync)
Resume file: None
