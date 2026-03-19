# Roadmap: Tauro

## Overview

Build a premium real estate brokerage website for LYL Realty Group (Philadelphia). Starting from the Next.js scaffold, we'll layer in the Tauro brand system, then build pages from the inside out — foundation and design tokens first, then core pages (homepage, properties, agents), then area pages and lead capture, and finally SEO optimization and deployment.

## Phases

- [x] **Phase 1: Design System & Layout Shell** - Brand tokens, typography, nav, footer, page shell
- [x] **Phase 2: Homepage** - Cinematic hero, featured properties, neighborhoods preview, CTAs
- [x] **Phase 3: Property Pages** - Listings grid/map, detail pages, gallery, static data
- [x] **Phase 4: Agent Pages** - Team grid, individual profiles, contact forms
- [x] **Phase 5: Philadelphia Area Pages** - 15 neighborhood pages with SEO, maps, local listings
- [x] **Phase 6: Contact & Lead Capture** - Contact page, showing scheduler, GoHighLevel CRM integration
- [x] **Phase 7: Resource & Education Pages** - Buyer/seller guides, market insights, FAQ, home valuation, agent opportunity
- [x] **Phase 8: Proposal & Payment** - Client proposal page, Stripe/GHL payment, onboarding flow
- [x] **Phase 9: SEO, Performance & Deploy** - Structured data, meta tags, Core Web Vitals, Vercel deploy
- [ ] **Phase 10: Database & Supabase** - PostgreSQL via Supabase, migrate static data, image storage, property/agent CRUD API
- [ ] **Phase 11: Auth & Agent Portal** - Supabase Auth, agent dashboard, lead inbox, property manager, tour calendar
- [ ] **Phase 12: Email & Notifications** - Resend integration, lead alerts, confirmation emails, agent notifications
- [ ] **Phase 13: GHL Sync & Production Hardening** - Two-way GoHighLevel sync, rate limiting, CAPTCHA, Mapbox token, analytics, error tracking

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

### Phase 10: Database & Supabase
**Goal**: Replace all static data with a real database so LYL can manage their own properties, agents, and content without code deploys
**Depends on**: Phase 9
**Requirements**: DB-01, DB-02, DB-03, DB-04, DB-05, DB-06
**Success Criteria** (what must be TRUE):
  1. Supabase project created with PostgreSQL database and proper schema (properties, agents, neighborhoods, leads, testimonials)
  2. All static data from src/data/*.ts migrated to database with seed script
  3. Supabase Storage bucket configured for property images and agent photos (replaces Unsplash placeholders)
  4. API routes exist for property CRUD (create, read, update, delete) with proper validation
  5. API routes exist for agent CRUD
  6. Frontend pages fetch from database instead of static imports (properties, agents, neighborhoods)
  7. Lead submissions persist to database as fallback (not just GHL webhook)
**Research**: Likely — Supabase + Next.js App Router integration patterns, Row Level Security policies
**Plans**: TBD

### Phase 11: Auth & Agent Portal
**Goal**: Authenticated agent dashboard where LYL staff can manage leads, properties, agents, and view analytics — the operational backend
**Depends on**: Phase 10
**Requirements**: AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06, AUTH-07
**Success Criteria** (what must be TRUE):
  1. Supabase Auth configured with email/password login for agents and admin
  2. Role-based access: admin (full CRUD), agent (own leads + own profile), viewer (read-only)
  3. Protected /dashboard route with auth guard middleware
  4. Lead Inbox page: view all leads, filter by type/status/agent, assign leads to agents, update lead status (new → contacted → qualified → closed)
  5. Property Manager page: add/edit/delete listings, upload photos, set status (active/pending/sold), bulk operations
  6. Agent Manager page (admin only): add/edit agents, view agent performance, manage roles
  7. Tour Calendar page: view booked showings by date, agent, and property with day/week/month views
  8. Dashboard home: lead count this month, active listings, showings scheduled, conversion funnel
**Research**: Likely — Supabase Auth + RLS, Next.js middleware auth guards, dashboard UI patterns
**Plans**: TBD

### Phase 12: Email & Notifications
**Goal**: Every form submission triggers real-time notifications — visitors get confirmation, agents get lead alerts, admins get daily digests
**Depends on**: Phase 10, Phase 11
**Requirements**: EMAIL-01, EMAIL-02, EMAIL-03, EMAIL-04, EMAIL-05
**Success Criteria** (what must be TRUE):
  1. Resend configured with verified sending domain (noreply@tauro.com or similar)
  2. Lead confirmation email sent to visitor immediately on form submit (branded Tauro template)
  3. Agent notification email sent when new lead is assigned or new showing booked
  4. Admin daily digest email: new leads, showings scheduled, form submissions summary
  5. Application confirmation email sent to realtor applicants
  6. All emails use branded HTML templates matching Tauro design (dark mode, gold accents)
**Research**: Likely — Resend API + React Email for templates
**Plans**: TBD

### Phase 13: GHL Sync & Production Hardening
**Goal**: Production-grade integration — GoHighLevel two-way sync, security hardening, real Mapbox maps, analytics, and monitoring
**Depends on**: Phase 10, Phase 11, Phase 12
**Requirements**: GHL-01, GHL-02, GHL-03, SEC-01, SEC-02, SEC-03, PROD-01, PROD-02, PROD-03
**Success Criteria** (what must be TRUE):
  1. GoHighLevel webhook properly configured — all lead types flow into GHL contacts with correct field mapping and tags
  2. GHL → Tauro reverse sync: when lead status changes in GHL, it updates in Tauro database
  3. Rate limiting on /api/leads (10 requests/minute per IP)
  4. CAPTCHA (Turnstile or hCaptcha) on all public forms
  5. Real Mapbox API token configured — maps render with dark theme and property markers
  6. Google Analytics 4 + Vercel Analytics installed and tracking
  7. Sentry error tracking configured for production monitoring
  8. All environment variables documented and production secrets configured
  9. Custom domain configured on Vercel (tauro.com or lylrealty.com)
**Research**: Likely — GHL API v2 integration, Cloudflare Turnstile, Sentry Next.js plugin
**Plans**: TBD

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design System & Layout Shell | 4/4 | Complete | 2026-03-18 |
| 2. Homepage | 1/1 | Complete | 2026-03-18 |
| 3. Property Pages | 1/1 | Complete | 2026-03-18 |
| 4. Agent Pages | 4/4 | Complete | 2026-03-18 |
| 5. Philadelphia Area Pages | 2/2 | Complete | 2026-03-18 |
| 6. Contact & Lead Capture | 1/1 | Complete | 2026-03-18 |
| 7. Resource & Education Pages | 4/4 | Complete | 2026-03-18 |
| 8. Proposal & Payment | 1/1 | Complete | 2026-03-18 |
| 9. SEO, Performance & Deploy | 1/1 | Complete | 2026-03-18 |
| 10. Database & Supabase | 0/TBD | Not started | - |
| 11. Auth & Agent Portal | 0/TBD | Not started | - |
| 12. Email & Notifications | 0/TBD | Not started | - |
| 13. GHL Sync & Production Hardening | 0/TBD | Not started | - |
