# Roadmap: Tauro

## Overview

Build a premium real estate brokerage website for LYL Realty Group (Philadelphia). Starting from the Next.js scaffold, we'll layer in the Tauro brand system, then build pages from the inside out — foundation and design tokens first, then core pages (homepage, properties, agents), then area pages and lead capture, and finally SEO optimization and deployment.

## Phases

- [x] **Phase 1: Design System & Layout Shell** - Brand tokens, typography, nav, footer, page shell
- [ ] **Phase 2: Homepage** - Cinematic hero, featured properties, neighborhoods preview, CTAs
- [ ] **Phase 3: Property Pages** - Listings grid/map, detail pages, gallery, static data
- [ ] **Phase 4: Agent Pages** - Team grid, individual profiles, contact forms
- [ ] **Phase 5: Philadelphia Area Pages** - 15 neighborhood pages with SEO, maps, local listings
- [ ] **Phase 6: Contact & Lead Capture** - Contact page, showing scheduler, GoHighLevel CRM integration
- [ ] **Phase 7: Resource & Education Pages** - Buyer/seller guides, market insights, FAQ, home valuation, agent opportunity
- [ ] **Phase 8: Proposal & Payment** - Client proposal page, Stripe/GHL payment, onboarding flow
- [ ] **Phase 9: SEO, Performance & Deploy** - Structured data, meta tags, Core Web Vitals, Vercel deploy

## Phase Details

### Phase 1: Design System & Layout Shell
**Goal**: Establish the Tauro visual identity and site-wide layout — every subsequent page builds on this foundation
**Depends on**: Nothing (first phase)
**Requirements**: BRAND-01, BRAND-02, BRAND-03, BRAND-04, NAV-01, NAV-02, NAV-03, NAV-04
**Success Criteria** (what must be TRUE):
  1. Site renders in dark mode with correct brand colors, typography, and spacing
  2. Header is fixed, shows navigation items, transitions to transparent on scroll
  3. Mobile nav opens a full-screen overlay menu
  4. Footer displays across all pages with links, contact info, and social icons
  5. Gold shimmer hover and 3D card tilt micro-interactions work on interactive elements
**Research**: Likely — Playfair Display + DM Sans font loading strategy, shadcn/ui dark theme customization
**Plans**: TBD

### Phase 2: Homepage
**Goal**: A cinematic, conversion-focused homepage that establishes Tauro as a premium Philadelphia brokerage
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06
**Success Criteria** (what must be TRUE):
  1. Hero section fills viewport with video/image, gradient overlay, and functional search bar
  2. Featured properties display in a carousel/grid with real property card components
  3. Philadelphia neighborhoods section shows clickable neighborhood cards
  4. "Why Tauro" brand section and testimonials render with proper design treatment
  5. Buyer and seller CTAs are prominent and link to relevant pages
**Research**: Unlikely — standard Next.js component work
**Plans**: TBD

### Phase 3: Property Pages
**Goal**: Complete property browsing experience — grid, map, filters, and rich detail pages
**Depends on**: Phase 1
**Requirements**: PROP-01, PROP-02, PROP-03, PROP-04, PROP-05, PROP-06, PROP-07, PROP-08, PROP-09
**Success Criteria** (what must be TRUE):
  1. Property listings display in responsive grid with cards showing image, price, beds/baths/sqft, address
  2. Map view shows property markers on Mapbox with dark-themed styling
  3. Filters for price, beds, baths, sqft, area, and property type work correctly
  4. Property detail page shows full image gallery with lightbox, all details, and neighborhood map
  5. "Schedule Showing" and "Contact Agent" CTAs are functional on detail pages
  6. Property detail page supports embedded video tours and 3D walkthrough iframes
**Research**: Likely — Mapbox GL JS integration with Next.js App Router, dark theme map styling
**Plans**: TBD

### Phase 4: Agent Pages
**Goal**: Professional agent showcase that builds trust and routes leads to the right agent
**Depends on**: Phase 1
**Requirements**: AGENT-01, AGENT-02, AGENT-03, AGENT-04, AGENT-05, AGENT-06
**Success Criteria** (what must be TRUE):
  1. Team page shows grid of agent cards with photo, name, title, and contact link
  2. Individual agent profile shows bio, stats, active listings, sold history, awards, and video intro
  3. Agent contact form captures lead info (name, email, phone, message)
  4. "Join Our Team" page allows prospective realtors to apply with license info and experience
**Research**: Unlikely
**Plans**: TBD

### Phase 5: Philadelphia Area Pages
**Goal**: 15 SEO-optimized neighborhood pages that position Tauro as the Philly expert
**Depends on**: Phase 2, Phase 3
**Requirements**: AREA-01, AREA-02, AREA-03
**Success Criteria** (what must be TRUE):
  1. All 15 neighborhood pages render with unique content, photos, and local context
  2. Each area page shows neighborhood description, selling points, lifestyle section, and map
  3. Area pages display filtered property listings for that neighborhood
  4. Title tags follow pattern "[Neighborhood] Homes for Sale | Tauro"
**Research**: Likely — static generation strategy for 15 pages, neighborhood data structure
**Plans**: TBD

### Phase 6: Contact & Lead Capture
**Goal**: All lead capture forms work end-to-end, flowing into GoHighLevel CRM
**Depends on**: Phase 3, Phase 4
**Requirements**: LEAD-01, LEAD-02, LEAD-03, LEAD-04, LEAD-05, LEAD-06
**Success Criteria** (what must be TRUE):
  1. Contact page has a functional lead capture form with validation
  2. Schedule showing / book a tour form collects visitor info + date/time preferences
  3. Standalone "Book a Tour" page with property selector and agent matching
  4. "List Your Home with Tauro" seller inquiry page with home valuation request
  5. Form submissions reach GoHighLevel CRM via webhook/API
  6. Phone number and email are displayed in header and footer
**Research**: Likely — GoHighLevel API/webhook integration patterns
**Plans**: TBD

### Phase 7: Resource & Education Pages
**Goal**: SEO-rich educational content pages that establish Tauro as a knowledge authority and capture organic traffic from buyers, sellers, and aspiring agents
**Depends on**: Phase 1
**Requirements**: EDU-01, EDU-02, EDU-03, EDU-04, EDU-05, EDU-06
**Success Criteria** (what must be TRUE):
  1. Buyer's Guide page walks through the full home buying process with clear, professional content
  2. Seller's Guide page explains the selling process and Tauro's value proposition
  3. Market Insights page shows Philadelphia real estate stats and trends by neighborhood
  4. "Why Join Tauro" opportunity page presents the agent value proposition with application CTA
  5. FAQ page answers common buyer/seller questions
  6. "What's My Home Worth" page captures seller leads with address input form
**Research**: Unlikely — content pages with forms
**Plans**: TBD

### Phase 8: Proposal & Payment
**Goal**: LYL client can view scope, pay, and begin onboarding via a dedicated proposal page
**Depends on**: Phase 1
**Requirements**: PROPOSAL-01, PROPOSAL-02, PROPOSAL-03
**Success Criteria** (what must be TRUE):
  1. Proposal page displays build scope, deliverables, and timeline
  2. Payment link (Stripe or GHL) is functional and accepts payment
  3. Post-payment onboarding steps are clearly presented
**Research**: Likely — Stripe payment link integration or GHL payment embedding
**Plans**: TBD

### Phase 9: SEO, Performance & Deploy
**Goal**: Production-ready site with optimized SEO, fast load times, and Vercel deployment
**Depends on**: All previous phases
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, DEPLOY-01, DEPLOY-02
**Success Criteria** (what must be TRUE):
  1. Every page has unique title tag and meta description
  2. Property pages include JSON-LD RealEstateListing structured data
  3. Area and property pages are statically generated (SSG)
  4. LCP < 2.5s and CLS < 0.1 on key pages
  5. Site is live on Vercel with production domain configured
  6. Preview deployments work for dev branches
**Research**: Unlikely — standard Next.js SSG + Vercel deployment
**Plans**: TBD

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design System & Layout Shell | 4/4 | Complete | 2026-03-18 |
| 2. Homepage | 0/TBD | Not started | - |
| 3. Property Pages | 0/TBD | Not started | - |
| 4. Agent Pages | 0/TBD | Not started | - |
| 5. Philadelphia Area Pages | 0/TBD | Not started | - |
| 6. Contact & Lead Capture | 0/TBD | Not started | - |
| 7. Resource & Education Pages | 0/TBD | Not started | - |
| 8. Proposal & Payment | 0/TBD | Not started | - |
| 9. SEO, Performance & Deploy | 0/TBD | Not started | - |
