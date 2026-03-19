# Tauro UX Audit Report

**Date:** 2026-03-18
**Deployment:** https://tauro-nq2lygl1h-ai-acrobatics.vercel.app
**Auditor:** Automated Browserbase audit

---

## Summary

Overall the site is well-built with a polished dark theme, consistent typography, and a professional luxury real estate aesthetic. Six key pages were audited. Four pages are in good shape; two pages have notable issues that should be addressed.

---

## Page-by-Page Results

### 1. Homepage (/) -- GOOD

- Hero section loads correctly with background image, search bar, and CTA
- Stats bar (500+ Properties Sold, 15 Neighborhoods, $2.1B Volume, 98% Satisfaction) renders well
- Featured Listings section shows 3 property cards with images, prices, badges
- Neighborhood explorer section with 6 neighborhood cards
- "Why Tauro" differentiators section is clean
- Client testimonials carousel present
- Buyer/Seller CTA sections render properly
- Footer is complete with all links, contact info, and social icons
- **No issues found**

### 2. Properties Page (/properties) -- GOOD

- Page header shows "Properties" with listing count ("6 listings available")
- Filter bar renders all dropdowns: Min/Max Price, Beds, Baths, Min/Max Sqft, Area, Type, Status, Sort
- Grid/Map toggle buttons present
- Property cards display correctly with images, status badges, photo counts, prices, specs
- **No issues found**

### 3. Property Detail (/properties/1820-rittenhouse-sq-philadelphia) -- HAS ISSUES

- Image gallery with thumbnails works correctly
- Property info (price, beds, baths, sqft, type) displays properly
- "About This Property" description renders well
- Property stats (Year Built, Lot Size, Price/SF, Est. Payment) present
- Features & Amenities section with Interior/Exterior/Community categories looks good
- Similar Properties section shows 3 related listings
- Agent contact card with form renders correctly

**Issues found:**

| # | Issue | Severity | Details |
|---|-------|----------|---------|
| 1 | **Rickroll placeholder video** | High | Video Tour section embeds `dQw4w9WgXcQ` (Rick Astley - Never Gonna Give You Up). This is a developer placeholder that should never ship to production. |
| 2 | **Broken Matterport 3D tour** | Medium | 3D Virtual Tour section shows "Oops, model not available" error. The placeholder Matterport model ID (`SxQL3iGyvkk`) is not a valid public model. |
| 3 | **Map unavailable** | Medium | Location section shows "Map unavailable -- configure Mapbox token" placeholder. No `NEXT_PUBLIC_MAPBOX_TOKEN` environment variable is set. |

### 4. Agents Page (/agents) -- GOOD

- Page header with "OUR TEAM" label and description
- 4 agent cards with photos, names, titles, descriptions, stats (Sold count, Volume)
- Contact info (phone, email) on each card
- "View Profile" links present
- "Interested in Joining Tauro?" CTA at bottom
- **No issues found**

### 5. Neighborhood Page (/neighborhoods/fishtown) -- GOOD

- Breadcrumb navigation (Home > Neighborhoods > Fishtown) present
- Hero section with neighborhood name and tagline
- "About the Neighborhood" section with rich descriptive text
- "Why Fishtown" selling points as a bulleted list
- "Lifestyle & Culture" section with Vibe, Dining, Transit, Parks categories
- Market Data section with stats (Median Price, Avg $/Sqft, Days on Market, Inventory Level)
- Available Listings section (shows "coming soon" since no Fishtown properties in data)
- Map placeholder ("Interactive map coming soon")
- CTA to contact an agent
- **No issues found** (map placeholder is acceptable for neighborhood pages)

### 6. Contact Page (/contact) -- GOOD

- "GET IN TOUCH" header section
- Contact info cards (Phone, Email, Office address, Hours)
- "Send a Message" form with fields: First Name, Last Name, Email, Phone, Message
- "Other Ways We Can Help" section
- Privacy policy consent note
- **No issues found**

---

## Issues Requiring Fixes

### Issue 1: Rickroll Placeholder Video (HIGH)

**File:** `/opt/agency-workspace/tauro/src/data/properties.ts`
**Line:** 94
**Current value:** `videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"`
**Fix:** Either replace with a legitimate property video tour URL, or remove the `videoUrl` field from the property data so the video section does not render. Removing is the safer option since there are no real video tours available.

The same rickroll URL also appears in agent data:
- `/opt/agency-workspace/tauro/src/data/agents.ts` lines 89, 144, 303

### Issue 2: Broken Matterport 3D Tour (MEDIUM)

**File:** `/opt/agency-workspace/tauro/src/data/properties.ts`
**Lines:** 95, 257
**Current value:** `virtualTourUrl: "https://my.matterport.com/show/?m=SxQL3iGyvkk"`
**Fix:** Either replace with a valid Matterport public demo model (e.g., `https://my.matterport.com/show/?m=SxQL3iGyvkk` appears invalid), or remove the `virtualTourUrl` field so the 3D tour section does not render. Removing is recommended until real tour data is available.

### Issue 3: Missing Mapbox Token (MEDIUM)

**File:** `/opt/agency-workspace/tauro/src/components/PropertyMap.tsx`
**Root cause:** No `NEXT_PUBLIC_MAPBOX_TOKEN` environment variable configured in Vercel
**Fix:** Add a valid Mapbox API token as an environment variable in Vercel project settings (`NEXT_PUBLIC_MAPBOX_TOKEN`). The code already handles the fallback gracefully with a "Map unavailable" message, so this is cosmetic but reduces the polish of property detail pages.

### Issue 4: Broken Hero Image on About Page (MEDIUM)

**File:** `/opt/agency-workspace/tauro/src/app/(site)/about/page.tsx`
**Line:** 62
**Current value:** `src="https://images.unsplash.com/photo-1582407947092-50cf9c1e9944?w=1600&q=80"`
**Fix:** This Unsplash image URL returns HTTP 404. Replace with a valid Philadelphia skyline image. Suggested replacement: `https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=1600&q=80` (already used elsewhere in the site for neighborhood imagery) or another Philadelphia cityscape image.

---

## Recommendations (Priority Order)

1. **Remove rickroll video URLs** from `properties.ts` and `agents.ts` -- set `videoUrl` fields to `undefined` or remove them entirely
2. **Remove broken Matterport URLs** from `properties.ts` -- set `virtualTourUrl` fields to `undefined` or remove them
3. **Fix About page hero image** -- replace the 404 Unsplash URL with a working image
4. **Configure Mapbox token** in Vercel environment variables (or accept the graceful fallback)

---

## What Looks Good

- Dark luxury aesthetic is cohesive and professional across all pages
- Typography hierarchy (serif headings, sans-serif body) is consistent
- Navigation is clear with all key pages accessible
- Property cards are well-designed with status badges, photo counts, and key details
- Agent profiles are comprehensive with stats and contact info
- Neighborhood pages have rich content (description, selling points, lifestyle, market data)
- Contact form is clean and well-organized
- Footer is thorough with quick links, neighborhoods, and contact info
- Gold accent color is used effectively for CTAs and highlights
- Overall responsive layout appears correct at desktop viewport
