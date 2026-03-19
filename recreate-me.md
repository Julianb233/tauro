# TAURO REALTY — Complete Project Blueprint

> **This document is the single source of truth for recreating the entire Tauro Realty website from scratch.** Another AI agent (or developer) should be able to read this and reproduce the project in its entirety.

---

## 1. PROJECT OVERVIEW

### What It Is
Tauro is a premium real estate brokerage website for **LYL Realty Group**, serving Philadelphia's luxury residential market. It is a full-stack Next.js application with a "quiet luxury" editorial aesthetic, featuring property listings, agent profiles, neighborhood guides, lead capture, and an internal admin dashboard.

### Who It's For
- **Primary audience:** High-net-worth home buyers and sellers in Philadelphia
- **Secondary audience:** Real estate investors, relocators, first-time buyers
- **Internal users:** Tauro agents and admins (dashboard)

### Live URL
**https://taurorealty.com** (hosted on Vercel, custom domain with www redirect)

### Tech Stack (Exact Versions)

| Technology | Version | Purpose |
|---|---|---|
| Next.js | ^16.1.7 | Framework (App Router, RSC, Turbopack) |
| React | 19.2.3 | UI library |
| TypeScript | 5.9.3 | Type safety |
| Tailwind CSS | ^4.2.2 | Utility-first styling |
| GSAP | ^3.14.2 | Premium animations |
| @gsap/react | ^2.1.2 | React GSAP integration |
| Supabase | ^2.99.2 (@supabase/supabase-js), ^0.9.0 (@supabase/ssr) | Database, auth, storage |
| Mapbox GL | ^3.20.0 + react-map-gl ^8.1.0 | Interactive maps |
| Resend | ^6.9.4 | Transactional email |
| Sentry | ^10.44.0 (@sentry/nextjs) | Error tracking |
| Lucide React | ^0.577.0 | Icon library |
| class-variance-authority | ^0.7.1 | Component variants |
| clsx + tailwind-merge | ^2.1.1 / ^3.5.0 | Class merging utility |
| yet-another-react-lightbox | ^3.29.1 | Image gallery lightbox |
| tw-animate-css | ^1.4.0 | Tailwind animation utilities |
| shadcn | ^4.0.8 | UI component primitives |
| @vercel/analytics | ^2.0.1 | Web analytics |
| @vercel/speed-insights | ^2.0.0 | Performance monitoring |
| @base-ui/react | ^1.3.0 | Headless UI primitives |

---

## 2. BRAND & DESIGN SYSTEM

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `midnight` / `near-black` | `#1A1A2E` | Primary dark, text, footer bg, navbar scrolled text |
| `gold` | `#C9A96E` | Primary accent, CTAs, headings accent, links hover |
| `gold-dark` | `#B08D4C` | Gold hover states, emphasis |
| `gold-light` | `#D4C4A0` | Secondary gold, subtle accents |
| `oxblood` | `#8B0000` | Destructive actions, error states |
| `off-white` / `cream` | `#F8F6F1` | Page backgrounds, card surfaces, muted sections |
| `background` (light) | `#FFFFFF` | Default page background |
| `foreground` (light) | `#1A1A2E` | Default text color |
| `border` (light) | `#E8E4DC` | Borders, dividers |
| `muted-foreground` | `#6B7280` | Secondary text, captions |
| `ring` | `#C9A96E` | Focus ring color |

**Dark mode tokens** are also defined (swap midnight/off-white, gold becomes primary).

### Typography

| Font Family | Variable | Usage |
|---|---|---|
| **Playfair Display** | `--font-playfair` | All headings (h1-h6), hero text, editorial titles. Loaded via `next/font/google`. Serif, display: swap. |
| **DM Sans** | `--font-dm-sans` | Body text, paragraphs, descriptions. Default sans-serif for the entire body. Loaded via `next/font/google`. |
| **Montserrat** | `--font-montserrat` | Labels, navigation links, buttons, category tags, section eyebrow text. Weights: 500, 600, 700. Applied via `.font-label` class. |

**Usage Rules:**
- Headings always use `font-heading` (Playfair Display)
- Body text uses `font-sans` (DM Sans)
- Navigation, buttons, labels use `font-label` (Montserrat), typically uppercase with `tracking-wide` or `tracking-[0.2em]`
- Eyebrow text above headings: `font-label text-xs font-semibold uppercase tracking-[0.25em] text-gold`

### Logo
The logo consists of a **bull mark** (SVG) alongside the **TAURO** wordmark. The component (`src/components/logo.tsx`) supports two variants:
- `variant="light"` — white logo for dark backgrounds (hero, footer, mobile overlay)
- `variant="dark"` — dark logo for light backgrounds (scrolled navbar)
- Sizes: `sm`, `md`, `lg`

Multiple logo concepts exist in `src/components/logos/` (logo-concept-1 through logo-concept-4).

### Design Philosophy
**"Quiet Luxury"** — The aesthetic is editorial, restrained, and premium. Think Architectural Digest meets a high-end fashion house. Key principles:
- Clean whitespace, generous padding
- Gold accents used sparingly for maximum impact
- Dark midnight backgrounds for dramatic contrast sections
- Photography-forward with cinematic overlays
- Micro-interactions that feel expensive (shimmer effects, subtle parallax)
- No bright colors, no playful elements — everything whispers prestige

### Glassmorphism Utility Classes
Defined in `globals.css`:

| Class | Usage |
|---|---|
| `.glass` | Light frosted glass — white bg at 8% opacity, 16px blur |
| `.glass-dark` | Dark frosted glass — midnight bg at 65% opacity, 20px blur |
| `.glass-gold` | Gold-tinted glass — gold bg at 8% opacity, 16px blur |
| `.glass-card` | Card variant — lighter blur (12px), hover lifts and gains gold border |
| `.glass-stat` | Stat badge — gold-tinted border, hover glow |

All glass classes include `backdrop-filter`, `-webkit-backdrop-filter`, and border styling. They degrade gracefully:
- Mobile (< 768px): blur reduced to 8px
- `prefers-reduced-transparency`: solid backgrounds, no blur

### Animation Patterns

**GSAP animations** (via `@gsap/react`):
- Components in `src/components/animations/`:
  - `FadeInView` — fade + slide on scroll intersection
  - `CountUp` — animated number counter
  - `ParallaxSection` — parallax scroll effect
  - `StaggerReveal` — staggered child element reveals
  - `TextReveal` — character-by-character text animation
  - `AnimationWrapper` — generic GSAP wrapper

**CSS animations** (in `globals.css`):
- `gold-shimmer` / `shimmer-gold` — hover shimmer sweep on buttons/cards
- `card-tilt` — 3D perspective tilt on hover
- `diagonal-wipe` / `slash-reveal` — clip-path reveal animations
- `depth-hover` — translateY + scale + shadow on hover
- `typewriter-cursor` — blinking cursor effect
- `animate-fade-in`, `animate-slide-up`, `animate-slide-in-left`, `animate-slide-in-right`, `animate-scale-in`

**Reduced motion:** All animations respect `prefers-reduced-motion: reduce` and a custom `html.a11y-reduce-motion` class toggle.

### Spacing Conventions
- Max content width: `max-w-7xl` (1280px)
- Horizontal padding: `px-4 sm:px-6 lg:px-8`
- Section vertical padding: `py-16 sm:py-20 lg:py-24`
- Card gap: `gap-6` or `gap-8`
- Gold dividers between sections: `<div className="gold-divider mx-auto max-w-7xl" />`

### Icon Style
- Library: **Lucide React** (`lucide-react`)
- Default size: `size-4` to `size-6`
- Stroke width: 1.5 (Lucide default)
- Color: inherits text color, hover transitions to `text-gold`
- Common icons: Phone, Mail, MapPin, Menu, X, Instagram, Facebook, Linkedin, Twitter, Heart, Share2, ArrowRight, ChevronDown

---

## 3. SITE ARCHITECTURE

### Route Groups

```
src/app/
  layout.tsx              — Root layout (fonts, metadata, JSON-LD, analytics, accessibility widget)
  globals.css             — Design tokens, animations, glassmorphism, print styles
  (site)/                 — Public marketing pages (Navbar + Footer + CompareBar)
    layout.tsx            — Wraps children with Navbar, Footer, CompareBar
    page.tsx              — Homepage
    about/                — About page
    agents/               — Agent directory + [slug] detail pages
    blog/                 — Blog listing + [slug] detail pages
    book-tour/            — Tour booking form
    brand/                — Brand guidelines page
    buyers-guide/         — Buyer's guide content page
    careers/              — Careers page
    compare/              — Property comparison tool
    contact/              — Contact form page
    faq/                  — FAQ page with categories
    fair-housing/         — Fair Housing statement
    favorites/            — Saved favorites (localStorage)
    home-value/           — Home valuation CTA page
    homes-for-sale/[neighborhood]/ — SEO neighborhood listing pages
    join/                 — Agent recruitment page
    market-insights/      — Market data and trends
    neighborhoods/        — Neighborhood directory + [slug] detail pages
    newsletter/confirm/   — Email confirmation landing
    newsletter/unsubscribe/ — Unsubscribe landing
    privacy/              — Privacy policy
    sell/                 — Seller landing page
    sellers-guide/        — Seller's guide content page
    sitemap-page/         — HTML sitemap
    terms/                — Terms of service
    why-join/             — Why join Tauro page
  properties/             — Property pages (own layout with Navbar + Footer, no CompareBar wrapper)
    layout.tsx            — Properties layout
    page.tsx              — Property search/listing page
    loading.tsx           — Loading skeleton
    [slug]/               — Property detail page
      page.tsx
      PropertyDetailClient.tsx
      brochure/           — Printable property brochure
        page.tsx
        BrochureClient.tsx
        QrCode.tsx
  (auth)/                 — Auth pages (minimal layout)
    layout.tsx
    login/page.tsx
  dashboard/              — Admin dashboard (protected)
    layout.tsx
    page.tsx              — Dashboard overview
    agents/               — Agent management
    calendar/             — Calendar view
    leads/                — Lead management
    properties/           — Property management
  proposal/               — Client proposal page (standalone layout)
    layout.tsx
    page.tsx
  api/                    — API routes
    agents/               — GET/POST agents, GET/PUT/DELETE [slug]
    brochures/generate/   — PDF brochure generation
    cron/daily-digest/    — Scheduled daily digest email
    leads/                — GET/POST leads, GET/PUT/DELETE [id]
    newsletter/           — POST subscribe, GET confirm, GET unsubscribe
    properties/           — GET/POST properties, GET/PUT/DELETE [slug]
    upload/               — Image upload to Supabase storage
    webhooks/ghl/         — GoHighLevel webhook receiver
```

### Component Hierarchy
```
RootLayout
  ├── Skip-to-content link
  ├── GoogleAnalytics
  ├── Vercel Analytics
  ├── Vercel SpeedInsights
  ├── OrganizationJsonLd
  ├── WebSiteJsonLd
  ├── <main id="main-content">
  │     ├── SiteLayout (for (site) group)
  │     │     ├── Navbar
  │     │     ├── {page content}
  │     │     ├── CompareBar
  │     │     └── Footer
  │     ├── PropertiesLayout (for properties group)
  │     │     ├── Navbar
  │     │     ├── {page content}
  │     │     └── Footer
  │     └── DashboardLayout (for dashboard)
  │           ├── Sidebar
  │           ├── Header
  │           └── {page content}
  └── AccessibilityWidget
```

### Data Flow
```
Static data (src/data/*.ts)
        ↓ fallback
Supabase (if env vars configured)
        ↓ maps via
src/lib/supabase/mappers.ts
        ↓ unified via
src/lib/data.ts (loadProperties, loadAgents, loadNeighborhoods, etc.)
        ↓ consumed by
Server Components (pages) and API routes
```

The `src/lib/data.ts` module is the **single entry point** for all data fetching. It:
1. Checks if Supabase env vars exist (`hasSupabase()`)
2. If yes, dynamically imports `@/lib/supabase/queries` and `@/lib/supabase/mappers`
3. Queries Supabase and maps rows to frontend interfaces
4. If Supabase fails or is not configured, falls back to static data files

---

## 4. PAGES — COMPLETE INVENTORY

### Homepage (`/`)
- **Route:** `src/app/(site)/page.tsx`
- **Components:** Hero, StatsBar, FeaturedProperties, RecentlyViewed, NeighborhoodShowcase, WhyTauro, Testimonials, HomepageCTAs, NewsletterCTA
- **Data:** Featured properties, neighborhoods, testimonials (via `loadTestimonials`, `loadFeaturedProperties`, `loadHomepageNeighborhoods`)
- **Features:** Cinematic video hero with search bar, animated stat counters, property cards with favorites, neighborhood grid, testimonial carousel, gold dividers between sections
- **SEO:** Title "Premium Philadelphia Real Estate", full OG image, WebSite + Organization JSON-LD

### Properties Listing (`/properties`)
- **Route:** `src/app/properties/page.tsx` + `PropertiesClient.tsx`
- **Components:** PropertyFilters, PropertyCard, PropertyMap, CompareBar
- **Data:** All properties via `loadProperties()`
- **Features:** Filter by neighborhood, price range, beds, baths, property type, status. Map/list toggle view. Compare functionality. URL query params for filters.

### Property Detail (`/properties/[slug]`)
- **Route:** `src/app/properties/[slug]/page.tsx` + `PropertyDetailClient.tsx`
- **Components:** ImageGallery (lightbox), PropertyMap, PropertyVideoTour, RoomBreakdown, PriceHistory, OpenHouseBanner, ShareButton, Breadcrumbs, contact-form, RealEstateListingJsonLd
- **Data:** Single property via `loadPropertyBySlug(slug)`
- **Features:** Full image gallery with lightbox, virtual tour embed, video tour, mortgage calculator, share/favorite, agent contact sidebar, structured data, print-friendly brochure link

### Property Brochure (`/properties/[slug]/brochure`)
- **Route:** `src/app/properties/[slug]/brochure/page.tsx` + `BrochureClient.tsx` + `QrCode.tsx`
- **Features:** Print-optimized property brochure with QR code linking back to listing

### Agents Directory (`/agents`)
- **Route:** `src/app/(site)/agents/page.tsx`
- **Components:** AgentCard
- **Data:** All agents via `loadAgents()`
- **Features:** Agent grid with photo, name, title, specialties

### Agent Profile (`/agents/[slug]`)
- **Route:** `src/app/(site)/agents/[slug]/page.tsx` + `AgentProfileClient.tsx`
- **Components:** AgentVideoIntro, PropertyCard (active listings), RealEstateAgentJsonLd, contact-form
- **Data:** Agent + listings via `loadAgentBySlug(slug)`
- **Features:** Agent bio, stats, awards, video intro, active listings, contact form, structured data

### Neighborhoods Directory (`/neighborhoods`)
- **Route:** `src/app/(site)/neighborhoods/page.tsx`
- **Data:** All neighborhoods via `loadNeighborhoods()`
- **Features:** Grid of neighborhood cards with images

### Neighborhood Detail (`/neighborhoods/[slug]`)
- **Route:** `src/app/(site)/neighborhoods/[slug]/page.tsx`
- **Components:** AreaHero, MarketDataSection, LifestyleSection, LocalFavorites, SchoolsSection, ScoreGauges, NeighborhoodMap, area-listings
- **Data:** Neighborhood + filtered properties
- **Features:** Hero with stats, walk/transit/bike scores, school ratings, local spots, market data, property listings

### SEO Neighborhood Pages (`/homes-for-sale/[neighborhood]`)
- **Route:** `src/app/(site)/homes-for-sale/[neighborhood]/page.tsx`
- **Features:** SEO-targeted landing pages for "homes for sale in [neighborhood]"

### About (`/about`)
- **Route:** `src/app/(site)/about/page.tsx` + `AboutAnimations.tsx`
- **Features:** Company story, team photos, values, GSAP animations

### Contact (`/contact`)
- **Route:** `src/app/(site)/contact/page.tsx`
- **Components:** contact-form, Turnstile CAPTCHA
- **Features:** Lead capture form with Turnstile verification, agent preference, sends to API

### Sell (`/sell`)
- **Route:** `src/app/(site)/sell/page.tsx`
- **Components:** seller-inquiry-form
- **Features:** Seller CTA, inquiry form, market stats

### Book Tour (`/book-tour`)
- **Route:** `src/app/(site)/book-tour/page.tsx` + `BookTourClient.tsx`
- **Components:** tour-booking-form
- **Features:** Tour scheduling with date/time picker, property selection

### Blog (`/blog`)
- **Route:** `src/app/(site)/blog/page.tsx` + `BlogCategoryFilter.tsx`
- **Data:** `src/data/blog-posts.ts`
- **Features:** Blog listing with category filter (Market Trends, Neighborhoods, Buying, Selling, Lifestyle)

### Blog Post (`/blog/[slug]`)
- **Route:** `src/app/(site)/blog/[slug]/page.tsx`
- **Components:** ReadingProgress
- **Features:** Full article with reading progress bar, markdown content

### FAQ (`/faq`)
- **Route:** `src/app/(site)/faq/page.tsx` + `FaqClient.tsx`
- **Data:** Buyer, seller, general FAQs via `loadFaqs()`
- **Features:** Categorized accordion FAQ with FAQPage JSON-LD

### Favorites (`/favorites`)
- **Route:** `src/app/(site)/favorites/page.tsx` + `FavoritesClient.tsx`
- **Features:** Client-side favorites stored in localStorage, property cards

### Compare (`/compare`)
- **Route:** `src/app/(site)/compare/page.tsx` + `CompareClient.tsx`
- **Features:** Side-by-side property comparison table (up to 3 properties)

### Market Insights (`/market-insights`)
- **Route:** `src/app/(site)/market-insights/page.tsx`
- **Components:** Charts (BarChart, LineChart), market-stats
- **Data:** `src/data/market-data.ts`
- **Features:** Market trends, price charts, neighborhood comparisons

### Buyers Guide (`/buyers-guide`)
- **Route:** `src/app/(site)/buyers-guide/page.tsx`
- **Features:** Step-by-step home buying guide content

### Sellers Guide (`/sellers-guide`)
- **Route:** `src/app/(site)/sellers-guide/page.tsx`
- **Features:** Step-by-step home selling guide content

### Home Value (`/home-value`)
- **Route:** `src/app/(site)/home-value/page.tsx`
- **Features:** CTA for home valuation

### Join / Why Join (`/join`, `/why-join`)
- **Route:** `src/app/(site)/join/page.tsx`, `src/app/(site)/why-join/page.tsx`
- **Features:** Agent recruitment pages with application form

### Careers (`/careers`)
- **Route:** `src/app/(site)/careers/page.tsx`
- **Features:** Career opportunities listing

### Brand (`/brand`)
- **Route:** `src/app/(site)/brand/page.tsx`
- **Features:** Brand guidelines, logo usage, color palette display

### Legal Pages
- `/privacy` — Privacy policy
- `/terms` — Terms of service
- `/fair-housing` — Fair Housing statement and compliance

### Newsletter Pages
- `/newsletter/confirm` — Email confirmation landing page
- `/newsletter/unsubscribe` — Unsubscribe confirmation

### HTML Sitemap (`/sitemap-page`)
- **Route:** `src/app/(site)/sitemap-page/page.tsx`
- **Features:** Human-readable sitemap with all links

### Proposal (`/proposal`)
- **Route:** `src/app/proposal/page.tsx` (standalone layout, no navbar/footer)
- **Components:** proposal-scope, onboarding-steps
- **Features:** Client-facing service proposal (used for sales pitches)

### Dashboard (`/dashboard`) — Protected
- **Route:** `src/app/dashboard/page.tsx`
- **Components:** dashboard-shell, sidebar, header, stat-card
- **Sub-pages:** `/dashboard/leads`, `/dashboard/properties`, `/dashboard/agents`, `/dashboard/calendar`
- **Features:** Lead management table, property CRUD, agent management, calendar view
- **Auth:** Protected by Supabase auth middleware, role-based (admin, agent, viewer)

### Auth (`/login`)
- **Route:** `src/app/(auth)/login/page.tsx`
- **Features:** Supabase authentication

### Not Found / Error
- `src/app/not-found.tsx` — Custom 404 page
- `src/app/global-error.tsx` — Global error boundary (Sentry integration)

---

## 5. COMPONENT LIBRARY

### Layout Components
| Component | File | Purpose | Used In |
|---|---|---|---|
| Navbar | `navbar.tsx` | Fixed header with scroll state, transparent-to-solid transition, mobile overlay | SiteLayout, PropertiesLayout |
| Footer | `footer.tsx` | 4-column footer: brand, quick links, neighborhoods with images, contact + map | SiteLayout, PropertiesLayout |
| Logo | `logo.tsx` | SVG bull mark + TAURO wordmark, light/dark variants, sm/md/lg sizes | Navbar, Footer |
| CompareBar | `CompareBar.tsx` | Sticky bottom bar showing selected comparison properties | SiteLayout |
| Breadcrumbs | `Breadcrumbs.tsx` | Breadcrumb navigation trail | Property detail, neighborhood detail |

### Homepage Components
| Component | File | Purpose |
|---|---|---|
| Hero | `hero.tsx` | Full-screen cinematic video hero with gradient overlay and search bar |
| HeroSearchBar | `HeroSearchBar.tsx` | Search input overlaid on hero, navigates to /properties with query |
| StatsBar | `stats-bar.tsx` | Animated stat counters (properties sold, agents, etc.) |
| FeaturedProperties | `featured-properties.tsx` | Grid of featured property cards |
| NeighborhoodShowcase | `neighborhood-showcase.tsx` | Grid of neighborhood cards with images |
| WhyTauro | `why-tauro.tsx` | Value proposition section with features |
| Testimonials | `testimonials.tsx` | Testimonial carousel |
| TestimonialCarousel | `TestimonialCarousel.tsx` | Carousel implementation for testimonials |
| HomepageCTAs | `homepage-ctas.tsx` | CTA cards (buy, sell, join) |
| RecentlyViewed | `RecentlyViewed.tsx` | Recently viewed properties from localStorage |
| NewsletterCTA | `NewsletterCTA.tsx` | Newsletter signup section (variant: homepage or standalone) |
| NewsletterForm | `NewsletterForm.tsx` | Email input form for newsletter |
| NewsletterSlideIn | `NewsletterSlideIn.tsx` | Slide-in newsletter prompt |

### Property Components
| Component | File | Purpose |
|---|---|---|
| PropertyCard | `PropertyCard.tsx` | Card with image, price, beds/baths/sqft, favorite toggle, compare checkbox |
| PropertyFilters | `PropertyFilters.tsx` | Filter panel for property search (neighborhood, price, beds, baths, type, status) |
| PropertyMap | `PropertyMap.tsx` | Mapbox GL map showing property locations with markers |
| ImageGallery | `ImageGallery.tsx` | Photo gallery with lightbox (yet-another-react-lightbox) |
| PropertyVideoTour | `PropertyVideoTour.tsx` | Embedded YouTube/Matterport video player |
| PriceHistory | `PriceHistory.tsx` | Price history timeline |
| RoomBreakdown | `RoomBreakdown.tsx` | Interior/exterior/community feature breakdown |
| OpenHouseBanner | `OpenHouseBanner.tsx` | Open house date/time banner |
| ShareButton | `ShareButton.tsx` | Share via Web Share API or clipboard |
| VideoShowcase | `VideoShowcase.tsx` | Video showcase section |

### Agent Components
| Component | File | Purpose |
|---|---|---|
| AgentCard | `AgentCard.tsx` | Agent card with photo, name, title, specialties, contact |
| AgentVideoIntro | `AgentVideoIntro.tsx` | Embedded agent intro video |

### Neighborhood Components
| Component | File | Purpose |
|---|---|---|
| NeighborhoodMap | `NeighborhoodMap.tsx` | Mapbox map for neighborhood detail page |
| AreaHero | `area-hero.tsx` | Neighborhood hero banner |
| AreaListings | `area-listings.tsx` | Property listings filtered by neighborhood |
| AreasWeServe | `areas-we-serve.tsx` | Grid of served areas |
| LifestyleSection | `neighborhood/LifestyleSection.tsx` | Vibe, dining, transit, parks info |
| LocalFavorites | `neighborhood/LocalFavorites.tsx` | Local restaurant/bar/shop recommendations |
| MarketDataSection | `neighborhood/MarketDataSection.tsx` | Market stats for the neighborhood |
| SchoolsSection | `neighborhood/SchoolsSection.tsx` | School ratings and info |
| ScoreGauges | `neighborhood/ScoreGauges.tsx` | Walk/transit/bike score circular gauges |

### Form Components
| Component | File | Purpose |
|---|---|---|
| contact-form | `contact-form.tsx` | General contact/showing request form |
| seller-inquiry-form | `seller-inquiry-form.tsx` | Seller inquiry form |
| tour-booking-form | `tour-booking-form.tsx` | Tour booking with date/time |
| Turnstile | `turnstile.tsx` | Cloudflare Turnstile CAPTCHA widget |
| ImageUpload | `ImageUpload.tsx` | Image upload widget for dashboard |

### Animation Components
| Component | File | Purpose |
|---|---|---|
| AnimationWrapper | `animations/AnimationWrapper.tsx` | Generic GSAP animation wrapper |
| CountUp | `animations/CountUp.tsx` | Animated number counter |
| FadeInView | `animations/FadeInView.tsx` | Fade-in on scroll intersection |
| ParallaxSection | `animations/ParallaxSection.tsx` | Parallax scroll effect |
| StaggerReveal | `animations/StaggerReveal.tsx` | Staggered child reveals |
| TextReveal | `animations/TextReveal.tsx` | Character-by-character text reveal |

### UI Primitives
| Component | File | Purpose |
|---|---|---|
| Button | `ui/button.tsx` | CVA button with variants |
| GoldShimmer | `ui/gold-shimmer.tsx` | Wrapper adding shimmer effect |
| Skeleton | `ui/skeleton.tsx` | Loading skeleton placeholder |
| TiltCard | `ui/tilt-card.tsx` | 3D tilt card on hover |

### Utility Components
| Component | File | Purpose |
|---|---|---|
| GoogleAnalytics | `GoogleAnalytics.tsx` | GA4 script injection |
| JsonLd | `JsonLd.tsx` | Structured data: OrganizationJsonLd, RealEstateListingJsonLd, RealEstateAgentJsonLd, WebSiteJsonLd |
| AccessibilityWidget | `AccessibilityWidget.tsx` | Floating a11y toggle (font size, contrast, reduce motion) |
| ScrollToTop | `ScrollToTop.tsx` | Scroll-to-top button |
| ReadingProgress | `ReadingProgress.tsx` | Reading progress bar for blog posts |
| NavigationProgress | `NavigationProgress.tsx` | Page navigation loading bar |
| PageTransition | `PageTransition.tsx` | Page transition animation wrapper |

### Dashboard Components
| Component | File | Purpose |
|---|---|---|
| DashboardShell | `dashboard/dashboard-shell.tsx` | Dashboard layout wrapper |
| Sidebar | `dashboard/sidebar.tsx` | Dashboard navigation sidebar |
| Header | `dashboard/header.tsx` | Dashboard top header |
| StatCard | `dashboard/stat-card.tsx` | Metric display card |
| LeadTable | `dashboard/lead-table.tsx` | Leads data table |
| LeadDetail | `dashboard/lead-detail.tsx` | Lead detail panel |
| PropertyTable | `dashboard/property-table.tsx` | Properties data table |
| PropertyForm | `dashboard/property-form.tsx` | Property create/edit form |
| CalendarView | `dashboard/calendar-view.tsx` | Calendar display |
| AgentManager | `dashboard/agents/agent-manager.tsx` | Agent CRUD |

### Chart Components
| Component | File | Purpose |
|---|---|---|
| BarChart | `charts/BarChart.tsx` | Bar chart (CSS-based, no chart library) |
| LineChart | `charts/LineChart.tsx` | Line chart (SVG-based) |

---

## 6. DATA MODELS

### Property
```typescript
interface Property {
  id: string;
  slug: string;
  address: string;
  city: string;                    // "Philadelphia"
  state: string;                   // "PA"
  zip: string;
  neighborhood: string;            // "Rittenhouse", "Fishtown", etc.
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lotSqft: number;
  yearBuilt: number;
  status: "Active" | "Pending" | "Open House" | "New";
  propertyType: "Single Family" | "Condo" | "Townhouse" | "Multi-Family" | "Land";
  images: string[];                // Unsplash URLs
  description: string;
  features: {
    interior: string[];
    exterior: string[];
    community: string[];
  };
  agent: {
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
  lat: number;
  lng: number;
  openHouse?: string;              // Display string "Sat, Mar 22 - 1:00 PM - 4:00 PM"
  openHouseEvent?: {
    date: string;                  // YYYY-MM-DD
    startTime: string;             // HH:MM (24h)
    endTime: string;
  };
  videoUrl?: string;               // YouTube embed URL
  virtualTourUrl?: string;         // Matterport URL
  tax_annual: number;
  tax_year: number;
}
```

### Agent
```typescript
interface Agent {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;                   // "Founding Partner & Lead Agent"
  email: string;
  phone: string;
  photo: string;
  bio: string;                     // Full paragraph bio
  shortBio: string;                // One-liner
  specialties: string[];
  neighborhoods: string[];
  stats: {
    propertiesSold: number;
    totalVolume: string;           // "$120M+"
    avgDaysOnMarket: number;
    yearsExperience: number;
  };
  awards: {
    title: string;
    year: number;
    issuer: string;
  }[];
  videoIntroUrl: string | null;
  videoIntroId: string | null;
  activeListingIds: string[];
  soldListingIds: string[];
  social: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
  languages: string[];
  licenseNumber: string;
}
```

### Neighborhood
```typescript
interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  sellingPoints: string[];
  lifestyle: {
    vibe: string;
    dining: string;
    transit: string;
    parks: string;
  };
  stats: {
    medianPrice: string;
    avgPricePerSqft: string;
    avgDaysOnMarket: number;
    inventoryLevel: string;
  };
  marketData: MarketData;
  schools: School[];
  walkScore: number;
  transitScore: number;
  bikeScore: number;
  lifestyleInfo: LifestyleInfo;
  localSpots: LocalSpot[];
  image: string;
  cardImage: string;
  mapCenter: { lat: number; lng: number };
  propertyFilter: string;
  featured: boolean;
}

interface School {
  name: string;
  type: "Public" | "Private" | "Charter" | "Magnet";
  rating: number;
  grades: string;
  distance: string;
}

interface LocalSpot {
  name: string;
  type: "Restaurant" | "Cafe" | "Bar" | "Shop" | "Park" | "Gallery" | "Brewery" | "Market";
  description: string;
}

interface MarketData {
  medianPrice: string;
  avgPricePerSqft: string;
  medianDaysOnMarket: number;
  activeListings: number;
  priceChange12m: string;
}

interface LifestyleInfo {
  dining: string;
  nightlife: string;
  parks: string;
  culture: string;
}
```

### Testimonial
```typescript
interface Testimonial {
  quote: string;
  name: string;
  role: string;           // "Homebuyers - Rittenhouse Square"
  rating: number;         // 1-5
}
```

### FAQ
```typescript
interface FaqItem {
  question: string;
  answer: string;
}
// Three categories: buyerFaqs, sellerFaqs, generalFaqs
```

### BlogPost
```typescript
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;         // Markdown
  author: string;
  authorImage: string;
  category: "Market Trends" | "Neighborhoods" | "Buying" | "Selling" | "Lifestyle";
  coverImage: string;
  publishedAt: string;     // ISO date
  readTime: number;        // Minutes
}
```

### Supabase Database Tables
Defined in `src/types/database.ts`:
- `properties` — Full property listings with agent relationship
- `agents` — Agent profiles
- `neighborhoods` — Neighborhood data
- `leads` — Lead capture (type, contact info, status, metadata, ghl_synced)
- `testimonials` — Customer testimonials
- `faq` — FAQ entries with category and sort_order
- `profiles` — User profiles with role enum (admin, agent, viewer)

**Relationships:**
- `properties.listing_agent_id` -> `agents.id`
- `leads.property_id` -> `properties.id`
- `leads.agent_id` -> `agents.id`
- `profiles.agent_id` -> `agents.id` (one-to-one)

---

## 7. API ROUTES

### `POST /api/leads`
- **Purpose:** Create a new lead (contact, showing, seller inquiry, agent application, agent contact)
- **Validation:** Zod schema with fields: type, firstName, lastName, email, phone, message, propertyId, propertySlug, preferredDate/Time, homeAddress, beds, baths, sqft, timeline, reason, licenseNumber, yearsExperience, currentBrokerage, whyJoin, agentName, agentSlug, captchaToken
- **Flow:** Honeypot check -> Zod validation -> Turnstile CAPTCHA verify -> Sanitize inputs -> Insert to Supabase `leads` table -> Send confirmation email (Resend) -> Send agent notification email -> Forward to GoHighLevel CRM -> Fallback console log if no backend
- **Response:** `{ success, db_saved, ghl_synced }`

### `GET /api/leads`
- **Purpose:** List leads (for dashboard)
- **Query params:** status, type, limit, offset
- **Auth:** Middleware session check

### `GET/PUT/DELETE /api/leads/[id]`
- **Purpose:** Individual lead CRUD for dashboard

### `GET /api/properties`
- **Purpose:** List properties with filtering
- **Query params:** neighborhood, status, propertyType, minPrice, maxPrice, beds, baths, sortBy, sortOrder, limit, offset, featured

### `POST /api/properties`
- **Purpose:** Create new property (dashboard)

### `GET/PUT/DELETE /api/properties/[slug]`
- **Purpose:** Individual property CRUD

### `GET /api/agents`
- **Purpose:** List all agents

### `POST /api/agents`
- **Purpose:** Create new agent (dashboard)

### `GET/PUT/DELETE /api/agents/[slug]`
- **Purpose:** Individual agent CRUD

### `POST /api/newsletter`
- **Purpose:** Newsletter subscription (double opt-in)

### `GET /api/newsletter/confirm`
- **Purpose:** Confirm newsletter subscription via token

### `GET /api/newsletter/unsubscribe`
- **Purpose:** Unsubscribe from newsletter

### `POST /api/brochures/generate`
- **Purpose:** Generate PDF property brochure

### `POST /api/upload`
- **Purpose:** Upload images to Supabase storage
- **Auth:** Requires UPLOAD_API_KEY header

### `POST /api/webhooks/ghl`
- **Purpose:** Receive webhooks from GoHighLevel CRM

### `GET /api/cron/daily-digest`
- **Purpose:** Cron job (Vercel cron, daily at 1 PM UTC) — sends daily digest email of new leads

---

## 8. FEATURES CHECKLIST

### Property Search & Discovery
- [x] Full property listing page with grid/map toggle
- [x] Filter by: neighborhood, price range, beds, baths, property type, status
- [x] Sort by: price, date, beds, sqft (asc/desc)
- [x] URL-based filter persistence (query params)
- [x] Hero search bar with text input
- [x] Featured properties on homepage
- [x] Recently viewed properties (localStorage)
- [x] SEO neighborhood landing pages (`/homes-for-sale/[neighborhood]`)

### Property Detail
- [x] Full image gallery with lightbox (yet-another-react-lightbox)
- [x] Video tour embed (YouTube)
- [x] Virtual tour embed (Matterport)
- [x] Interactive Mapbox map with property marker
- [x] Feature breakdown (interior, exterior, community)
- [x] Open house banner with date/time
- [x] Tax information display
- [x] Agent contact sidebar with form
- [x] Printable property brochure page with QR code

### Favorites & Comparison
- [x] Heart toggle to save favorites (localStorage via `useFavorites` hook)
- [x] Favorites page listing saved properties
- [x] Property comparison (up to 3 properties) via `useCompare` hook
- [x] Sticky CompareBar at bottom of screen
- [x] Side-by-side comparison table page

### Sharing
- [x] Share button with Web Share API fallback to clipboard
- [x] Social media share (native share sheet)

### Lead Capture
- [x] Contact form (general inquiries)
- [x] Showing request form
- [x] Seller inquiry form
- [x] Agent application form
- [x] Tour booking form with date/time picker
- [x] Home valuation CTA
- [x] Honeypot spam field
- [x] Cloudflare Turnstile CAPTCHA
- [x] Input sanitization (XSS prevention)
- [x] Zod validation on all form submissions

### Email
- [x] Lead confirmation email
- [x] Agent notification email
- [x] Application confirmation email
- [x] Newsletter welcome email
- [x] Newsletter confirmation (double opt-in)
- [x] Daily digest email (cron)
- [x] Monthly newsletter template
- [x] All emails via Resend with React email templates (`src/emails/`)

### Newsletter
- [x] Newsletter signup form
- [x] Slide-in newsletter prompt
- [x] Double opt-in confirmation
- [x] Unsubscribe flow

### Animations & Micro-interactions
- [x] GSAP scroll-triggered animations (fade, slide, stagger, parallax, count-up, text reveal)
- [x] Gold shimmer hover effect on buttons and cards
- [x] 3D card tilt on hover
- [x] Diagonal wipe / slash reveal animations
- [x] Depth hover (lift + shadow)
- [x] Typewriter cursor blink
- [x] CSS slide-up, fade-in, scale-in animations
- [x] Page transition animations
- [x] Reading progress bar (blog posts)
- [x] Navigation progress bar
- [x] Scroll-to-top button
- [x] Smooth scrolling
- [x] All animations respect prefers-reduced-motion

### SEO
- [x] Dynamic metadata per page
- [x] Template-based title: `%s | Tauro`
- [x] Canonical URLs via `alternates.canonical`
- [x] Dynamic OG image generation (`opengraph-image.tsx`)
- [x] Dynamic favicon/icon generation (`icon.tsx`, `apple-icon.tsx`)
- [x] XML sitemap with all pages, properties, neighborhoods, agents
- [x] robots.txt (disallow /api/, /proposal/)
- [x] Structured data (JSON-LD): Organization, RealEstateAgent, RealEstateListing, WebSite with SearchAction
- [x] HTML sitemap page
- [x] ISR revalidation (sitemap revalidates every 3600s)

### Accessibility
- [x] Skip-to-content link
- [x] Semantic HTML (header, nav, main, footer, section)
- [x] ARIA labels on interactive elements
- [x] Focus indicators (ring color: gold)
- [x] Keyboard navigation (Escape closes mobile menu)
- [x] Body scroll lock when mobile menu open
- [x] Accessibility widget (floating button) with toggles for:
  - Font size (normal, large 112.5%, extra-large 125%)
  - High contrast mode
  - Reduce motion
- [x] `prefers-reduced-motion` support
- [x] `prefers-reduced-transparency` support
- [x] Minimum touch target size (44px on mobile)
- [x] Alt text on all images
- [x] Print styles

### Compliance
- [x] Fair Housing statement page (`/fair-housing`)
- [x] Privacy Policy page (`/privacy`)
- [x] Terms of Service page (`/terms`)
- [x] Cookie consent (referenced in CSS `[data-cookie-consent]`)
- [x] MLS disclaimer patterns
- [x] CCPA/GDPR considerations in privacy policy

### Dashboard (Admin)
- [x] Protected routes (Supabase auth + middleware)
- [x] Role-based access (admin, agent, viewer)
- [x] Lead management (table, detail view, status updates)
- [x] Property CRUD
- [x] Agent management
- [x] Calendar view
- [x] Stat cards (overview metrics)

### Performance
- [x] Turbopack for dev
- [x] Image optimization (AVIF, WebP via `next/image`)
- [x] Remote image patterns (Unsplash, Supabase storage)
- [x] Font display: swap (no FOIT)
- [x] Vercel Speed Insights
- [x] Vercel Analytics
- [x] Sentry error tracking with source maps disabled in production

---

## 9. THIRD-PARTY INTEGRATIONS

### Supabase
- **Purpose:** PostgreSQL database, auth, file storage
- **Tables:** properties, agents, neighborhoods, leads, testimonials, faq, profiles
- **Auth:** Email/password for dashboard access
- **Storage:** Image uploads for properties
- **Client setup:** `src/lib/supabase/client.ts` (browser), `src/lib/supabase/server.ts` (server), `src/lib/supabase/middleware.ts` (auth session)
- **Mappers:** `src/lib/supabase/mappers.ts` (converts snake_case DB rows to camelCase frontend interfaces)
- **Queries:** `src/lib/supabase/queries.ts` (all Supabase queries)

### Mapbox
- **Purpose:** Interactive property and neighborhood maps
- **Token:** `NEXT_PUBLIC_MAPBOX_TOKEN`
- **Usage:** `PropertyMap.tsx`, `NeighborhoodMap.tsx`
- **Libraries:** `mapbox-gl` + `react-map-gl`

### Unsplash
- **Purpose:** Property and neighborhood images (via direct URLs)
- **No API key needed:** Images referenced by URL with size/quality params
- **Remote pattern:** `images.unsplash.com` configured in `next.config.ts`

### GoHighLevel (GHL)
- **Purpose:** CRM lead sync
- **Integration:** Leads submitted via API are forwarded to GHL via `src/lib/ghl.ts`
- **Env vars:** `GHL_WEBHOOK_URL`, `GHL_API_KEY`, `GHL_LOCATION_ID`, `GHL_WEBHOOK_SECRET`
- **Webhook:** `/api/webhooks/ghl` receives inbound GHL webhooks

### Resend
- **Purpose:** Transactional email delivery
- **Env vars:** `RESEND_API_KEY`, `EMAIL_FROM` (noreply@taurorealty.com)
- **Email templates:** React components in `src/emails/`
  - `lead-confirmation.tsx`
  - `agent-notification.tsx`
  - `application-confirmation.tsx`
  - `newsletter-welcome.tsx`
  - `newsletter-confirmation.tsx`
  - `daily-digest.tsx`
  - `monthly-newsletter.tsx`
- **Library:** `src/lib/email.ts`

### Google Analytics 4
- **Purpose:** Website analytics
- **Env var:** `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- **Component:** `src/components/GoogleAnalytics.tsx`

### Vercel Analytics & Speed Insights
- **Purpose:** Web analytics and performance monitoring
- **Components:** `<Analytics />` and `<SpeedInsights />` in root layout

### Sentry
- **Purpose:** Error tracking and monitoring
- **Config:** `next.config.ts` wraps with `withSentryConfig`
- **Tunnel route:** `/monitoring` (avoids ad blockers)
- **Source maps:** Disabled in production
- **Env vars:** `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`

### Cloudflare Turnstile
- **Purpose:** CAPTCHA for form submissions
- **Component:** `src/components/turnstile.tsx`
- **Verification:** `src/lib/turnstile.ts`
- **Env vars:** `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`

---

## 10. SEO & STRUCTURED DATA

### Schema.org Types

1. **RealEstateAgent** (Organization-level) — Rendered globally in root layout via `OrganizationJsonLd`
   - Name, URL, logo, description, phone, email, address
   - `areaServed`: 25 Philadelphia neighborhoods
   - `priceRange`: "$375,000 - $6,800,000"
   - `openingHoursSpecification`: Mon-Fri 9-6
   - `aggregateRating` from testimonials
   - `sameAs`: Instagram, LinkedIn, Facebook

2. **RealEstateListing** — Rendered on property detail pages via `RealEstateListingJsonLd`
   - Name, description, URL, images
   - `offers`: price, currency, availability (mapped from status)
   - `address`: full postal address
   - `geo`: lat/lng coordinates
   - `floorSize`: sqft
   - `numberOfRooms`, `numberOfBathroomsTotal`, `yearBuilt`
   - `broker`: agent info

3. **RealEstateAgent** (Individual) — Rendered on agent profile pages via `RealEstateAgentJsonLd`
   - Name, URL, image, phone, email, jobTitle, bio
   - `worksFor`: Tauro organization
   - `areaServed`: agent's neighborhoods
   - `knowsLanguage`
   - `sameAs`: social links

4. **WebSite** with **SearchAction** — Rendered globally via `WebSiteJsonLd`
   - Enables Google sitelinks search box
   - Target: `/properties?q={search_term_string}`

### Sitemap
- **File:** `src/app/sitemap.ts`
- **Revalidation:** Every 3600 seconds (ISR)
- **Includes:** All static pages, all property pages (daily change frequency, 0.9 priority), all neighborhood pages (weekly, 0.8 priority), all agent pages (monthly, 0.7 priority)
- **Base URL:** `https://taurorealty.com`

### Robots
- **File:** `src/app/robots.ts`
- **Rules:** Allow all, disallow `/api/` and `/proposal/`
- **Sitemap:** `https://taurorealty.com/sitemap.xml`

### OG Images
- **File:** `src/app/opengraph-image.tsx` — Dynamic OG image generation (1200x630)
- **Apple icon:** `src/app/apple-icon.tsx`
- **Favicon:** `src/app/icon.tsx`

### Canonical URLs
- Set via `metadataBase` + `alternates.canonical: "./"` in root layout
- Each page can override with specific canonical

---

## 11. ACCESSIBILITY

- **Skip-to-content link:** Visible on focus, links to `#main-content`
- **Semantic HTML:** Proper use of `header`, `nav`, `main`, `footer`, `section`, `article`
- **ARIA labels:** On all buttons (menu toggle, close, social links), `aria-modal` on mobile overlay, `role="dialog"` on mobile nav
- **Focus indicators:** Gold focus ring (`--ring: #C9A96E`)
- **Keyboard navigation:** Escape closes mobile menu, tab order maintained
- **Body scroll lock:** When mobile overlay is open
- **Touch targets:** Minimum 44px (`min-h-[44px] min-w-[44px]`) on mobile links
- **Alt text:** All images have descriptive alt text
- **Accessibility Widget** (`AccessibilityWidget.tsx`):
  - Floating button (bottom-right)
  - Font size toggle: Normal / Large (18px base) / Extra Large (20px base)
  - High contrast mode (black text on white, underlined links)
  - Reduce motion toggle
  - Preferences applied via CSS classes on `<html>`: `a11y-font-lg`, `a11y-font-xl`, `a11y-high-contrast`, `a11y-reduce-motion`
- **Reduced motion:** Full support via `@media (prefers-reduced-motion: reduce)` — all animations, transitions, and transforms disabled
- **Reduced transparency:** Glass effects degrade to solid backgrounds
- **Print styles:** Comprehensive print CSS hiding nav/footer, resetting colors, showing URLs, single-column layout

---

## 12. COMPLIANCE

### Fair Housing
- Dedicated `/fair-housing` page with Fair Housing Act statement
- Equal Housing Opportunity compliance

### Privacy (CCPA/GDPR)
- Dedicated `/privacy` page
- Cookie consent mechanism (referenced in print styles)
- Data collection disclosures

### Terms of Service
- Dedicated `/terms` page
- Service terms and conditions

### MLS Disclaimers
- Property listing disclaimers as appropriate

### Security
- Input sanitization on all form submissions (`src/lib/sanitize.ts`)
- Honeypot fields for spam prevention
- Cloudflare Turnstile CAPTCHA
- Rate limiting on API routes (`src/lib/rate-limit.ts`)
- CSRF origin checking in middleware
- Security headers via `vercel.json`:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`

---

## 13. DEPLOYMENT & CONFIG

### Vercel Configuration (`vercel.json`)
```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "has": [{ "type": "host", "value": "www.taurorealty.com" }],
      "destination": "https://taurorealty.com/$1",
      "permanent": true
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ],
  "crons": [
    { "path": "/api/cron/daily-digest", "schedule": "0 13 * * *" }
  ]
}
```

### Next.js Configuration (`next.config.ts`)
- Turbopack enabled for dev
- Image formats: AVIF, WebP
- Remote image patterns: `images.unsplash.com`, `*.supabase.co/storage/v1/object/public/**`
- Sentry: tunnel route at `/monitoring`, source maps disabled, silent in non-CI

### TypeScript Configuration
- Target: ES2017
- Strict mode enabled
- Path alias: `@/*` -> `./src/*`
- Module resolution: bundler

### Environment Variables
```bash
# Site URL (production domain)
NEXT_PUBLIC_SITE_URL=https://taurorealty.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# GoHighLevel CRM
GHL_WEBHOOK_URL=
GHL_API_KEY=
GHL_LOCATION_ID=
GHL_WEBHOOK_SECRET=

# Email (Resend)
RESEND_API_KEY=
EMAIL_FROM=noreply@taurorealty.com
ADMIN_EMAIL=julian@aiacrobatics.com

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Sentry
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
SENTRY_ORG=
SENTRY_PROJECT=

# Cron
CRON_SECRET=

# Upload
UPLOAD_API_KEY=
```

### ISR Revalidation
- Sitemap: `revalidate = 3600` (1 hour)
- Property/agent/neighborhood data: fetched at request time from Supabase (no explicit ISR on pages — relies on Supabase freshness)

### Middleware (`src/middleware.ts`)
- **Matches:** `/dashboard/:path*`, `/login`, `/api/:path*`
- **Dashboard/login:** Supabase session check and redirect
- **API routes:** Rate limiting (in-memory IP tracking) + CSRF origin validation on mutating methods

---

## 14. REPRODUCTION INSTRUCTIONS

### Step 1: Create Next.js App
```bash
npx create-next-app@latest tauro --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd tauro
```

### Step 2: Install Dependencies
```bash
# Core
npm install @supabase/supabase-js @supabase/ssr gsap @gsap/react mapbox-gl react-map-gl resend lucide-react class-variance-authority clsx tailwind-merge tw-animate-css yet-another-react-lightbox @vercel/analytics @vercel/speed-insights @sentry/nextjs @base-ui/react shadcn

# Dev
npm install -D @tailwindcss/postcss @types/mapbox-gl
```

### Step 3: Set Up Design System
1. Configure `globals.css` with all Tauro tokens, animations, glassmorphism classes, print styles, accessibility overrides (copy the full globals.css)
2. Set up Google Fonts in root layout: Playfair Display, DM Sans, Montserrat (500, 600, 700)
3. Apply font CSS variables to body and heading selectors
4. Configure Tailwind theme tokens (colors, fonts, radius) in the `@theme inline` block

### Step 4: Build Components (In Order)
1. **Utilities first:** `src/lib/utils.ts` (cn function), `src/lib/site-config.ts`
2. **UI primitives:** Button, Skeleton, GoldShimmer, TiltCard
3. **Logo:** Bull SVG mark + TAURO wordmark with light/dark variants
4. **Layout:** Navbar (fixed, scroll-aware, mobile overlay), Footer (4-column with neighborhood images)
5. **Homepage sections:** Hero (video + image fallback + search), StatsBar, FeaturedProperties, NeighborhoodShowcase, WhyTauro, Testimonials, HomepageCTAs, NewsletterCTA
6. **Property components:** PropertyCard, PropertyFilters, PropertyMap, ImageGallery, PropertyVideoTour, ShareButton, OpenHouseBanner, RoomBreakdown, PriceHistory, Breadcrumbs
7. **Agent components:** AgentCard, AgentVideoIntro
8. **Neighborhood components:** AreaHero, MarketDataSection, LifestyleSection, LocalFavorites, SchoolsSection, ScoreGauges, NeighborhoodMap
9. **Form components:** contact-form, seller-inquiry-form, tour-booking-form, Turnstile
10. **Animation components:** FadeInView, CountUp, ParallaxSection, StaggerReveal, TextReveal, AnimationWrapper
11. **Utility components:** JsonLd, GoogleAnalytics, AccessibilityWidget, ScrollToTop, ReadingProgress, NavigationProgress, PageTransition, CompareBar, RecentlyViewed, NewsletterForm, NewsletterSlideIn
12. **Dashboard components:** Shell, Sidebar, Header, StatCard, LeadTable, LeadDetail, PropertyTable, PropertyForm, CalendarView, AgentManager
13. **Charts:** BarChart, LineChart (CSS/SVG-based, no chart library)

### Step 5: Add Data Layer
1. Create static data files in `src/data/`: properties.ts, agents.ts, neighborhoods.ts, testimonials.ts, faq.ts, blog-posts.ts, market-data.ts, homepage-neighborhoods.ts, featured-properties.ts
2. Define TypeScript interfaces for each model
3. Set up Supabase types in `src/types/database.ts`
4. Create Supabase client/server/middleware in `src/lib/supabase/`
5. Create mappers (`src/lib/supabase/mappers.ts`) to convert DB rows to frontend interfaces
6. Create queries (`src/lib/supabase/queries.ts`) for all data access
7. Create unified data loader (`src/lib/data.ts`) with Supabase-first, static-fallback pattern
8. Create hooks: `useFavorites`, `useCompare`, `useRecentlyViewed`, `useSavedSearches`, `useScrolled`

### Step 6: Build Pages
1. Root layout with fonts, metadata, JSON-LD, analytics, skip link, accessibility widget
2. (site) layout with Navbar + Footer + CompareBar
3. Homepage with all sections
4. Properties layout + listing page + detail page + brochure page
5. Agents listing + profile pages
6. Neighborhoods listing + detail pages
7. Content pages: about, contact, sell, book-tour, blog, faq, buyers-guide, sellers-guide, market-insights, home-value
8. Recruitment: join, why-join, careers
9. Legal: privacy, terms, fair-housing
10. Utility: favorites, compare, brand, sitemap-page, newsletter/confirm, newsletter/unsubscribe
11. Auth: login
12. Dashboard: overview, leads, properties, agents, calendar
13. Proposal (standalone layout)
14. SEO: homes-for-sale/[neighborhood]
15. Error: not-found, global-error

### Step 7: Add API Routes
1. `/api/leads` — POST (create with validation, CAPTCHA, email, GHL sync) + GET (list)
2. `/api/leads/[id]` — GET, PUT, DELETE
3. `/api/properties` — GET (filtered list) + POST (create)
4. `/api/properties/[slug]` — GET, PUT, DELETE
5. `/api/agents` — GET + POST
6. `/api/agents/[slug]` — GET, PUT, DELETE
7. `/api/newsletter` — POST (subscribe)
8. `/api/newsletter/confirm` — GET
9. `/api/newsletter/unsubscribe` — GET
10. `/api/brochures/generate` — POST
11. `/api/upload` — POST (image upload)
12. `/api/webhooks/ghl` — POST
13. `/api/cron/daily-digest` — GET

### Step 8: Add Email Templates
Create React email components in `src/emails/`:
- lead-confirmation, agent-notification, application-confirmation
- newsletter-welcome, newsletter-confirmation
- daily-digest, monthly-newsletter

### Step 9: Configure Middleware
Set up `src/middleware.ts` for:
- Auth session management on /dashboard and /login
- Rate limiting on /api routes
- CSRF origin validation on mutating API requests

### Step 10: Configure SEO
1. Set `metadataBase` and canonical URLs in root layout
2. Add metadata exports to every page
3. Create `sitemap.ts` with all routes
4. Create `robots.ts`
5. Create `opengraph-image.tsx`, `icon.tsx`, `apple-icon.tsx`
6. Add JSON-LD components (Organization, RealEstateListing, RealEstateAgent, WebSite)

### Step 11: Deploy
1. Push to GitHub
2. Connect to Vercel
3. Add custom domain: `taurorealty.com` (with www redirect)
4. Set all environment variables in Vercel dashboard
5. Configure `vercel.json` with redirects, security headers, and cron schedule
6. Set up Supabase project with tables matching `database.ts` types
7. Configure Sentry project
8. Set up Resend domain verification for `taurorealty.com`
9. Create Mapbox account and token
10. Configure Cloudflare Turnstile site
11. Set up Google Analytics 4 property
12. Configure GoHighLevel integration (optional)

---

## APPENDIX: Key File Paths

| Purpose | Path |
|---|---|
| Root layout | `src/app/layout.tsx` |
| Design tokens | `src/app/globals.css` |
| Site config | `src/lib/site-config.ts` |
| Data loader | `src/lib/data.ts` |
| Supabase types | `src/types/database.ts` |
| DB queries | `src/lib/supabase/queries.ts` |
| DB mappers | `src/lib/supabase/mappers.ts` |
| Middleware | `src/middleware.ts` |
| Property data | `src/data/properties.ts` |
| Agent data | `src/data/agents.ts` |
| Neighborhood data | `src/data/neighborhoods.ts` |
| Testimonial data | `src/data/testimonials.ts` |
| FAQ data | `src/data/faq.ts` |
| Blog data | `src/data/blog-posts.ts` |
| Email templates | `src/emails/*.tsx` |
| JSON-LD | `src/components/JsonLd.tsx` |
| Next config | `next.config.ts` |
| Vercel config | `vercel.json` |
| Env template | `.env.example` |
