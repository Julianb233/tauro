# Phase 3: Property Pages - Research

**Researched:** 2026-03-18
**Domain:** Real estate property browsing — grid, map, filters, gallery, detail pages
**Confidence:** HIGH

## Summary

Phase 3 enhances the existing property browsing experience with an interactive Mapbox map, a proper image lightbox, video/3D tour embeds, and wired-up lead capture forms. The codebase already has substantial scaffolding: `PropertyCard`, `PropertyFilters`, `MapPlaceholder`, the listing page at `/properties`, the detail page at `/properties/[slug]`, and a working `/api/leads` endpoint. The work is primarily upgrading placeholders to production components.

The standard approach is: use `mapbox-gl` v3.x directly (no wrapper library needed for this scope), `yet-another-react-lightbox` for the gallery/lightbox, native iframe embeds for video tours and Matterport 3D walkthroughs, and URL search params for shareable filter state. The existing schedule form just needs to wire into the existing `/api/leads` POST endpoint.

**Primary recommendation:** Replace the MapPlaceholder with a real Mapbox GL JS client component using `dark-v11` style, upgrade the hand-rolled lightbox to yet-another-react-lightbox with Thumbnails/Counter/Zoom/Fullscreen plugins, add video tour and 3D walkthrough sections with styled iframe containers, wire the schedule showing form to the existing leads API, and sync filter state to URL search params.

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| mapbox-gl | 3.20.0 | Interactive map rendering | Industry standard for web maps, dark style built-in, free tier generous (50K loads/mo) |
| yet-another-react-lightbox | 3.29.1 | Image gallery lightbox | React 19 compatible, plugin system, TypeScript built-in, actively maintained |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @types/mapbox-gl | latest | TypeScript types for mapbox-gl | Always — mapbox-gl does not ship its own types |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| mapbox-gl direct | react-map-gl | Adds abstraction overhead; direct mapbox-gl is simpler for this scope (one map on listing page, one on detail page) |
| yet-another-react-lightbox | Hand-rolled lightbox (current) | Current implementation lacks keyboard nav, touch/swipe, zoom, preloading — library gives all for free |
| yet-another-react-lightbox | PhotoSwipe | PhotoSwipe is heavier and React wrapper is less maintained |

**Installation:**
```bash
npm install mapbox-gl yet-another-react-lightbox
npm install -D @types/mapbox-gl
```

## Architecture Patterns

### Recommended Component Structure
```
src/
├── components/
│   ├── PropertyCard.tsx          # EXISTS - no changes needed
│   ├── PropertyFilters.tsx       # EXISTS - add sqft/area filters, URL sync
│   ├── MapPlaceholder.tsx        # DELETE after MapView is ready
│   ├── MapView.tsx               # NEW - Mapbox GL JS map (client component)
│   ├── MapMarker.tsx             # NEW - Custom price marker popup
│   ├── ImageGallery.tsx          # NEW - Gallery with lightbox using yet-another-react-lightbox
│   ├── VideoTourSection.tsx      # NEW - YouTube/Vimeo iframe embed
│   ├── VirtualTourSection.tsx    # NEW - Matterport/3D iframe embed
│   ├── ScheduleShowingForm.tsx   # NEW - Extract from PropertyDetailClient, wire to /api/leads
│   └── ContactAgentCard.tsx      # NEW - Extract agent card from PropertyDetailClient
├── data/
│   └── properties.ts             # EXISTS - extend Property interface with new fields
├── app/
│   └── properties/
│       ├── page.tsx              # EXISTS - upgrade to use real MapView
│       └── [slug]/
│           ├── page.tsx          # EXISTS - no changes needed
│           └── PropertyDetailClient.tsx  # EXISTS - refactor to use new components
```

### Pattern 1: Mapbox GL JS Client Component
**What:** Wrap mapbox-gl in a "use client" component with useRef + useEffect
**When to use:** Always for Mapbox — it requires DOM access and cannot SSR

```typescript
// src/components/MapView.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Property, formatPrice } from "@/data/properties";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface MapViewProps {
  properties: Property[];
  onMarkerClick?: (property: Property) => void;
}

export default function MapView({ properties, onMarkerClick }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-117.16, 32.72], // San Diego center
      zoom: 10,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add markers for each property
    properties.forEach((property) => {
      const el = document.createElement("div");
      el.className = "mapbox-price-marker";
      el.textContent = formatPrice(property.price);

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([property.lng, property.lat])
        .addTo(map.current!);

      el.addEventListener("click", () => onMarkerClick?.(property));
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [properties, onMarkerClick]);

  return <div ref={mapContainer} className="h-full w-full" />;
}
```

### Pattern 2: Filter State in URL Search Params
**What:** Sync filter state to URL params for shareable/bookmarkable filter URLs
**When to use:** Property listing page — users expect to share filtered views

```typescript
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

function useFilterParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const filters = {
    priceMin: searchParams.get("priceMin") || "",
    priceMax: searchParams.get("priceMax") || "",
    beds: searchParams.get("beds") || "",
    baths: searchParams.get("baths") || "",
    propertyType: searchParams.get("type") || "",
    status: searchParams.get("status") || "",
    sort: searchParams.get("sort") || "price-desc",
  };

  const setFilters = useCallback((newFilters: typeof filters) => {
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== "price-desc") params.set(key, value);
    });
    router.replace(`/properties?${params.toString()}`, { scroll: false });
  }, [router]);

  return { filters, setFilters };
}
```

### Pattern 3: Yet Another React Lightbox Integration
**What:** Replace the hand-rolled lightbox with the library version
**When to use:** Property detail image gallery

```typescript
"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails/thumbnails.css";

interface ImageGalleryProps {
  images: string[];
  address: string;
}

export default function ImageGallery({ images, address }: ImageGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = images.map((src) => ({ src }));

  return (
    <>
      {/* Thumbnail grid that opens lightbox on click */}
      <div className="grid grid-cols-4 gap-2">
        {images.slice(0, 4).map((img, i) => (
          <button
            key={i}
            onClick={() => { setIndex(i); setOpen(true); }}
            className="relative aspect-[4/3] overflow-hidden rounded-lg"
          >
            <img src={img} alt={`${address} - ${i + 1}`} className="h-full w-full object-cover" />
            {i === 3 && images.length > 4 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-bold">
                +{images.length - 4} more
              </div>
            )}
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Counter, Fullscreen, Thumbnails, Zoom]}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
      />
    </>
  );
}
```

### Pattern 4: Video Tour Embed
**What:** YouTube/Vimeo iframe with cinematic presentation wrapper
**When to use:** Property detail page when property has a videoUrl field

```typescript
interface VideoTourSectionProps {
  videoUrl: string; // YouTube or Vimeo URL
  title?: string;
}

export default function VideoTourSection({ videoUrl, title }: VideoTourSectionProps) {
  // Convert YouTube watch URL to embed URL
  const embedUrl = videoUrl.includes("youtube.com/watch")
    ? videoUrl.replace("watch?v=", "embed/")
    : videoUrl.includes("youtu.be/")
    ? `https://www.youtube.com/embed/${videoUrl.split("youtu.be/")[1]}`
    : videoUrl; // Vimeo or already embed format

  return (
    <div>
      <h2 className="font-heading text-xl font-bold">{title || "Video Tour"}</h2>
      <div className="mt-4 relative aspect-video overflow-hidden rounded-xl border border-border">
        <iframe
          src={embedUrl}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Property video tour"
        />
      </div>
    </div>
  );
}
```

### Pattern 5: Matterport 3D Embed
**What:** Matterport/generic 3D tour iframe embed
**When to use:** Property detail page when property has a virtualTourUrl field

```typescript
interface VirtualTourSectionProps {
  tourUrl: string; // e.g., https://my.matterport.com/show/?m=ABC123
}

export default function VirtualTourSection({ tourUrl }: VirtualTourSectionProps) {
  return (
    <div>
      <h2 className="font-heading text-xl font-bold">3D Virtual Tour</h2>
      <div className="mt-4 relative aspect-video overflow-hidden rounded-xl border border-border">
        <iframe
          src={tourUrl}
          className="absolute inset-0 h-full w-full"
          allow="xr-spatial-tracking; fullscreen"
          allowFullScreen
          title="3D virtual tour"
        />
      </div>
    </div>
  );
}
```

### Anti-Patterns to Avoid
- **Server-rendering Mapbox:** mapbox-gl requires DOM. Always use "use client" + useEffect. Never try to SSR it.
- **Initializing map on every render:** Use refs to hold the map instance, guard with `if (map.current) return`.
- **Storing filter state only in React state:** Filters should be in URL search params so links are shareable. The current implementation uses `useState` only.
- **Building a custom lightbox:** The existing hand-rolled lightbox in PropertyDetailClient.tsx is already ~30 lines and missing keyboard nav, swipe, zoom, preloading, and accessibility.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image lightbox | Custom modal with arrows (current) | yet-another-react-lightbox | Missing keyboard nav, touch/swipe, zoom, preloading, ARIA labels, animation |
| Interactive map | SVG/canvas map mockup (current MapPlaceholder) | mapbox-gl with dark-v11 style | Real geocoding, zoom, pan, proper markers, satellite toggle |
| Map markers | Custom DOM positioning | mapboxgl.Marker with custom elements | Handles projection math, viewport clipping, z-ordering |
| URL search param sync | Manual window.history calls | Next.js useSearchParams + useRouter | Handles encoding, integrates with App Router, supports back/forward |
| Video URL parsing | Regex-based URL converter | Simple conditional (YouTube vs Vimeo vs direct) | Only 2-3 providers to handle, keep it simple |

**Key insight:** The current codebase already has placeholder implementations for map and lightbox. Replacing them with real libraries is lower effort than improving the hand-rolled versions.

## Common Pitfalls

### Pitfall 1: Mapbox GL CSS Not Imported
**What goes wrong:** Map renders but controls, popups, and markers are unstyled/broken
**Why it happens:** Forgetting to import `mapbox-gl/dist/mapbox-gl.css`
**How to avoid:** Import CSS at the top of the MapView component
**Warning signs:** Navigation controls overlap, popups appear in wrong position

### Pitfall 2: Mapbox Access Token Exposed in Client Bundle
**What goes wrong:** Token visible in browser source, potential abuse
**Why it happens:** mapbox-gl requires the token client-side
**How to avoid:** Use `NEXT_PUBLIC_MAPBOX_TOKEN` env var (it MUST be public for client-side maps). Restrict the token by URL in Mapbox account settings. Add to `.env.local` and `.env.example`.
**Warning signs:** Token hardcoded in component files

### Pitfall 3: Map Re-initialization on React Re-render
**What goes wrong:** Map flickers, resets position, memory leak from orphaned instances
**Why it happens:** Creating new Map inside useEffect without cleanup or guard
**How to avoid:** Store map in useRef, check `if (map.current) return` before init, clean up with `map.current.remove()` in cleanup function
**Warning signs:** Console warnings about map container already initialized

### Pitfall 4: Lightbox CSS Conflicts with Dark Theme
**What goes wrong:** Lightbox background is white, controls invisible on dark site
**Why it happens:** yet-another-react-lightbox has default light styles
**How to avoid:** Override `styles.container` prop with dark background: `{ backgroundColor: "rgba(0, 0, 0, 0.95)" }`
**Warning signs:** Bright flash when opening lightbox on dark-themed site

### Pitfall 5: Filter State Lost on Navigation
**What goes wrong:** User applies filters, clicks a property, presses back, filters reset
**Why it happens:** Filters stored in React state (current implementation) not URL params
**How to avoid:** Sync filters to URL search params using useSearchParams
**Warning signs:** Back button resets all filters

### Pitfall 6: Matterport iframe Blocked
**What goes wrong:** 3D tour shows blank or "refused to connect"
**Why it happens:** Missing allow attributes on iframe
**How to avoid:** Include `allow="xr-spatial-tracking; fullscreen"` and `allowFullScreen` on the iframe
**Warning signs:** Console errors about permissions policy

### Pitfall 7: Schedule Form Not Wired to API
**What goes wrong:** Current form shows `alert()` on submit instead of hitting the API
**Why it happens:** Form was scaffolded as placeholder with `alert("Showing request submitted!")`
**How to avoid:** Wire form to POST `/api/leads` with type "showing" and include propertyAddress/propertyId
**Warning signs:** The `alert()` call on line 333 of PropertyDetailClient.tsx

## Code Examples

### Extending the Property Interface
```typescript
// Add to src/data/properties.ts
export interface Property {
  // ... existing fields ...
  videoUrl?: string;        // YouTube or Vimeo URL for video tour
  virtualTourUrl?: string;  // Matterport or 3D tour embed URL
  neighborhood?: string;    // Area/neighborhood name for filtering
}
```

### Wiring Schedule Form to Leads API
```typescript
// In ScheduleShowingForm.tsx
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

### Custom Mapbox Price Marker Styles
```css
/* Add to globals.css */
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

### Mapbox Dark Style Configuration
```typescript
// Use dark-v11 for the luxury dark theme
const MAPBOX_STYLE = "mapbox://styles/mapbox/dark-v11";

// San Diego area center coordinates
const SD_CENTER: [number, number] = [-117.16, 32.78];
const SD_ZOOM = 10;

// Fit bounds to show all properties
const bounds = new mapboxgl.LngLatBounds();
properties.forEach((p) => bounds.extend([p.lng, p.lat]));
map.current.fitBounds(bounds, { padding: 60, maxZoom: 13 });
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| mapbox-gl v2 (open source) | mapbox-gl v3 (proprietary, free tier) | 2023 | v3 has better perf, new Standard style; dark-v11 is the classic dark |
| react-map-gl wrapper | Direct mapbox-gl for simple use cases | Ongoing | Wrapper adds complexity for basic marker maps; direct is fine for 1-2 maps |
| Custom lightbox modals | yet-another-react-lightbox | 2023+ | Library handles all edge cases; custom modals miss accessibility |
| next/dynamic ssr:false | "use client" + useEffect guard | Next.js 13+ App Router | "use client" is the standard pattern now; dynamic import still works but less idiomatic |

**Deprecated/outdated:**
- `mapbox://styles/mapbox/dark-v10` — Use `dark-v11` instead
- `react-image-lightbox` (frontend-collective) — Unmaintained, does not support React 18+
- `next/dynamic` with `ssr: false` for client-only components — Still works but `"use client"` + useEffect is preferred in App Router

## Open Questions

1. **Mapbox Access Token**
   - What we know: A `NEXT_PUBLIC_MAPBOX_TOKEN` environment variable is needed
   - What's unclear: Whether the team already has a Mapbox account/token
   - Recommendation: Add to `.env.local` and `.env.example`. Use URL-restricted token. Free tier allows 50K map loads/month.

2. **Number of Seed Properties**
   - What we know: Currently 6 properties in seed data, all in San Diego area
   - What's unclear: Whether more should be added for a realistic grid/map experience
   - Recommendation: 6 is fine for MVP; could add 3-4 more for better filter demonstration

3. **Video/3D Tour URLs for Seed Data**
   - What we know: No video or virtual tour URLs exist in current seed data
   - What's unclear: Whether to use real public YouTube/Matterport examples or placeholder URLs
   - Recommendation: Use real public luxury home tour YouTube videos and a public Matterport demo space for realistic MVP

## Sources

### Primary (HIGH confidence)
- [Mapbox GL JS npm](https://www.npmjs.com/package/mapbox-gl) — v3.20.0 confirmed
- [Yet Another React Lightbox](https://yet-another-react-lightbox.com/) — v3.29.1, React 19 compatible, plugin list verified
- [Yet Another React Lightbox npm](https://www.npmjs.com/package/yet-another-react-lightbox) — Installation and usage verified
- [Mapbox Styles Cheatsheet](https://www.lostcreekdesigns.co/writing/mapbox-styles-cheatsheet) — dark-v10/v11 style URLs verified
- [Mapbox React Tutorial](https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/) — Official integration pattern
- [Matterport Embed Docs](https://support.matterport.com/hc/en-us/articles/115004549347-Embed-a-Matterport-3D-Model-) — iframe embed pattern confirmed

### Secondary (MEDIUM confidence)
- [Mapbox + Next.js + shadcn/ui Medium article](https://medium.com/@sainianmol16/build-modern-maps-in-next-js-with-mapbox-and-shadcn-ui-80c276a1e9bf) — "use client" pattern for App Router confirmed by multiple sources
- [Mapbox Standard Style Docs](https://docs.mapbox.com/map-styles/standard/guides/) — Standard style is the new default but classic styles (dark-v11) still fully supported

### Tertiary (LOW confidence)
- Mapbox dark-v11 vs dark-v10 version numbering — dark-v11 is the latest classic dark, confirmed by multiple cheatsheets but not from official changelog

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Libraries verified on npm, versions confirmed, React 19 compatibility confirmed
- Architecture: HIGH — Patterns derived from official docs and existing codebase structure
- Pitfalls: HIGH — Based on known issues with mapbox-gl in React (SSR, CSS, re-init) and actual bugs found in current code (alert() instead of API call)
- Data model: HIGH — Existing Property interface inspected; minimal additions needed

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (stable libraries, 30-day validity)
