---
phase: 09-seo-performance-deploy
verified: 2026-03-18T21:00:00Z
status: gaps_found
score: 4/6 must-haves verified
gaps:
  - truth: "All images use Next/Image for optimization"
    status: failed
    reason: "11 raw <img> tags across 10 files; only homepage uses next/image"
    artifacts:
      - path: "src/components/PropertyCard.tsx"
        issue: "Uses raw <img> instead of next/image"
      - path: "src/components/AgentCard.tsx"
        issue: "Uses raw <img> instead of next/image"
      - path: "src/components/ImageGallery.tsx"
        issue: "Uses raw <img> instead of next/image (2 instances)"
      - path: "src/app/(site)/neighborhoods/[slug]/page.tsx"
        issue: "Uses raw <img> for hero"
      - path: "src/app/(site)/neighborhoods/page.tsx"
        issue: "Uses raw <img> for neighborhood cards"
      - path: "src/app/(site)/sell/page.tsx"
        issue: "Uses raw <img>"
      - path: "src/app/(site)/book-tour/page.tsx"
        issue: "Uses raw <img>"
      - path: "src/app/(site)/home-value/page.tsx"
        issue: "Uses raw <img>"
      - path: "src/app/(site)/agents/[slug]/AgentProfileClient.tsx"
        issue: "Uses raw <img>"
      - path: "src/app/properties/[slug]/PropertyDetailClient.tsx"
        issue: "Uses raw <img>"
    missing:
      - "Replace all <img> tags with next/image Image component"
      - "Add width/height or fill prop to each Image"
      - "Remove eslint-disable @next/next/no-img-element comments"
  - truth: "Vercel deployment configuration exists"
    status: partial
    reason: "Project is linked to Vercel (.vercel/ directory exists) but no vercel.json with production config"
    artifacts:
      - path: "vercel.json"
        issue: "File does not exist — no headers, redirects, or region config"
    missing:
      - "vercel.json with production configuration (optional but recommended)"
---

# Phase 9: SEO, Performance & Deploy Verification Report

**Phase Goal:** Production-ready site with optimized SEO, fast load times, and Vercel deployment
**Verified:** 2026-03-18
**Status:** gaps_found
**Re-verification:** No -- initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Every page has unique title tag and meta description | VERIFIED | 18 metadata exports found across all routes. Homepage inherits root layout default. All other pages have explicit title + description in layout.tsx or page.tsx. Dynamic pages (properties, neighborhoods, agents) use generateMetadata. |
| 2 | Property pages include JSON-LD RealEstateListing structured data | VERIFIED | `src/components/JsonLd.tsx` exports `RealEstateListingJsonLd` with @type RealEstateListing, full schema including address, geo, floorSize, rooms, yearBuilt, offers. Used in `properties/[slug]/page.tsx`. OrganizationJsonLd also rendered in root layout. |
| 3 | Area and property pages are statically generated (SSG) | VERIFIED | `generateStaticParams` present in: `properties/[slug]/page.tsx`, `neighborhoods/[slug]/page.tsx`, `agents/[slug]/page.tsx`. Build output confirms SSG markers for all three dynamic routes. |
| 4 | Site builds successfully (deploy readiness) | VERIFIED | `npx next build` completes with 0 errors. All routes rendered. Static pages marked with circle, SSG pages marked with filled circle, only `/api/leads` is dynamic. |
| 5 | All images use Next/Image for optimization (SEO-04) | FAILED | Only 1 file (`src/app/(site)/page.tsx`) imports `next/image`. 11 raw `<img>` tags across 10 files, all with `eslint-disable @next/next/no-img-element` comments suppressing the lint warning. |
| 6 | Vercel deployment configuration exists | PARTIAL | `.vercel/` directory exists (project linked). `.vercelignore` exists. But no `vercel.json` for production headers, rewrites, or region config. Deployment likely works via Vercel auto-detection but lacks explicit production configuration. |

**Score:** 4/6 truths verified

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/app/sitemap.ts` | Dynamic XML sitemap | VERIFIED | 42 lines, covers static pages + properties + neighborhoods + agents with priorities |
| `src/app/robots.ts` | Robots.txt configuration | VERIFIED | 14 lines, allows all on `/`, disallows `/api/` and `/proposal/`, points to sitemap |
| `src/components/JsonLd.tsx` | JSON-LD structured data components | VERIFIED | 79 lines, exports OrganizationJsonLd and RealEstateListingJsonLd with full schema.org markup |
| `src/app/layout.tsx` | Root metadata with title template | VERIFIED | Title template `%s | Tauro`, default title, description, keywords |
| `src/app/properties/[slug]/page.tsx` | Server component with SSG + metadata + JSON-LD | VERIFIED | generateStaticParams, generateMetadata, RealEstateListingJsonLd all present and wired |
| `src/app/(site)/neighborhoods/[slug]/page.tsx` | SSG + dynamic metadata | VERIFIED | generateStaticParams and generateMetadata with neighborhood-specific titles/descriptions |
| `src/app/(site)/agents/[slug]/page.tsx` | SSG + dynamic metadata | VERIFIED | generateStaticParams and generateMetadata with agent-specific titles/descriptions |
| `vercel.json` | Deployment config | MISSING | Not created |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `properties/[slug]/page.tsx` | `JsonLd.tsx` | import RealEstateListingJsonLd | WIRED | Component imported and rendered with property data |
| `layout.tsx` (root) | `JsonLd.tsx` | import OrganizationJsonLd | WIRED | Organization JSON-LD rendered site-wide |
| `sitemap.ts` | `@/data/properties` | import | WIRED | All property slugs included in sitemap |
| `sitemap.ts` | `@/data/neighborhoods` | import | WIRED | All neighborhood slugs included in sitemap |
| `sitemap.ts` | `@/data/agents` | import | WIRED | All agent slugs included in sitemap |

### Requirements Coverage

| Requirement | Status | Notes |
|-------------|--------|-------|
| SEO-01: Unique title + meta per page | SATISFIED | 18 metadata exports, all unique |
| SEO-02: JSON-LD structured data | SATISFIED | RealEstateListing schema on property pages |
| SEO-03: SSG for area + property pages | SATISFIED | generateStaticParams on all 3 dynamic routes |
| SEO-04: Image optimization via Next/Image | BLOCKED | 11 raw img tags, only 1 file uses next/image |
| SEO-05: Core Web Vitals targets | NEEDS HUMAN | SSG setup aids LCP; raw img tags hurt CLS; actual metrics need runtime measurement |
| DEPLOY-01: Vercel deployment | PARTIAL | Project linked, builds clean, but no vercel.json |
| DEPLOY-02: Preview deployments | NEEDS HUMAN | Requires testing actual Vercel integration |

### Anti-Patterns Found

| File | Pattern | Severity | Impact |
|------|---------|----------|--------|
| 10 files | `eslint-disable @next/next/no-img-element` (11 instances) | Warning | Suppresses Next.js image optimization linting, indicates intentional bypass of Next/Image |
| `src/components/JsonLd.tsx` | URL mismatch: uses `tauro.com` but sitemap/robots use `tauro.realty` | Warning | JSON-LD URLs point to wrong domain |
| `src/app/(site)/neighborhoods/[slug]/page.tsx` line 283 | "Interactive map coming soon" placeholder | Info | Map placeholder, not blocking SEO goal |

### Human Verification Required

### 1. Core Web Vitals

**Test:** Run Lighthouse on deployed site for homepage, a property page, and a neighborhood page
**Expected:** LCP < 2.5s, CLS < 0.1
**Why human:** Requires runtime measurement in browser, cannot verify from code alone

### 2. Vercel Preview Deployments

**Test:** Push a branch and verify Vercel creates a preview URL
**Expected:** Preview deployment builds and is accessible
**Why human:** Requires actual Vercel platform interaction

### 3. Structured Data Validation

**Test:** Run property page through Google Rich Results Test
**Expected:** RealEstateListing schema validates without errors
**Why human:** Schema validation requires external tool

### Gaps Summary

Two gaps prevent full goal achievement:

1. **Image optimization (SEO-04):** Nearly all images in the site use raw `<img>` tags instead of `next/image`. This was likely a deliberate shortcut since images are external (Unsplash URLs) and `next/image` requires explicit width/height or `fill` mode. However, this means no automatic lazy loading, no responsive srcset, no format conversion (WebP/AVIF), and potential CLS issues from unsized images. The `images.remotePatterns` in `next.config.ts` already allows Unsplash, so the infrastructure for Next/Image is ready but unused.

2. **Domain mismatch in JSON-LD:** The `JsonLd.tsx` component uses `tauro.com` for URLs while `sitemap.ts` and `robots.ts` use `tauro.realty`. This inconsistency would confuse search engines about canonical URLs.

The core SEO infrastructure (metadata, SSG, sitemap, robots, JSON-LD) is solid and well-implemented. The build succeeds cleanly and the site is deploy-ready from a build perspective.

---

_Verified: 2026-03-18_
_Verifier: Claude (gsd-verifier)_
