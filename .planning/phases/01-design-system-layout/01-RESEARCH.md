# Phase 1: Design System & Layout Shell - Research

**Researched:** 2026-03-18
**Domain:** CSS design system, Next.js layout, micro-interactions
**Confidence:** HIGH

## Summary

Phase 1 is largely built. The codebase already has a working dark-mode-first design system with CSS variables, a fixed navbar, a 4-column footer, a page shell layout via `(site)/layout.tsx`, and shadcn/ui button component. The work remaining is gap-filling: correcting brand colors, swapping body/CTA fonts, upgrading the mobile menu to a full-screen overlay, adding scroll transparency to the header, implementing micro-interactions (shimmer, tilt, wipes), and adding social icons + map placeholder to the footer.

The existing architecture is sound. Tailwind CSS 4's `@theme inline` block in `globals.css` is the correct place for all design tokens. The `next/font/google` setup in `layout.tsx` is the correct pattern for loading fonts. All changes are additive or corrective -- no structural rewrites needed.

**Primary recommendation:** Update color tokens, swap fonts, then layer micro-interaction CSS utilities on top of the existing system. Keep all animations pure CSS (no JS animation libraries needed).

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Next.js | 16.1.7 | App Router, SSR | Installed |
| React | 19.2.3 | UI framework | Installed |
| Tailwind CSS | 4.2.2 | Utility-first CSS | Installed |
| shadcn/ui | 4.0.8 | Component primitives | Installed |
| lucide-react | 0.577.0 | Icons (including social) | Installed |
| tw-animate-css | 1.4.0 | Animation utilities | Installed |
| next/font/google | (built-in) | Font optimization | Used |

### No New Dependencies Needed

All Phase 1 gaps can be resolved with what is already installed:
- **Fonts**: `next/font/google` already supports DM_Sans and Montserrat
- **Social icons**: `lucide-react` has Instagram, Facebook, Linkedin icons
- **Animations**: Pure CSS `@keyframes` + Tailwind `@utility` directives
- **Scroll detection**: React `useState` + `useEffect` (no library needed)

## Architecture Patterns

### Current Project Structure (Relevant Files)
```
src/
├── app/
│   ├── globals.css          # Design tokens (UPDATE colors + font vars)
│   ├── layout.tsx           # Root layout (UPDATE font imports)
│   └── (site)/
│       └── layout.tsx       # Page shell with Navbar + Footer (DONE)
├── components/
│   ├── navbar.tsx           # Fixed header (UPDATE: scroll + mobile overlay)
│   ├── footer.tsx           # Site footer (UPDATE: social + map)
│   └── ui/
│       └── button.tsx       # shadcn button (DONE)
└── lib/
    └── utils.ts             # cn() helper (DONE)
```

### Pattern 1: Tailwind CSS 4 Design Tokens via @theme inline
**What:** All brand colors, fonts, and spacing defined as CSS variables in `globals.css` using `@theme inline {}`
**Why this pattern:** Tailwind CSS 4 reads `@theme` blocks to generate utility classes. `@theme inline` means the variables are inlined and available as Tailwind utilities (e.g., `bg-midnight`, `text-gold`).
**Current state:** Already in use. Just needs color value corrections.

### Pattern 2: next/font/google with CSS Variables
**What:** Each Google Font loaded in `layout.tsx` with a `variable` prop, applied as class on `<html>`, then referenced in CSS via `var(--font-xxx)`.
**Current state:** Playfair Display + Inter loaded. Need to add DM Sans + Montserrat, remove Inter.

### Pattern 3: Route Group Layout for Page Shell
**What:** `(site)/layout.tsx` wraps pages with Navbar + Footer. Proposal pages use a separate layout without the main nav.
**Current state:** Already implemented correctly.

### Anti-Patterns to Avoid
- **Do NOT use Framer Motion or GSAP for Phase 1 micro-interactions.** All effects (shimmer, tilt, wipes) are achievable with pure CSS. Adding a JS animation library adds bundle weight for no benefit at this stage.
- **Do NOT create a separate ThemeProvider or context.** The dark class is hardcoded on `<html>` and CSS variables handle theming. No runtime theme switching is needed.
- **Do NOT use JavaScript for the scroll listener without cleanup.** Always return a cleanup function from useEffect to remove the scroll listener.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Icon library | Custom SVG social icons | `lucide-react` (Instagram, Facebook, Linkedin) | Already installed, tree-shakeable, consistent style |
| Font loading | Manual `<link>` tags | `next/font/google` | Automatic optimization, no layout shift, subset support |
| CSS class merging | String concatenation | `cn()` from `@/lib/utils` (clsx + tailwind-merge) | Handles Tailwind class conflicts correctly |
| Scroll detection | IntersectionObserver for header | Simple `window.scrollY` check in useEffect | Header scroll detection is trivial; IO is overkill |
| Animation library | Framer Motion for shimmer/tilt | Pure CSS @keyframes + transforms | No JS needed, better performance, smaller bundle |

## Common Pitfalls

### Pitfall 1: Color Token Mismatch Between Requirements and Code
**What goes wrong:** Requirements specify one palette (#1A1A1A, #C9A84C, #8B0000, #F5F0E8) but code uses a different palette (#1A1A2E, #C9A96E, #E94560, #0F0F1A). If not reconciled, designers and developers will reference different colors.
**How to avoid:** Make a deliberate decision. The codebase palette is more refined for dark-mode UI (the blues in #1A1A2E and #0F0F1A work better than pure black #1A1A1A). Recommendation: **keep the existing codebase colors** but add the requirement colors as aliases if needed. The gold (#C9A96E) is warmer than requirement gold (#C9A84C) -- either works, but be consistent.
**Decision needed:** Which palette wins. Document in plan.

### Pitfall 2: Font Loading Causes Layout Shift
**What goes wrong:** Adding DM Sans and Montserrat means 4 fonts loading. Each can cause FOUT/CLS.
**How to avoid:** Use `display: "swap"` (already done for existing fonts). Keep `subsets: ["latin"]` to minimize download. Only load the weights you actually use (400, 500, 600, 700 -- not all 9 weights).

### Pitfall 3: Scroll Listener Performance
**What goes wrong:** Scroll events fire at 60fps. Setting state on every scroll event causes unnecessary re-renders.
**How to avoid:** Use a simple boolean check -- only call setState when crossing the threshold (scrolled vs not scrolled). The conditional prevents re-renders when already in the correct state.

### Pitfall 4: Mobile Menu Overlay Z-Index Wars
**What goes wrong:** Full-screen overlay needs to be above everything including the fixed header.
**How to avoid:** Use `fixed inset-0 z-[60]` for the overlay (navbar is `z-50`). Alternatively, render the overlay as a sibling to the header both at `z-50` but with the overlay covering the full viewport.

### Pitfall 5: CSS Animations and prefers-reduced-motion
**What goes wrong:** Shimmer, tilt, and wipe animations can cause motion sickness for some users.
**How to avoid:** Wrap all animations in `@media (prefers-reduced-motion: no-preference)` or use Tailwind's `motion-safe:` variant. The `tw-animate-css` library already respects this, but custom animations need manual handling.

### Pitfall 6: Tailwind CSS 4 @theme inline vs @theme
**What goes wrong:** Using `@theme` (without `inline`) generates a separate CSS file for variables. Using `@theme inline` keeps them in the same file. The codebase already uses `@theme inline` correctly.
**How to avoid:** Keep using `@theme inline` for all new tokens added to globals.css.

## Code Examples

### 1. Adding DM Sans + Montserrat Fonts to layout.tsx

```typescript
// src/app/layout.tsx
import { Playfair_Display, DM_Sans, Montserrat } from "next/font/google";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// In the JSX:
<html lang="en" className="dark">
  <body className={`${playfair.variable} ${dmSans.variable} ${montserrat.variable} ...`}>
```

### 2. Updated Font References in globals.css

```css
@theme inline {
  --font-sans: var(--font-dm-sans);      /* Body text: DM Sans */
  --font-heading: var(--font-playfair);   /* Headings: Playfair Display */
  --font-label: var(--font-montserrat);   /* Labels/CTAs: Montserrat */
}

body {
  font-family: var(--font-dm-sans), system-ui, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-playfair), Georgia, serif;
}
```

Then use in components: `className="font-label"` for Montserrat on CTAs.

### 3. Gold Shimmer Hover Effect (Pure CSS)

```css
/* In globals.css */
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@utility shimmer-gold {
  background: linear-gradient(
    110deg,
    var(--color-gold-dark) 0%,
    var(--color-gold-light) 45%,
    #fff 50%,
    var(--color-gold-light) 55%,
    var(--color-gold-dark) 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

Usage in components:
```tsx
<span className="hover:shimmer-gold hover:animate-[shimmer_2s_ease-in-out]">
  TAURO
</span>
```

Alternative simpler approach -- shimmer as a pseudo-element overlay on buttons:
```css
@utility btn-shimmer {
  position: relative;
  overflow: hidden;
}

@utility btn-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  transition: left 0.5s ease;
}

/* On hover, sweep the shimmer across */
.btn-shimmer:hover::after {
  left: 100%;
}
```

### 4. 3D Card Tilt Effect (Pure CSS)

```css
@utility card-tilt {
  transition: transform 0.3s ease;
  transform-style: preserve-3d;
}

/* Use with group hover pattern */
.card-tilt:hover {
  transform: perspective(1000px) rotateX(2deg) rotateY(5deg) scale(1.02);
}
```

Usage:
```tsx
<div className="card-tilt">
  {/* Card content */}
</div>
```

For a more dynamic per-card tilt, you would need JS (tracking mouse position). But for Phase 1, a uniform CSS-only tilt on hover is sufficient and performant.

### 5. Scroll-Aware Header (Transparent to Solid)

```tsx
"use client";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/40 bg-near-black/95 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      {/* ... */}
    </header>
  );
}
```

Note: The `{ passive: true }` option on the scroll listener is important for performance -- it tells the browser the handler won't call `preventDefault()`.

### 6. Full-Screen Mobile Overlay Menu

```tsx
{/* Mobile overlay - replaces the current dropdown */}
{mobileOpen && (
  <div className="fixed inset-0 z-50 flex flex-col bg-near-black lg:hidden">
    {/* Header with close button */}
    <div className="flex h-16 items-center justify-between px-4 sm:px-6">
      <Link href="/" className="font-heading text-2xl font-bold text-gold">
        TAURO
      </Link>
      <button
        type="button"
        onClick={() => setMobileOpen(false)}
        aria-label="Close menu"
        className="rounded-md p-2 text-muted-foreground"
      >
        <X className="size-6" />
      </button>
    </div>

    {/* Centered nav links */}
    <nav className="flex flex-1 flex-col items-center justify-center gap-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="font-heading text-3xl text-foreground transition-colors hover:text-gold"
          onClick={() => setMobileOpen(false)}
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/contact"
        className="mt-4 rounded-md bg-gold px-8 py-3 font-label text-lg font-semibold text-near-black"
        onClick={() => setMobileOpen(false)}
      >
        Schedule a Showing
      </Link>
    </nav>
  </div>
)}
```

Key details: `fixed inset-0` covers the full viewport. Content is vertically centered with flexbox. Links are large (text-3xl) for touch targets. Body scroll should be locked when overlay is open -- add `document.body.style.overflow = 'hidden'` in the toggle handler.

### 7. Diagonal Wipe Transition (CSS clip-path)

```css
@keyframes diagonal-wipe-in {
  from {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}

@keyframes diagonal-reveal {
  from {
    clip-path: polygon(0 0, 0 0, 0 0);
  }
  to {
    clip-path: polygon(0 0, 200% 0, 0 200%);
  }
}

@utility animate-diagonal-wipe {
  animation: diagonal-wipe-in 0.8s ease-out forwards;
}
```

Important: When animating clip-path, keep the same number of polygon points in `from` and `to` for smooth interpolation.

### 8. Footer Social Icons

```tsx
import { Instagram, Facebook, Linkedin } from "lucide-react";

// In the footer bottom bar:
<div className="flex gap-4">
  <a href="https://instagram.com/taurorealty" target="_blank" rel="noopener noreferrer"
     className="text-muted-foreground transition-colors hover:text-gold" aria-label="Instagram">
    <Instagram className="size-5" />
  </a>
  <a href="https://facebook.com/taurorealty" target="_blank" rel="noopener noreferrer"
     className="text-muted-foreground transition-colors hover:text-gold" aria-label="Facebook">
    <Facebook className="size-5" />
  </a>
  <a href="https://linkedin.com/company/taurorealty" target="_blank" rel="noopener noreferrer"
     className="text-muted-foreground transition-colors hover:text-gold" aria-label="LinkedIn">
    <Linkedin className="size-5" />
  </a>
</div>
```

### 9. Map Placeholder in Footer

```tsx
{/* Office map placeholder */}
<div className="mt-4 h-32 w-full overflow-hidden rounded-md bg-midnight">
  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
    <MapPin className="mr-1 size-3" /> Philadelphia, PA
  </div>
</div>
```

This can later be replaced with an actual Google Maps embed or Mapbox component.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js for colors | `@theme inline {}` in CSS | Tailwind CSS 4 (Jan 2025) | No JS config needed, define tokens in CSS |
| `@apply` for custom utilities | `@utility` directive | Tailwind CSS 4 | Cleaner custom utility registration |
| Inter as default font | Project-specific font system | Per-project | DM Sans (body) + Montserrat (labels) per requirements |
| JS animation libraries | CSS animations + transitions | Ongoing | Better performance, no bundle cost |

## Open Questions

1. **Color palette decision needed**
   - Requirements say: midnight #1A1A1A, gold #C9A84C, oxblood #8B0000, off-white #F5F0E8
   - Code currently has: midnight #1A1A2E, gold #C9A96E, red #E94560, near-black #0F0F1A
   - Recommendation: Keep code palette (it works well for dark UI). The blue-tinted darks (#1A1A2E, #0F0F1A) have more depth than pure black (#1A1A1A). But this needs explicit sign-off.

2. **Logo asset**
   - BRAND-04 mentions a NanoBanana Pro generated logo (Zorro/bull-inspired)
   - No logo file found in the codebase -- currently using text "TAURO"
   - Plan should include a task for logo integration once the asset is available, with text fallback as default

3. **Interactive 3D tilt vs CSS-only tilt**
   - BRAND-03 mentions "3D card tilt" which could mean mouse-tracking tilt (requires JS) or simple hover tilt (CSS only)
   - Recommendation: Start with CSS-only hover tilt. Add mouse-tracking JS tilt later if needed (Phase 2+ concern).

4. **Social media URLs**
   - Footer needs social links but actual URLs are unknown
   - Use placeholder URLs that can be updated later

## Sources

### Primary (HIGH confidence)
- Codebase inspection: `src/app/globals.css`, `src/app/layout.tsx`, `src/components/navbar.tsx`, `src/components/footer.tsx`, `src/app/(site)/layout.tsx`
- Tailwind CSS 4 official docs: `@theme` directive, `@utility` directive
- Next.js docs: `next/font/google` multi-font setup
- lucide-react: Instagram, Facebook, Linkedin icons confirmed available

### Secondary (MEDIUM confidence)
- [CSS shimmer effects](https://raghavvelan.medium.com/shimmering-text-animation-with-just-html-css-edc9bb035ec1) - gradient + background-clip technique
- [CSS 3D tilt](https://www.frontend.fyi/tutorials/css-3d-perspective-animations) - perspective + rotateX/Y pattern
- [CSS clip-path animations](https://css-tricks.com/animating-with-clip-path/) - polygon point matching for smooth transitions
- [Scroll header pattern](https://juliapottinger.com/transparent-to-solid-navbar-on-scroll-react/) - useState + useEffect + scroll listener
- [Next.js + Tailwind v4 fonts](https://www.buildwithmatija.com/blog/how-to-use-custom-google-fonts-in-next-js-15-and-tailwind-v4) - font variable pattern

### Tertiary (LOW confidence)
- [lucide-react social icon deprecation discussion](https://github.com/lucide-icons/lucide/issues/2792) - some brand icons may be deprecated in future versions

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all libraries already installed and verified in codebase
- Architecture: HIGH - patterns directly observed in existing code
- Font changes: HIGH - next/font/google supports DM_Sans and Montserrat
- Micro-interactions: MEDIUM - CSS patterns well-established but exact implementation needs tuning per brand
- Color decision: LOW - requires product decision, not a technical question

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (stable stack, no fast-moving dependencies)
