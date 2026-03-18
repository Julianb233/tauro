# Tauro — Real Estate Brokerage Platform

## Vision
A premium, visually stunning real estate brokerage website for LYL Realty Group (Philadelphia). Inspired by the Mexican superhero Zorro — the name "Tauro" evokes bold, distinctive, premium branding. The site should rival the design quality of Compass, Serhant, and The Agency.

## Problem
LYL Realty Group needs a modern digital presence that showcases their properties, agents, and Philadelphia expertise. They need lead capture flowing into GoHighLevel CRM, property showings scheduling, and area-specific SEO pages.

## Target Users
1. **Home Buyers** — Searching for properties in Philadelphia neighborhoods
2. **Home Sellers** — Looking for a premium brokerage to list with
3. **LYL Agents** — Need professional profile pages and lead routing
4. **LYL Realty (Client)** — Needs proposal page with payment and onboarding

## Requirements

### Validated
(None yet — ship to validate)

### Active
- [ ] Premium homepage with cinematic hero, search overlay, featured properties
- [ ] Property listing pages with grid/map views and advanced filters
- [ ] Individual property detail pages with gallery, map, details, showing CTA
- [ ] Agent/realtor team page and individual profile pages
- [ ] 15 Philadelphia sub-area pages (Center City, Rittenhouse, Fishtown, Northern Liberties, Old City, South Philly, University City, Manayunk, Chestnut Hill, Mt Airy, Germantown, West Philly, Kensington, Brewerytown, Point Breeze)
- [ ] Proposal & payment page for LYL client onboarding
- [ ] Contact forms and showing scheduler → GoHighLevel CRM
- [ ] NanoBanana Pro logo generation ("Tauro" / Zorro-inspired)
- [ ] SEO optimization for Philadelphia real estate keywords
- [ ] Vercel deployment

### Out of Scope
- IDX/MLS live feed integration (Phase 2 — MVP uses curated listings)
- User authentication / saved searches (Phase 2)
- Blog / content marketing (Phase 2)

## Tech Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Mapbox GL JS for maps
- Vercel hosting
- GoHighLevel CRM integration
- NanoBanana Pro for logo

## Brand Direction
- **Name:** Tauro (inspired by Zorro — bold, premium, distinctive)
- **Colors:** Deep midnight #1A1A2E, Bold red #E94560, Gold #C9A96E, Near-black #0F0F1A
- **Typography:** Playfair Display (headings), Inter (body)
- **Mood:** Cinematic, luxurious, bold, authoritative

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 15 App Router | SSG for area pages, SSR for listings, great SEO | Pending |
| Mapbox over Google Maps | Better design customization, dark theme support | Pending |
| Static listings for MVP | Faster ship, validate design before MLS integration | Pending |
| Tailwind + shadcn/ui | Rapid premium UI, consistent design tokens | Pending |
| Philadelphia focus | Client is Philly-based brokerage | Confirmed |

---
*Last updated: 2026-03-18 after initialization*
