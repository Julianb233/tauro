# Phase 3: Property Pages - Research

**Researched:** 2026-03-18
**Domain:** Property browsing experience (grid, map, filters, detail pages) for premium real estate site
**Confidence:** HIGH

## Summary

Phase 3 builds the complete property browsing experience for Tauro. The existing codebase already has solid foundations: a working grid view with responsive 3-column layout, a filter bar (price, beds, baths, type, status, sort), property cards with image/price/stats, detail pages with hand-rolled gallery/lightbox/agent card/schedule form, and a MapPlaceholder component with fake pin positions. The property data model defines 6 curated San Diego listings with lat/lng coordinates. There is a working `/api/leads` endpoint.

This is an **enhancement phase**, not greenfield. The key additions are: (1) replacing MapPlaceholder with a real Mapbox GL JS map using `dark-v11` style, (2) replacing the hand-rolled lightbox with `yet-another-react-lightbox`, (3) adding missing sqft and area filters per PROP-03, (4) extending the Property interface with optional `videoTourUrl` and `virtualTourUrl` fields, (5) adding video tour and 3D walkthrough sections to the detail page, and (6) wiring the schedule form to the existing `/api/leads` endpoint (currently uses `alert()`).

**Primary recommendation:** Use `mapbox-gl` v3 directly (not react-map-gl wrapper -- only 2 simple map instances needed), `yet-another-react-lightbox` with Thumbnails/Zoom/Fullscreen/Counter plugins, iframe embeds for video and 3D tours, and sync filter state to URL search params for shareability.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| mapbox-gl | ^3.20.0 | Interactive map rendering with markers | Industry standard for web maps, built-in dark-v11 style, TypeScript in v3, free tier 50K loads/mo |
| yet-another-react-lightbox | ^3.25.0 | Image gallery lightbox | React 19 compatible, plugin system (thumbnails, zoom, fullscreen, counter), zero-dep core, actively maintained |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none needed) | - | mapbox-gl v3 migrated from Flow to TypeScript and ships its own types | - |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| mapbox-gl direct | react-map-gl v8 | Adds wrapper abstraction + extra dependency; for 2 simple map components with markers, direct mapbox-gl with useRef/useEffect is simpler and lighter |
| yet-another-react-lightbox | Hand-rolled lightbox (current) | Current lightbox (~30 lines, PropertyDetailClient L111-141) lacks keyboard nav, touch/swipe, zoom, preloading, ARIA, focus trapping |
| yet-another-react-lightbox | PhotoSwipe | PhotoSwipe is framework-agnostic (more boilerplate), YARL is React-native with plugin system |

**Installation:**
```bash
npm install mapbox-gl yet-another-react-lightbox
```

## Architecture Patterns

### Recommended Component Structure
```
src/
├── components/
│   ├── PropertyCard.tsx          # EXISTS - minor: add loading="lazy" to img
│   ├── PropertyFilters.tsx       # EXISTS - enhance: add sqft + area filters
│   ├── MapPlaceholder.tsx        # DELETE after PropertyMap replaces it
│   ├── PropertyMap.tsx           # NEW - Mapbox GL JS map for listings (client component)
│   ├── PropertyLocationMap.tsx   # NEW - Mapbox map for detail page location section
│   ├── PropertyGallery.tsx       # NEW - YARL lightbox gallery component
│   ├── VideoTourSection.tsx      # NEW - YouTube/Vimeo iframe embed with cinematic wrapper
│   └── VirtualTourSection.tsx    # NEW - Matterport/3D walkthrough iframe embed
├── data/
│   └── properties.ts             # EXISTS - extend interface, add new fields to seed data
├── hooks/
│   └── use-property-filters.ts   # NEW - URL search param filter sync hook
├── lib/
│   └── mapbox.ts                 # NEW - shared Mapbox config (token, style URL, default center)
├── app/properties/
│   ├── page.tsx                  # EXISTS - replace MapPlaceholder with PropertyMap, use URL filters
│   └── [slug]/
│       ├── page.tsx              # EXISTS - no changes needed (server component with generateStaticParams)
│       └── PropertyDetailClient.tsx  # EXISTS - refactor: use PropertyGallery, add video/tour sections, wire form to API
```

### Pattern 1: Mapbox GL JS Client Component (Direct)
**What:** Wrap mapbox-gl in a "use client" component with useRef + useEffect for DOM-dependent initialization.
**When to use:** Always for Mapbox -- it requires DOM access and cannot be server-rendered.
**Example:**
```typescript
// src/components/PropertyMap.tsx
"use client";

import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Property, formatPrice } from "@/data/properties";
import { MAPBOX_STYLE, SD_CENTER, DEFAULT_ZOOM } from "@/lib/mapbox";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface PropertyMapProps {
  properties: Property[];
  onMarkerClick?: (property: Property) => void;
}

export default function PropertyMap({ properties, onMarkerClick }: PropertyMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: MAPBOX_STYLE,
      center: SD_CENTER,
      zoom: DEFAULT_ZOOM,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Fit bounds to all properties
    if (properties.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      properties.forEach((p) => bounds.extend([p.lng, p.lat]));
      map.fitBounds(bounds, { padding: 60, maxZoom: 13 });
    }

    // Add custom price markers
    properties.forEach((property) => {
      const el = document.createElement("div");
      el.className = "mapbox-price-marker";
      el.textContent = formatPrice(property.price);
      el.addEventListener("click", () => onMarkerClick?.(property));

      new mapboxgl.Marker({ element: el })
        .setLngLat([property.lng, property.lat])
        .addTo(map);
    });

    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, [properties, onMarkerClick]);

  return <div ref={containerRef} className="h-full w-full rounded-xl" />;
}
```

### Pattern 2: YARL Lightbox Integration
**What:** Replace hand-rolled lightbox (PropertyDetailClient L111-141) with yet-another-react-lightbox.
**When to use:** Property detail image gallery.
**Example:**
```typescript
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

<Lightbox
  open={lightboxOpen}
  close={() => setLightboxOpen(false)}
  index={galleryIndex}
  slides={property.images.map((src) => ({ src }))}
  plugins={[Counter, Fullscreen, Thumbnails, Zoom]}
  on={{ view: ({ index }) => setGalleryIndex(index) }}
  styles={{ container: { backgroundColor: "rgba(15, 15, 15, 0.97)" } }}
/>
```

### Pattern 3: URL Search Params for Filters
**What:** Sync filter state to URL params for shareable/bookmarkable filtered views.
**When to use:** Property listing page -- replaces current `useState<FilterState>` on line 13 of page.tsx.
**Example:**
```typescript
// src/hooks/use-property-filters.ts
"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { FilterState } from "@/components/PropertyFilters";
import { defaultFilters } from "@/components/PropertyFilters";

export function usePropertyFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: FilterState = useMemo(() => ({
    priceMin: searchParams.get("priceMin") || "",
    priceMax: searchParams.get("priceMax") || "",
    beds: searchParams.get("beds") || "",
    baths: searchParams.get("baths") || "",
    sqftMin: searchParams.get("sqftMin") || "",
    sqftMax: searchParams.get("sqftMax") || "",
    area: searchParams.get("area") || "",
    propertyType: searchParams.get("type") || "",
    status: searchParams.get("status") || "",
    sort: searchParams.get("sort") || "price-desc",
  }), [searchParams]);

  const setFilters = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && !(key === "sort" && value === "price-desc")) {
        params.set(key, value);
      }
    });
    const qs = params.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [router, pathname]);

  return { filters, setFilters };
}
```

### Pattern 4: Video Tour Embed
**What:** YouTube/Vimeo iframe with cinematic presentation wrapper.
**When to use:** Property detail page when `property.videoTourUrl` exists.
**Example:**
```typescript
function getEmbedUrl(url: string): string {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url; // Already an embed URL
}

// Render:
<section>
  <h2 className="font-heading text-xl font-bold">Video Tour</h2>
  <div className="mt-4 aspect-video overflow-hidden rounded-xl border border-border">
    <iframe
      src={getEmbedUrl(videoTourUrl)}
      className="h-full w-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Property video tour"
    />
  </div>
</section>
```

### Pattern 5: Virtual Tour / 3D Walkthrough Embed
**What:** Matterport or generic 3D tour iframe embed.
**When to use:** Property detail page when `property.virtualTourUrl` exists.
**Example:**
```typescript
<section>
  <h2 className="font-heading text-xl font-bold">3D Virtual Tour</h2>
  <div className="mt-4 aspect-video overflow-hidden rounded-xl border border-border">
    <iframe
      src={virtualTourUrl}
      className="h-full w-full"
      allow="xr-spatial-tracking; fullscreen"
      allowFullScreen
      title="3D virtual tour"
    />
  </div>
</section>
```

### Anti-Patterns to Avoid
- **Server-rendering Mapbox:** mapbox-gl requires DOM. Always use "use client" + useEffect. Never import in a server component.
- **Creating map without ref guard:** Always check `if (mapRef.current) return` before init to prevent duplicate instances.
- **Not cleaning up map on unmount:** Always call `map.remove()` in the useEffect cleanup to prevent memory leaks.
- **Storing filters only in React state:** Current implementation uses `useState` -- filters should sync to URL search params for shareability and back-button support.
- **Rewriting PropertyDetailClient from scratch:** The existing component follows all brand conventions. Extract sub-components and enhance -- do not replace wholesale.
- **Using next/image without remotePatterns config:** Current code uses `<img>` for Unsplash URLs. Keep `<img>` with `loading="lazy"` for MVP.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image lightbox with zoom/thumbnails | Custom modal with arrows (current) | yet-another-react-lightbox | Touch gestures, keyboard nav, focus trapping, zoom, thumbnails, swipe, preloading, ARIA |
| Interactive maps | SVG grid placeholder (current MapPlaceholder) | mapbox-gl with dark-v11 style | Real geocoding, zoom/pan, proper markers, responsive, accessible |
| Map marker popups | Custom tooltip positioning | mapboxgl.Popup | Handles viewport clipping, z-index, close-on-click, positioning math |
| URL-synced filters | Manual window.history calls | Next.js useSearchParams + useRouter | Built into App Router, handles encoding, supports back/forward |
| Price formatting | Inline string templates | Existing `formatPrice`/`formatPriceFull` in properties.ts | Already built and tested |
| Video URL conversion | Complex regex parser | Simple 10-line helper function | Only YouTube and Vimeo for MVP |

**Key insight:** The existing codebase has placeholder implementations for map and lightbox. Replacing them with real libraries is lower effort and higher quality than improving the hand-rolled versions.

## Common Pitfalls

### Pitfall 1: Mapbox GL CSS Not Imported
**What goes wrong:** Map renders but controls, popups, and markers are unstyled/broken.
**Why it happens:** Forgetting to import `mapbox-gl/dist/mapbox-gl.css`.
**How to avoid:** Import CSS at top of map component: `import "mapbox-gl/dist/mapbox-gl.css";`
**Warning signs:** Navigation controls overlap, popups in wrong position, zero-height container.

### Pitfall 2: Mapbox Access Token Setup
**What goes wrong:** Map shows "unauthorized" or gray tiles.
**Why it happens:** Token missing or not using NEXT_PUBLIC_ prefix.
**How to avoid:** Use `NEXT_PUBLIC_MAPBOX_TOKEN` in `.env.local`. The `NEXT_PUBLIC_` prefix is required for client-side access in Next.js. Restrict token by URL in Mapbox dashboard. Add `.env.local` to `.gitignore`, create `.env.example`.
**Warning signs:** Console 401 errors to api.mapbox.com, gray tiles.

### Pitfall 3: Map Re-initialization on Filter/View Change
**What goes wrong:** Map flickers, resets position, memory leak from orphaned instances.
**Why it happens:** Creating new Map inside useEffect without proper ref guarding or cleanup.
**How to avoid:** Store map in useRef, guard with `if (mapRef.current) return`, clean up with `map.remove()`. When properties change, update markers separately rather than re-creating entire map.
**Warning signs:** Console warnings about map container, visible flicker on grid/map toggle.

### Pitfall 4: YARL Plugin CSS Not Imported
**What goes wrong:** Lightbox renders but thumbnails/counter are unstyled.
**Why it happens:** Plugin CSS must be imported separately from main styles.
**How to avoid:** Import all needed CSS: `styles.css`, `plugins/thumbnails.css`, `plugins/counter.css`.
**Warning signs:** Thumbnails visible but unstyled/misaligned.

### Pitfall 5: Missing sqft and Area Filters (PROP-03 Gap)
**What goes wrong:** Requirements PROP-03 specifies sqft and area filters, but current FilterState only has price, beds, baths, type, status.
**Why it happens:** Existing implementation was initial MVP scaffolding.
**How to avoid:** Add `sqftMin`, `sqftMax`, and `area` to FilterState interface and UI.
**Warning signs:** Filter bar missing required filter options per spec.

### Pitfall 6: Schedule Form Uses alert() Instead of API Call
**What goes wrong:** Form submission shows browser alert instead of submitting lead.
**Why it happens:** Placeholder code at line 333 of PropertyDetailClient.tsx: `alert("Showing request submitted!")`.
**How to avoid:** Wire to POST `/api/leads` with type "showing" and property details.
**Warning signs:** The literal `alert()` call in the current code.

### Pitfall 7: Matterport/3D Tour iframe Permissions
**What goes wrong:** 3D tour shows blank or "refused to connect".
**Why it happens:** Missing allow attributes on iframe.
**How to avoid:** Include `allow="xr-spatial-tracking; fullscreen"` and `allowFullScreen`.
**Warning signs:** Console errors about permissions policy.

### Pitfall 8: Lightbox z-index Conflict with Sticky Header
**What goes wrong:** Lightbox appears behind sticky navigation or key-details bar.
**Why it happens:** Sticky header uses z-40, key details bar uses z-40.
**How to avoid:** YARL uses portals by default which handles z-index automatically. The current hand-rolled lightbox already uses z-[100].
**Warning signs:** Header visible through lightbox overlay.

## Code Examples

### Extended Property Interface
```typescript
// Additions to src/data/properties.ts Property interface
export interface Property {
  // ... all existing fields remain unchanged ...

  // NEW fields
  videoTourUrl?: string;              // YouTube/Vimeo embed URL (PROP-08)
  virtualTourUrl?: string;            // Matterport/3D tour embed URL (PROP-09)
  area?: string;                      // "Coastal" | "Downtown" | "North County" (PROP-03 filter)
  neighborhood?: string;              // "La Jolla Village", "Mission Beach" (PROP-05)
  neighborhoodDescription?: string;   // Brief area description (PROP-05)
}
```

### Enhanced FilterState
```typescript
export interface FilterState {
  priceMin: string;
  priceMax: string;
  beds: string;
  baths: string;
  sqftMin: string;    // NEW for PROP-03
  sqftMax: string;    // NEW for PROP-03
  area: string;       // NEW for PROP-03
  propertyType: string;
  status: string;
  sort: string;
}
```

### Custom Map Marker CSS for Dark Theme
```css
/* Add to globals.css */
.mapbox-price-marker {
  background: var(--color-midnight);
  color: var(--color-gold);
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
  font-family: var(--font-dm-sans), system-ui, sans-serif;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(201, 168, 76, 0.2);
  transition: background 0.2s, color 0.2s;
}

.mapbox-price-marker:hover {
  background: var(--color-gold);
  color: var(--color-near-black);
}

/* Mapbox popup dark theme overrides */
.mapboxgl-popup-content {
  background: #1A1A1A !important;
  color: #F5F0E8 !important;
  border: 1px solid #2A2A2A;
  border-radius: 12px;
  padding: 0;
  overflow: hidden;
}

.mapboxgl-popup-tip {
  border-top-color: #1A1A1A !important;
}

.mapboxgl-popup-close-button {
  color: #A0A0A0;
  font-size: 18px;
  padding: 4px 8px;
}

.mapboxgl-popup-close-button:hover {
  color: #C9A84C;
  background: transparent;
}
```

### Shared Mapbox Config
```typescript
// src/lib/mapbox.ts
export const MAPBOX_STYLE = "mapbox://styles/mapbox/dark-v11";
export const SD_CENTER: [number, number] = [-117.16, 32.78]; // San Diego
export const DEFAULT_ZOOM = 10;
```

### Wiring Schedule Form to Leads API
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitting(true);
  try {
    const [firstName, ...rest] = formData.name.split(" ");
    const lastName = rest.join(" ") || firstName;
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "showing",
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        propertyAddress: property.address,
        propertyId: property.id,
      }),
    });
    if (res.ok) {
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
  } catch {
    setError("Something went wrong. Please try again.");
  } finally {
    setSubmitting(false);
  }
};
```

### Environment Variable Setup
```bash
# .env.local (do not commit)
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_mapbox_public_token_here

# .env.example (commit this)
NEXT_PUBLIC_MAPBOX_TOKEN=
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| mapbox-gl v2 (WebGL 1, Flow types) | mapbox-gl v3 (WebGL 2 required, native TS) | 2023 | Better performance, TypeScript native, v3 dropped WebGL 1 fallback |
| react-map-gl wrapper for all cases | Direct mapbox-gl for simple use cases | Ongoing | Wrapper adds complexity for basic marker maps; direct useRef/useEffect fine for 1-2 instances |
| mapbox dark-v10 style | mapbox dark-v11 style | 2023 | Updated cartography, better labels |
| react-image-lightbox | yet-another-react-lightbox v3 | 2023+ | react-image-lightbox abandoned; YARL handles React 18/19 with plugin system |
| next/dynamic ssr:false | "use client" + useEffect guard | Next.js 13+ App Router | "use client" is the idiomatic pattern now |

**Deprecated/outdated:**
- `react-image-lightbox` (frontend-collective): Unmaintained, does not support React 18+
- `mapbox://styles/mapbox/dark-v10`: Use `dark-v11` instead
- WebGL 1 fallback: Removed in mapbox-gl v3; all modern browsers support WebGL 2
- `next/dynamic` with `ssr: false`: Still works but "use client" + useEffect is preferred in App Router

## Existing Code Assessment

### What Works Well (Keep As-Is or Minor Enhancement)
- **PropertyCard.tsx**: Clean, well-styled, reusable. Minor: add `loading="lazy"` to img.
- **Property data model**: Good foundation with lat/lng already present. Just needs optional video/tour/area fields.
- **Detail page server component (page.tsx)**: Proper `generateStaticParams` and metadata generation. No changes needed.
- **Schedule form UI**: Already functional with form state management. Just needs API wiring.
- **Grid/map view toggle**: Already implemented with working toggle UI.

### What Needs Enhancement
- **PropertyDetailClient.tsx**: Replace hand-rolled lightbox (L111-141) with YARL. Add video tour and virtual tour sections. Replace map placeholder div (L260-273) with real Mapbox map. Wire schedule form (L328-335) to `/api/leads`.
- **PropertiesPage (page.tsx)**: Replace MapPlaceholder with real Mapbox map. Migrate filters from useState to URL search params.
- **PropertyFilters.tsx**: Add sqft range (min/max) and area dropdown filters per PROP-03.
- **properties.ts data**: Add `videoTourUrl`, `virtualTourUrl`, `area`, `neighborhood` fields to Property interface and seed data.

### What Should Be Replaced/Deleted
- **MapPlaceholder.tsx**: Delete entirely after PropertyMap.tsx is built and working.
- **Hand-rolled lightbox in PropertyDetailClient.tsx (L111-141)**: Replace with YARL component.

## Open Questions

1. **Mapbox Access Token**
   - What we know: `NEXT_PUBLIC_MAPBOX_TOKEN` env var is needed, free tier allows 50K map loads/month
   - What's unclear: Whether the team already has a Mapbox account/token
   - Recommendation: Create `.env.example` with the variable name. Build with graceful fallback (show existing MapPlaceholder style if token is missing).

2. **Video Tour URLs for Seed Data**
   - What we know: PROP-08 requires video tour support; no video URLs exist in current data
   - What's unclear: Whether to use real public YouTube luxury home tour videos or placeholder content
   - Recommendation: Add real public YouTube embed URLs to 2-3 properties for realistic demo. Render video section conditionally when `videoTourUrl` exists.

3. **3D Tour URLs for Seed Data**
   - What we know: PROP-09 requires virtual tour support; Matterport has public demo spaces
   - What's unclear: Which public demo spaces to reference
   - Recommendation: Use Matterport's public demo showcase URL for 1-2 properties. Render section conditionally.

4. **Area Values for Filter**
   - What we know: Need area filter per PROP-03; current properties span Mission Beach, La Jolla, Downtown, Hillcrest, Carlsbad
   - What's unclear: Exact area grouping taxonomy
   - Recommendation: Use "Coastal" (Mission Beach, La Jolla), "Downtown" (SD downtown, Hillcrest), "North County" (Carlsbad).

## Sources

### Primary (HIGH confidence)
- [Mapbox GL JS style example](https://docs.mapbox.com/mapbox-gl-js/example/setstyle/) - dark-v11 style URL format confirmed
- [Mapbox GL JS releases](https://github.com/mapbox/mapbox-gl-js/releases) - v3.20.0 confirmed current
- [Yet Another React Lightbox docs](https://yet-another-react-lightbox.com/documentation) - API, plugins, CSS imports, React 19 compatibility verified
- [Mapbox React tutorial](https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/) - Official integration patterns
- Existing Tauro codebase - all component files, data model, API routes, and design system inspected directly

### Secondary (MEDIUM confidence)
- [Mapbox + Next.js + shadcn/ui](https://medium.com/@sainianmol16/build-modern-maps-in-next-js-with-mapbox-and-shadcn-ui-80c276a1e9bf) - "use client" pattern confirmed by multiple sources
- [react-map-gl what's new](https://visgl.github.io/react-map-gl/docs/whats-new) - v8 architecture (separate /mapbox and /maplibre subpaths)
- [LogRocket lightbox comparison](https://blog.logrocket.com/comparing-the-top-3-react-lightbox-libraries/) - YARL recommended for React projects

### Tertiary (LOW confidence)
- Community blog posts on Next.js App Router + Mapbox patterns (multiple agreeing sources)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Libraries verified on npm/official docs, versions confirmed, React 19 compatibility confirmed
- Architecture: HIGH - Patterns derived from official docs and direct codebase inspection of all existing components
- Pitfalls: HIGH - Based on documented Mapbox SSR issues, CSS imports, and actual bugs found in current code (alert() placeholder, missing filters)
- Data model: HIGH - Existing Property interface inspected; only optional fields to add

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (stable libraries, mature domain, 30-day validity)
