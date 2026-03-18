# Requirements: Tauro

## v1 Requirements

### Brand & Design System (BRAND)

- **BRAND-01**: Dark-mode-first design system with Tauro brand colors (midnight #1A1A1A, gold #C9A84C, oxblood #8B0000, warm off-white #F5F0E8)
- **BRAND-02**: Typography system — Playfair Display headings, DM Sans body, Montserrat labels/CTAs
- **BRAND-03**: Signature micro-interactions — gold shimmer hover, 3D card tilt, slash/swipe reveals, diagonal wipe transitions
- **BRAND-04**: Logo integration (NanoBanana Pro generated, Zorro/bull-inspired)

### Layout & Navigation (NAV)

- **NAV-01**: Responsive site-wide header with logo, primary navigation (Properties, Agents, Sell, About, Contact)
- **NAV-02**: Fixed header with transparency transition on scroll
- **NAV-03**: Mobile hamburger menu with full-screen overlay
- **NAV-04**: Site-wide footer with links, contact info, social, office map

### Homepage (HOME)

- **HOME-01**: Cinematic full-bleed hero section with video/image background, gradient overlay, and search bar
- **HOME-02**: Featured properties carousel/grid (curated static data)
- **HOME-03**: Philadelphia neighborhoods showcase section
- **HOME-04**: "Why Tauro" brand statement section
- **HOME-05**: Social proof / testimonials section
- **HOME-06**: Call-to-action sections (buyer CTA, seller CTA)

### Property Pages (PROP)

- **PROP-01**: Property listing page with responsive grid view and card components
- **PROP-02**: Property listing page with map view (Mapbox GL JS)
- **PROP-03**: Advanced filters (price, beds, baths, sqft, area, property type)
- **PROP-04**: Individual property detail page with full image gallery/lightbox
- **PROP-05**: Property detail — map, neighborhood info, key details, features list
- **PROP-06**: Property detail — schedule showing CTA and contact agent form
- **PROP-07**: Static property data (curated listings for MVP, no MLS)
- **PROP-08**: Video tour section on property detail pages (embedded video player with cinematic presentation)
- **PROP-09**: Virtual tour / 3D walkthrough embed support on property detail pages

### Agent Pages (AGENT)

- **AGENT-01**: Team page with grid of agent cards (photo, name, title, contact)
- **AGENT-02**: Individual agent profile page (bio, stats, active listings, sold history, contact form)
- **AGENT-03**: Agent contact form with lead routing
- **AGENT-04**: "Join Our Team" / realtor application page with application form (name, license info, experience, resume upload)
- **AGENT-05**: Agent achievements/awards section on profile pages
- **AGENT-06**: Agent video introduction embed on profile pages

### Philadelphia Area Pages (AREA)

- **AREA-01**: 15 Philadelphia neighborhood pages (Center City, Rittenhouse, Fishtown, Northern Liberties, Old City, South Philly, University City, Manayunk, Chestnut Hill, Mt Airy, Germantown, West Philly, Kensington, Brewerytown, Point Breeze)
- **AREA-02**: Each area page includes: neighborhood description, key selling points, lifestyle photos, local listings, map, market stats
- **AREA-03**: Area pages optimized for SEO ("[Neighborhood] Homes for Sale | Tauro")

### Proposal & Payment (PROPOSAL)

- **PROPOSAL-01**: Client-facing proposal page with GHL build scope, deliverables, timeline
- **PROPOSAL-02**: Payment link integration (Stripe or GHL payments)
- **PROPOSAL-03**: Onboarding next steps / post-payment flow

### Contact & Lead Capture (LEAD)

- **LEAD-01**: Contact page with lead capture form
- **LEAD-02**: Schedule showing / book a tour form on property detail pages (date/time picker, visitor info)
- **LEAD-03**: All forms submit to GoHighLevel CRM via API/webhook
- **LEAD-04**: Phone number and email display in header/footer
- **LEAD-05**: "Book a Tour" standalone page with property selector, date/time picker, and agent matching
- **LEAD-06**: Seller inquiry page — "List Your Home with Tauro" with home valuation request form

### Resource & Education Pages (EDU)

- **EDU-01**: Buyer's Guide page — step-by-step home buying process, first-time buyer tips, financing overview, what to expect at closing
- **EDU-02**: Seller's Guide page — home selling process, staging tips, pricing strategy, what Tauro does differently
- **EDU-03**: Market Insights / Philadelphia Real Estate Report page — market stats, trends, price data by neighborhood
- **EDU-04**: "Why Join Tauro" / Agent Opportunity page — commission structure overview, tools/tech provided, training, culture, growth opportunity
- **EDU-05**: FAQ page — common buyer/seller questions, process timelines, financing, Tauro services
- **EDU-06**: Home Valuation / "What's My Home Worth" landing page — address input form, CTA to get free valuation

### SEO & Performance (SEO)

- **SEO-01**: Unique title tags and meta descriptions per page
- **SEO-02**: JSON-LD structured data for properties (RealEstateListing schema)
- **SEO-03**: Static generation (SSG) for area pages and property pages
- **SEO-04**: Image optimization via Next/Image
- **SEO-05**: Core Web Vitals targets (LCP < 2.5s, CLS < 0.1)

### Deployment (DEPLOY)

- **DEPLOY-01**: Vercel deployment with production domain
- **DEPLOY-02**: Preview deployments for development branches

## v2 (Out of Scope)

- IDX/MLS live feed integration
- User authentication / saved searches
- Blog / content marketing
- CMS for property management

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| BRAND-01 | Phase 1 | Complete |
| BRAND-02 | Phase 1 | Complete |
| BRAND-03 | Phase 1 | Complete |
| BRAND-04 | Phase 1 | Complete |
| NAV-01 | Phase 1 | Complete |
| NAV-02 | Phase 1 | Complete |
| NAV-03 | Phase 1 | Complete |
| NAV-04 | Phase 1 | Complete |
| HOME-01 | Phase 2 | Complete |
| HOME-02 | Phase 2 | Complete |
| HOME-03 | Phase 2 | Complete |
| HOME-04 | Phase 2 | Complete |
| HOME-05 | Phase 2 | Complete |
| HOME-06 | Phase 2 | Complete |
| PROP-01 | Phase 3 | Complete |
| PROP-02 | Phase 3 | Complete |
| PROP-03 | Phase 3 | Complete |
| PROP-04 | Phase 3 | Complete |
| PROP-05 | Phase 3 | Complete |
| PROP-06 | Phase 3 | Complete |
| PROP-07 | Phase 3 | Complete |
| PROP-08 | Phase 3 | Complete |
| PROP-09 | Phase 3 | Complete |
| AGENT-01 | Phase 4 | Complete |
| AGENT-02 | Phase 4 | Complete |
| AGENT-03 | Phase 4 | Complete |
| AGENT-04 | Phase 4 | Complete |
| AGENT-05 | Phase 4 | Complete |
| AGENT-06 | Phase 4 | Complete |
| AREA-01 | Phase 5 | Pending |
| AREA-02 | Phase 5 | Pending |
| AREA-03 | Phase 5 | Pending |
| LEAD-01 | Phase 6 | Complete |
| LEAD-02 | Phase 6 | Complete |
| LEAD-03 | Phase 6 | Complete |
| LEAD-04 | Phase 6 | Complete |
| LEAD-05 | Phase 6 | Complete |
| LEAD-06 | Phase 6 | Complete |
| EDU-01 | Phase 7 | Pending |
| EDU-02 | Phase 7 | Pending |
| EDU-03 | Phase 7 | Pending |
| EDU-04 | Phase 7 | Pending |
| EDU-05 | Phase 7 | Pending |
| EDU-06 | Phase 7 | Pending |
| PROPOSAL-01 | Phase 8 | Complete |
| PROPOSAL-02 | Phase 8 | Complete |
| PROPOSAL-03 | Phase 8 | Complete |
| SEO-01 | Phase 9 | Pending |
| SEO-02 | Phase 9 | Pending |
| SEO-03 | Phase 9 | Pending |
| SEO-04 | Phase 9 | Pending |
| SEO-05 | Phase 9 | Pending |
| DEPLOY-01 | Phase 9 | Pending |
| DEPLOY-02 | Phase 9 | Pending |

**Coverage:**
- v1 requirements: 53 total
- Mapped to phases: 53
- Unmapped: 0 ✓
