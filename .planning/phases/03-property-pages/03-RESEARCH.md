# Phase 3: Property Pages - Research

**Researched:** 2026-03-18
**Domain:** Property listing pages, interactive maps, image galleries, video/3D tours
**Confidence:** HIGH

## Summary

The Tauro codebase already has substantial scaffolding for property pages. Existing components include: `PropertyCard` (grid card), `PropertyFilters` (filter bar with price/beds/baths/type/status/sort), `MapPlaceholder` (SVG mockup with "coming soon" label), and a complete `PropertyDetailClient` with hand-rolled gallery/lightbox, agent card, schedule form, features list, and similar properties. The property data model defines 6 curated San Diego listings with lat/lng coordinates in `src/data/properties.ts`. There is a working `/api/leads` endpoint.

This phase is an **enhancement phase**, not a greenfield build. The key additions are: (1) replacing MapPlaceholder with a real Mapbox GL JS map using react-map-gl, (2) replacing the hand-rolled lightbox with yet-another-react-lightbox, (3) extending the Property interface with optional videoUrl and virtualTourUrl fields, (4) adding video tour and 3D walkthrough sections to the detail page, (5) syncing filters to URL search params for shareability, and (6) wiring the schedule form to the existing `/api/leads` endpoint.

**Primary recommendation:** Enhance existing components incrementally. Use `react-map-gl` with `mapbox-gl` for the interactive map (declarative React API), `yet-another-react-lightbox` for the gallery/lightbox (replaces ~30 lines of custom code with full accessibility/touch/zoom), and simple iframes for video and 3D tour embeds.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-map-gl | ^7.x | React wrapper for Mapbox GL JS | Declarative `<Map>`, `<Marker>`, `<Popup>` components; maintained by vis.gl |
| mapbox-gl | ^3.x | Map rendering engine | Industry standard for web maps; dark-v11 style matches brand |
| yet-another-react-lightbox | ^3.x | Image gallery lightbox | React-first, plugin-based (Thumbnails, Zoom, Counter, Fullscreen), accessible |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @types/mapbox-gl | latest | TypeScript types for mapbox-gl | Always -- mapbox-gl does not ship its own types |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-map-gl | Direct mapbox-gl with useRef/useEffect | More boilerplate, manual lifecycle; react-map-gl gives declarative Marker/Popup components |
| yet-another-react-lightbox | Keep hand-rolled lightbox | Current lightbox lacks keyboard nav, swipe, zoom, thumbnails -- too much to add manually |
| yet-another-react-lightbox | PhotoSwipe | PhotoSwipe lacks built-in responsive images; React wrapper less maintained |

**Installation:**
```bash
npm install react-map-gl mapbox-gl @types/mapbox-gl yet-another-react-lightbox
```

## Architecture Patterns

### Component Structure
```
src/
├── components/
│   ├── PropertyCard.tsx          # EXISTS - no changes needed
│   ├── PropertyFilters.tsx       # EXISTS - migrate to URL search params
│   ├── MapPlaceholder.tsx        # EXISTS - DELETE after real map replaces it
│   ├── PropertyMap.tsx           # NEW - Mapbox map with markers (client component)
│   ├── ImageGallery.tsx          # NEW - YARL lightbox wrapper
│   ├── VideoTourSection.tsx      # NEW - YouTube/Vimeo iframe embed
│   ├── VirtualTourSection.tsx    # NEW - Matterport/3D iframe embed
│   └── ScheduleShowingForm.tsx   # NEW - extracted from PropertyDetailClient, wired to /api/leads
├── data/
│   └── properties.ts             # EXISTS - extend interface with videoUrl, virtualTourUrl
├── hooks/
│   └── use-property-filters.ts   # NEW - URL search param filter hook
├── app/
│   └── properties/
│       ├── page.tsx              # EXISTS - upgrade to use real map and URL filters
│       └── [slug]/
│           ├── page.tsx          # EXISTS - no changes needed
│           └── PropertyDetailClient.tsx  # EXISTS - refactor to use extracted components
```

### Pattern 1: react-map-gl with Dark Theme
**What:** Declarative map component using react-map-gl's `<Map>`, `<Marker>`, `<Popup>`
**When to use:** Both the listing page map view and property detail location map
**Example:**
```typescript
// src/components/PropertyMap.tsx
"use client";

import { useState, useCallback } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Property, formatPrice } from "@/data/properties";

// IMPORTANT: Import from "react-map-gl/mapbox" (not default import) for mapbox-gl v2+

interface PropertyMapProps {
  properties: Property[];
  onPropertyClick?: (slug: string) => void;
}

export default function PropertyMap({ properties, onPropertyClick }: PropertyMapProps) {
  const [popupInfo, setPopupInfo] = useState<Property | null>(null);

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: -117.16,
        latitude: 32.78,
        zoom: 10,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
    >
      <NavigationControl position="top-right" />
      {properties.map((p) => (
        <Marker key={p.id} longitude={p.lng} latitude={p.lat} anchor="bottom">
          <button
            onClick={() => setPopupInfo(p)}
            className="rounded-full bg-midnight px-2 py-1 text-xs font-bold text-gold shadow-md transition-colors hover:bg-gold hover:text-near-black"
          >
            {formatPrice(p.price)}
          </button>
        </Marker>
      ))}
      {popupInfo && (
        <Popup
          longitude={popupInfo.lng}
          latitude={popupInfo.lat}
          anchor="bottom"
          offset={25}
          onClose={() => setPopupInfo(null)}
          closeOnClick={false}
        >
          {/* Mini property card */}
        </Popup>
      )}
    </Map>
  );
}
```

### Pattern 2: URL Search Params for Filters
**What:** Replace useState-based filters with URL search params for shareable/bookmarkable filters
**When to use:** Property listing page -- current implementation on line 13 uses `useState<FilterState>`
**Example:**
```typescript
// src/hooks/use-property-filters.ts
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import type { FilterState } from "@/components/PropertyFilters";

export function usePropertyFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters: FilterState = useMemo(() => ({
    priceMin: searchParams.get("priceMin") || "",
    priceMax: searchParams.get("priceMax") || "",
    beds: searchParams.get("beds") || "",
    baths: searchParams.get("baths") || "",
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

### Pattern 3: Yet Another React Lightbox
**What:** Replace hand-rolled lightbox (PropertyDetailClient lines 111-141) with YARL
**When to use:** Property detail image gallery
**Example:**
```typescript
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// In component:
<Lightbox
  open={lightboxOpen}
  close={() => setLightboxOpen(false)}
  index={galleryIndex}
  slides={property.images.map((src) => ({ src }))}
  plugins={[Counter, Fullscreen, Thumbnails, Zoom]}
  carousel={{ finite: true }}
  styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
/>
```

### Pattern 4: Video Tour Embed
**What:** YouTube/Vimeo iframe with cinematic container
**When to use:** Property detail page when `property.videoUrl` is set
**Example:**
```typescript
function getEmbedUrl(url: string): string {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

// Render:
<div className="aspect-video overflow-hidden rounded-xl border border-border">
  <iframe
    src={getEmbedUrl(videoUrl)}
    className="h-full w-full"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
</div>
```

### Pattern 5: Matterport/3D Tour Embed
**What:** Simple iframe for 3D walkthrough embeds
**When to use:** Property detail page when `property.virtualTourUrl` is set
**Example:**
```typescript
<div className="aspect-video overflow-hidden rounded-xl border border-border">
  <iframe
    src={tourUrl}
    className="h-full w-full"
    allow="xr-spatial-tracking; fullscreen"
    allowFullScreen
    title="3D Virtual Tour"
  />
</div>
```

### Anti-Patterns to Avoid
- **Importing mapbox-gl at module top in server components:** Will crash SSR. Keep map in a "use client" component.
- **Using default `import Map from "react-map-gl"`:** Must use `import Map from "react-map-gl/mapbox"` for mapbox-gl v2+.
- **Rewriting PropertyDetailClient from scratch:** The existing component follows all brand conventions correctly. Extract sub-components and enhance, do not replace.
- **Hardcoding Mapbox token:** Use `NEXT_PUBLIC_MAPBOX_TOKEN` env var.
- **Using next/image without remotePatterns config:** Current code uses `<img>` for Unsplash URLs. Keep `<img>` unless adding `remotePatterns` to next.config.ts.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image lightbox with swipe/zoom | Custom modal (current ~30 lines) | yet-another-react-lightbox | Touch gestures, keyboard nav, zoom, thumbnails, accessibility, preloading |
| Interactive map with markers | SVG mockup (current MapPlaceholder) | react-map-gl + mapbox-gl | Tile rendering, pan/zoom, marker interaction, geocoding |
| URL search param sync | Manual window.history | Next.js useSearchParams + useRouter | Built into App Router, handles encoding |
| Video URL embed conversion | Complex regex parser | Simple 10-line helper function | Only YouTube and Vimeo needed for MVP |

**Key insight:** The codebase already has placeholder implementations for map and lightbox. Replacing them with libraries is faster AND better than improving the hand-rolled versions.

## Common Pitfalls

### Pitfall 1: Mapbox GL CSS Not Imported
**What goes wrong:** Map renders but controls, popups, and markers are unstyled or broken
**Why it happens:** Forgetting `import "mapbox-gl/dist/mapbox-gl.css"`
**How to avoid:** Always import CSS in the map component file
**Warning signs:** Navigation controls overlap or appear in wrong position

### Pitfall 2: Wrong react-map-gl Import Path
**What goes wrong:** Import error or runtime crash
**Why it happens:** Using `import Map from "react-map-gl"` instead of `import Map from "react-map-gl/mapbox"`
**How to avoid:** Always use the `/mapbox` subpath for mapbox-gl v2+
**Warning signs:** Module resolution errors

### Pitfall 3: Mapbox Token Not Configured
**What goes wrong:** Map shows "unauthorized" or blank
**Why it happens:** Missing NEXT_PUBLIC_MAPBOX_TOKEN in .env.local
**How to avoid:** Add .env.example with placeholder; add graceful fallback to MapPlaceholder when token is absent
**Warning signs:** Console 401 errors to api.mapbox.com

### Pitfall 4: Lightbox CSS Plugin Imports
**What goes wrong:** YARL lightbox renders but thumbnails/counter are unstyled
**Why it happens:** Plugin CSS not imported alongside main CSS
**How to avoid:** Import all 3 CSS files: `styles.css`, `plugins/counter.css`, `plugins/thumbnails.css`
**Warning signs:** Thumbnails visible but unstyled

### Pitfall 5: Filter State Only in React State
**What goes wrong:** Filters reset on navigation/refresh; filtered views not shareable
**Why it happens:** Current code uses `useState<FilterState>` (line 13 of properties/page.tsx)
**How to avoid:** Migrate to useSearchParams hook
**Warning signs:** Back button resets all filters

### Pitfall 6: Schedule Form Uses alert()
**What goes wrong:** Form submission shows browser alert instead of hitting API
**Why it happens:** Placeholder code at line 333 of PropertyDetailClient.tsx
**How to avoid:** Wire to POST `/api/leads` with proper payload
**Warning signs:** The literal `alert("Showing request submitted!")` in the codebase

### Pitfall 7: Video Iframe Missing allow Attributes
**What goes wrong:** Embedded video blocked or won't play
**Why it happens:** Missing `allow` and `allowFullScreen` on iframe
**How to avoid:** Include full allow string for media playback
**Warning signs:** Video shows "playback disabled" error

## Code Examples

### Extended Property Interface
```typescript
// Add to src/data/properties.ts
export interface Property {
  // ... all existing fields remain unchanged ...
  videoUrl?: string;        // YouTube or Vimeo URL for video tour (PROP-08)
  virtualTourUrl?: string;  // Matterport or 3D tour embed URL (PROP-09)
  neighborhood?: string;    // Area name for display/filtering
}
```

### Custom Map Price Marker CSS
```css
/* Add to globals.css for Mapbox custom markers */
.mapbox-price-marker {
  background: var(--color-midnight);
  color: var(--color-gold);
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: background 0.2s, color 0.2s;
}
.mapbox-price-marker:hover {
  background: var(--color-gold);
  color: var(--color-near-black);
}
```

### Wiring Schedule Form to Leads API
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitting(true);
  try {
    const [firstName, ...rest] = formData.name.split(" ");
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "showing",
        firstName,
        lastName: rest.join(" ") || firstName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        propertyAddress: property.address,
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
# .env.local
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_mapbox_public_token_here

# .env.example (commit this)
NEXT_PUBLIC_MAPBOX_TOKEN=
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `import Map from "react-map-gl"` | `import Map from "react-map-gl/mapbox"` | react-map-gl v7.1+ | Must use `/mapbox` subpath for mapbox-gl v2+ |
| mapbox-gl v1 (open source) | mapbox-gl v3 (token required) | 2021 | Free tier: 50K loads/month, generous for MVP |
| Custom lightbox modals | yet-another-react-lightbox v3 | 2023+ | Plugin-based, accessible, mobile-friendly |
| `next/dynamic` with `ssr: false` | `"use client"` directive | Next.js 13+ | Standard for App Router; dynamic import still valid fallback |

**Deprecated/outdated:**
- `mapbox://styles/mapbox/dark-v10` -- use `dark-v11` instead
- `react-image-lightbox` -- unmaintained, does not support React 18+
- Default react-map-gl import -- must use `/mapbox` subpath

## Open Questions

1. **Mapbox API Token Availability**
   - What we know: `NEXT_PUBLIC_MAPBOX_TOKEN` env var is required
   - What's unclear: Whether the client has a Mapbox account
   - Recommendation: Build with env var support. Show existing MapPlaceholder as fallback when token is missing. Free tier is 50K loads/month.

2. **Philadelphia vs San Diego Property Data**
   - What we know: Site is branded "Premium Philadelphia Real Estate" but seed data has San Diego properties
   - What's unclear: Whether to update seed data to Philadelphia in this phase
   - Recommendation: Update to Philadelphia addresses/neighborhoods to match brand. The data model supports this -- just update content values and lat/lng coordinates.

3. **Video/3D Tour Content for Seed Data**
   - What we know: PROP-08 and PROP-09 require video and virtual tour support
   - What's unclear: Whether real URLs exist for curated properties
   - Recommendation: Add optional videoUrl/virtualTourUrl fields. Populate 2-3 properties with public YouTube luxury home tour URLs and a public Matterport demo. Render sections conditionally.

4. **Mapbox Bundle Size Impact**
   - What we know: mapbox-gl is ~200KB gzipped
   - What's unclear: Impact on Vercel deployment
   - Recommendation: The map component is already in a "use client" file so it's code-split. Only loads when the map view is active. This is acceptable.

## Sources

### Primary (HIGH confidence)
- [react-map-gl Get Started](https://visgl.github.io/react-map-gl/docs/get-started) - Installation, import paths (`/mapbox` subpath), basic usage verified
- [yet-another-react-lightbox Documentation](https://yet-another-react-lightbox.com/documentation) - API, plugins (Counter, Fullscreen, Thumbnails, Zoom), CSS imports verified
- [Mapbox Dark Style](https://www.mapbox.com/maps/dark) - dark-v11 style URL confirmed
- [Mapbox React Tutorial](https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/) - Official integration patterns
- [Matterport Embed Docs](https://support.matterport.com/s/article/Embed-a-Matterport-3D-Model) - iframe embed pattern confirmed
- Existing codebase inspection - All existing components, data model, and API routes verified directly

### Secondary (MEDIUM confidence)
- [Next.js + Mapbox + shadcn/ui](https://medium.com/@sainianmol16/build-modern-maps-in-next-js-with-mapbox-and-shadcn-ui-80c276a1e9bf) - App Router integration patterns confirmed across multiple sources
- [LogRocket React Lightbox Comparison](https://blog.logrocket.com/comparing-the-top-3-react-lightbox-libraries/) - YARL recommended over PhotoSwipe for React

### Tertiary (LOW confidence)
- None -- all critical claims verified with primary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Libraries verified on official docs, React 19 compatible
- Architecture: HIGH - Patterns derived from existing codebase structure + official documentation
- Pitfalls: HIGH - SSR issues, CSS imports, and placeholder code (`alert()`) verified by direct codebase inspection
- Data model: HIGH - Existing Property interface inspected; only 2 optional fields to add

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (30 days -- stable technologies)
