# Phase 1: Design System & Layout Shell - Research

**Researched:** 2026-03-18 (updated)
**Domain:** Next.js 16 + Tailwind v4 + shadcn/ui v4 theming, typography, micro-interactions, responsive navigation
**Confidence:** HIGH

## Summary

Phase 1 establishes the Tauro visual identity and site-wide layout. The existing codebase already has a working scaffold: dark-mode-first design system with CSS variables in `globals.css`, a fixed navbar, a 4-column footer, a page shell layout via `(site)/layout.tsx`, and shadcn/ui v4 button component. The remaining work is gap-filling and corrections:

1. **Color corrections** -- existing palette differs from spec (e.g., `#1A1A2E` vs spec `#1A1A1A`, `#C9A96E` vs spec `#C9A84C`, missing oxblood `#8B0000`, using `#E94560` instead)
2. **Font swap** -- replace Inter with DM Sans (body) + add Montserrat (labels/CTAs); keep Playfair Display (headings)
3. **Micro-interactions** -- add gold shimmer hover, 3D card tilt, diagonal wipe (all CSS-only)
4. **Header upgrade** -- add scroll-based transparency transition (currently always opaque)
5. **Mobile menu upgrade** -- convert dropdown to full-screen overlay with centered links
6. **Footer additions** -- social icons, map placeholder

The existing architecture is sound. Tailwind CSS 4's `@theme inline` + CSS variables pattern already in use is correct. `next/font/google` is already set up. All changes are additive or corrective -- no structural rewrites needed.

**Primary recommendation:** Update existing globals.css to exact spec colors, swap Inter for DM Sans + add Montserrat, implement micro-interactions as reusable CSS utility classes, and enhance existing navbar/footer components in place. No new dependencies needed.

## Standard Stack

### Core (Already Installed - No Changes)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Next.js | 16.1.7 | App Router framework | Installed |
| React | 19.2.3 | UI framework | Installed |
| Tailwind CSS | ^4.2.2 | Utility-first CSS | Installed, v4 CSS-first config |
| shadcn/ui | ^4.0.8 (base-nova style) | Component primitives | Installed |
| lucide-react | ^0.577.0 | Icons (including social) | Installed |
| tw-animate-css | ^1.4.0 | Animation utilities | Installed |
| class-variance-authority | ^0.7.1 | Component variants | Installed |
| clsx + tailwind-merge | installed | Class merging via cn() | Installed |
| next/font/google | (built-in) | Font optimization | Already in use |

### No New Dependencies Needed

All Phase 1 requirements can be met with what is already installed:
- **Fonts**: `next/font/google` supports `DM_Sans` and `Montserrat`
- **Social icons**: `lucide-react` has `Instagram`, `Facebook`, `Linkedin` icons
- **Micro-interactions**: Pure CSS `@keyframes` + Tailwind `@utility` directives
- **Scroll detection**: React `useState` + `useEffect` with passive scroll listener
- **Mobile overlay**: CSS transitions (`translate-y`, `opacity`) on `fixed inset-0` div

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS-only 3D tilt | vanilla-tilt.js (8.5kb) | CSS is zero-dependency; JS needed only for mouse-tracking tilt |
| CSS transitions for mobile menu | motion (framer-motion) | CSS handles open/close fine; motion adds stagger/spring physics |
| Custom shimmer CSS | No library exists | Must hand-write ~15 lines of CSS keyframes |

## Architecture Patterns

### Current Project Structure (Action Needed Per File)
```
src/
├── app/
│   ├── globals.css            # UPDATE: correct brand colors, add font vars, add micro-interaction classes
│   ├── layout.tsx             # UPDATE: swap Inter for DM_Sans, add Montserrat
│   └── (site)/
│       └── layout.tsx         # DONE: already wraps pages with Navbar + Footer
├── components/
│   ├── navbar.tsx             # UPDATE: scroll transparency + full-screen mobile overlay
│   ├── footer.tsx             # UPDATE: add social icons + map placeholder
│   └── ui/
│       └── button.tsx         # DONE: shadcn base-nova button
└── lib/
    └── utils.ts               # DONE: cn() helper
```

### Pattern 1: Tailwind CSS 4 Design Tokens via @theme inline
**What:** All brand colors, fonts, and spacing defined as CSS variables in `globals.css` using `@theme inline {}`
**Why:** Tailwind v4 reads `@theme` blocks to generate utility classes. `@theme inline` extends (not replaces) the default theme, so `bg-midnight`, `text-gold`, `font-label` all become available as Tailwind utilities alongside defaults like `bg-white`.
**Current state:** Already in use. Needs color value corrections and font variable additions.

### Pattern 2: next/font/google with CSS Variables
**What:** Each Google Font loaded with a `variable` prop, applied as class on `<body>`, referenced in CSS via `var(--font-xxx)`.
**Current state:** Playfair Display + Inter loaded. Need to add DM Sans + Montserrat, remove Inter.
**Key detail:** `DM_Sans` is the function name (underscore, not space). All three are variable fonts so no `weight` array needed for Playfair and DM Sans (they include all weights). Montserrat should specify `weight: ["500", "600", "700"]` to limit download.

### Pattern 3: Route Group Layout for Page Shell
**What:** `(site)/layout.tsx` wraps pages with Navbar + Footer. Other route groups (admin, proposals) can use different layouts.
**Current state:** Already implemented correctly. No changes needed.

### Anti-Patterns to Avoid
- **DO NOT add Framer Motion or GSAP for Phase 1.** All shimmer, tilt, and wipe effects are pure CSS. Adding a JS animation library for these is overkill.
- **DO NOT create a ThemeProvider or context.** The `dark` class is hardcoded server-side on `<html>` in layout.tsx. No runtime theme switching needed.
- **DO NOT use `tailwind.config.js`.** Tailwind v4 is CSS-first. All config goes in `globals.css` via `@theme inline`.
- **DO NOT import fonts in multiple files.** Define once in layout.tsx (or a fonts.ts utility), apply CSS variables on body.
- **DO NOT use `@theme` without `inline`.** Bare `@theme` replaces the default Tailwind palette. `@theme inline` extends it.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Icon library | Custom SVG social icons | `lucide-react` (Instagram, Facebook, Linkedin) | Already installed, tree-shakeable, consistent |
| Font loading | Manual `<link>` tags or `@font-face` | `next/font/google` | Automatic optimization, self-hosted, no CLS |
| CSS class merging | String concatenation | `cn()` from `@/lib/utils` (clsx + tailwind-merge) | Handles Tailwind class conflicts correctly |
| Component variants | Manual if/else className logic | `cva` (class-variance-authority) | Already installed, used by shadcn button |
| Animation utilities | Custom keyframes from scratch for common patterns | `tw-animate-css` for fade/slide/zoom | Already installed, respects prefers-reduced-motion |
| Scroll detection | IntersectionObserver for header | Simple `window.scrollY > threshold` in useEffect | Header scroll is a trivial boolean; IO is overkill |

## Common Pitfalls

### Pitfall 1: Color Token Mismatch Between Spec and Code
**What goes wrong:** Requirements specify `#1A1A1A` (midnight), `#C9A84C` (gold), `#8B0000` (oxblood), `#F5F0E8` (off-white). Code currently uses `#1A1A2E`, `#C9A96E`, `#E94560`, `#0F0F1A`.
**Why it happens:** Initial scaffold used approximate colors. The blue-tinted darks (#1A1A2E) and warmer gold (#C9A96E) differ noticeably.
**How to avoid:** Update ALL color values in globals.css to match spec exactly. Search codebase for hardcoded hex values. The spec colors are the source of truth.
**Warning signs:** Side-by-side comparison shows blue tint in backgrounds, wrong gold hue, red instead of oxblood.

### Pitfall 2: Font Loading Causes Layout Shift
**What goes wrong:** Adding 3 Google Fonts means more downloads. FOUT visible on slow connections.
**Why it happens:** Too many font weights loaded, or `display: "swap"` not set.
**How to avoid:** Use `display: "swap"` (already done). Use `subsets: ["latin"]`. Only load needed weights. DM Sans and Playfair are variable fonts (all weights included automatically). Montserrat should specify only `["500", "600", "700"]`.
**Warning signs:** Text flickering on page load, CLS score degradation in Lighthouse.

### Pitfall 3: Scroll Listener Performance
**What goes wrong:** Scroll events fire at 60fps. Naive implementation causes excessive re-renders.
**Why it happens:** Calling `setState` on every scroll event even when value hasn't changed.
**How to avoid:** Only call `setScrolled()` when crossing the threshold. Add `{ passive: true }` to addEventListener. The boolean comparison (`window.scrollY > 50 !== scrolled`) prevents unnecessary state updates.
**Warning signs:** Choppy scroll, high CPU usage in devtools performance tab.

### Pitfall 4: Mobile Menu Z-Index and Body Scroll Lock
**What goes wrong:** Full-screen overlay doesn't cover everything, or page scrolls behind it.
**Why it happens:** Missing `overflow: hidden` on body, or z-index layering issues.
**How to avoid:** Use `fixed inset-0 z-50` for the overlay (covers viewport). Toggle `document.body.style.overflow` between `"hidden"` and `""` when menu opens/closes. Clean up in useEffect return.
**Warning signs:** Content visible behind overlay, page scrolling while menu open.

### Pitfall 5: CSS Animations and prefers-reduced-motion
**What goes wrong:** Shimmer, tilt, and wipe animations cause motion sickness.
**Why it happens:** Animations not wrapped in motion preference checks.
**How to avoid:** Wrap all custom animations in `@media (prefers-reduced-motion: reduce)` to disable them. Alternatively use Tailwind's `motion-safe:` variant prefix. `tw-animate-css` already handles this for its animations, but custom CSS needs manual handling.
**Warning signs:** Accessibility audit failures, user complaints.

### Pitfall 6: @utility Syntax in Tailwind v4
**What goes wrong:** Custom utility classes defined wrong, don't generate Tailwind classes.
**Why it happens:** Tailwind v4 uses `@utility name { ... }` syntax for custom utilities (replaces old `@layer utilities` pattern).
**How to avoid:** Use `@utility shimmer-gold { ... }` syntax. Note: `@utility` cannot use pseudo-elements (::after, ::before) directly. For shimmer overlay effects using pseudo-elements, define as regular CSS classes in globals.css instead.
**Warning signs:** Tailwind utility class not applying, no error in console.

## Code Examples

### 1. Font Loading in layout.tsx

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${playfair.variable} ${dmSans.variable} ${montserrat.variable} min-h-screen bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

### 2. Updated globals.css Theme Tokens (Corrected Colors)

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Brand colors - exact spec values */
  --color-midnight: #1A1A1A;
  --color-gold: #C9A84C;
  --color-gold-light: #D4B968;
  --color-gold-dark: #A8893D;
  --color-oxblood: #8B0000;
  --color-off-white: #F5F0E8;

  /* Font families */
  --font-sans: var(--font-dm-sans);
  --font-heading: var(--font-playfair);
  --font-label: var(--font-montserrat);

  /* shadcn semantic tokens */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.625rem;
  --background: #FFFFFF;
  --foreground: #1A1A1A;
  --card: #FFFFFF;
  --card-foreground: #1A1A1A;
  --popover: #FFFFFF;
  --popover-foreground: #1A1A1A;
  --primary: #1A1A1A;
  --primary-foreground: #FFFFFF;
  --secondary: #F5F0E8;
  --secondary-foreground: #1A1A1A;
  --muted: #F5F0E8;
  --muted-foreground: #6B6B7B;
  --accent: #C9A84C;
  --accent-foreground: #1A1A1A;
  --destructive: #8B0000;
  --border: #E5E5E5;
  --input: #E5E5E5;
  --ring: #C9A84C;
}

.dark {
  --background: #1A1A1A;
  --foreground: #F5F0E8;
  --card: #242424;
  --card-foreground: #F5F0E8;
  --popover: #242424;
  --popover-foreground: #F5F0E8;
  --primary: #C9A84C;
  --primary-foreground: #1A1A1A;
  --secondary: #242424;
  --secondary-foreground: #F5F0E8;
  --muted: #242424;
  --muted-foreground: #9A9A9A;
  --accent: #C9A84C;
  --accent-foreground: #1A1A1A;
  --destructive: #8B0000;
  --border: #333333;
  --input: #333333;
  --ring: #C9A84C;
}

body {
  font-family: var(--font-dm-sans), system-ui, sans-serif;
  background: var(--background);
  color: var(--foreground);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-playfair), Georgia, serif;
}
```

### 3. Gold Shimmer Hover Effect (Pure CSS)

```css
/* In globals.css - shimmer as pseudo-element overlay */
@keyframes shimmer-sweep {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.gold-shimmer {
  position: relative;
  overflow: hidden;
}

.gold-shimmer::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 30%,
    rgba(201, 168, 76, 0.25) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  pointer-events: none;
}

.gold-shimmer:hover::after {
  animation: shimmer-sweep 0.8s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
  .gold-shimmer:hover::after {
    animation: none;
  }
}
```

### 4. 3D Card Tilt (CSS-only hover)

```css
/* In globals.css */
.tilt-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
}

.tilt-card:hover {
  transform: perspective(1000px) rotateX(2deg) rotateY(-3deg) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

@media (prefers-reduced-motion: reduce) {
  .tilt-card:hover {
    transform: none;
    box-shadow: none;
  }
}
```

### 5. Scroll-Aware Header

```tsx
"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300",
      scrolled
        ? "bg-midnight/95 backdrop-blur-md border-b border-border/40"
        : "bg-transparent"
    )}>
      {/* ... nav content ... */}
    </header>
  );
}
```

### 6. Full-Screen Mobile Menu Overlay

```tsx
{/* Replaces current dropdown-style mobile menu */}
<div className={cn(
  "fixed inset-0 z-50 flex flex-col bg-midnight transition-all duration-300 lg:hidden",
  mobileOpen
    ? "opacity-100 translate-y-0"
    : "opacity-0 -translate-y-full pointer-events-none"
)}>
  {/* Header bar with logo + close button */}
  <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
    <Link href="/" className="font-heading text-2xl font-bold tracking-wide text-gold">
      TAURO
    </Link>
    <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu"
      className="rounded-md p-2 text-muted-foreground">
      <X className="size-6" />
    </button>
  </div>

  {/* Centered navigation links */}
  <nav className="flex flex-1 flex-col items-center justify-center gap-6">
    {navLinks.map((link, i) => (
      <Link key={link.href} href={link.href}
        className="font-heading text-3xl font-bold text-off-white transition-colors hover:text-gold"
        style={{ transitionDelay: mobileOpen ? `${i * 75}ms` : "0ms" }}
        onClick={() => setMobileOpen(false)}>
        {link.label}
      </Link>
    ))}
    <Link href="/contact"
      className="mt-4 rounded-md bg-gold px-8 py-3 font-label text-lg font-semibold text-midnight"
      onClick={() => setMobileOpen(false)}>
      Schedule a Showing
    </Link>
  </nav>
</div>
```

### 7. Diagonal Wipe Transition

```css
@keyframes diagonal-wipe-in {
  from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
  to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
}

.animate-diagonal-wipe {
  animation: diagonal-wipe-in 0.8s ease-out forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animate-diagonal-wipe { animation: none; clip-path: none; }
}
```

### 8. Footer Social Icons

```tsx
import { Instagram, Facebook, Linkedin } from "lucide-react";

<div className="flex gap-4">
  {[
    { icon: Instagram, href: "https://instagram.com/taurorealty", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/taurorealty", label: "Facebook" },
    { icon: Linkedin, href: "https://linkedin.com/company/taurorealty", label: "LinkedIn" },
  ].map(({ icon: Icon, href, label }) => (
    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
      className="text-muted-foreground transition-colors hover:text-gold" aria-label={label}>
      <Icon className="size-5" />
    </a>
  ))}
</div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js for colors | `@theme inline {}` in CSS | Tailwind v4 (Jan 2025) | No JS config file needed |
| `@layer utilities` for custom classes | `@utility name {}` directive | Tailwind v4 | Cleaner custom utility registration |
| Inter as default Next.js font | Project-specific font system | Per-project | DM Sans (body) + Montserrat (labels) per brand spec |
| framer-motion package | motion package | Late 2024 | Package renamed (not needed for Phase 1 anyway) |
| Google Fonts CDN `<link>` | next/font/google | Next.js 13+ (2023) | Self-hosted, no external requests, zero CLS |

**Deprecated/outdated in this stack:**
- `tailwind.config.js` / `tailwind.config.ts` -- not used in Tailwind v4
- `@apply` in `@layer base` for font rules -- use CSS variables in `@theme inline`
- Separate dark mode toggle libraries -- not needed with server-side `className="dark"`

## Open Questions

1. **Color palette: use spec values exactly or keep refined codebase values?**
   - Spec says: midnight `#1A1A1A`, gold `#C9A84C`, oxblood `#8B0000`, off-white `#F5F0E8`
   - Code currently has: `#1A1A2E` (blue-tinted), `#C9A96E` (warmer gold), `#E94560` (bright red), `#0F0F1A`
   - Recommendation: **Use spec values.** The spec is the brand source of truth. `#1A1A1A` is a true midnight/near-black that works well for luxury dark-mode. The card background should be slightly lighter (e.g., `#242424`) for card/popover differentiation.

2. **Logo asset (BRAND-04)**
   - No logo SVG/image found in codebase
   - Text "TAURO" is used as placeholder (already in navbar + footer)
   - Recommendation: Keep text placeholder, add logo image when asset is provided. Design layout to accommodate both text and image logo.

3. **Social media URLs**
   - Actual URLs unknown
   - Recommendation: Use placeholder URLs. Make them configurable (constants file or env vars).

4. **Office map in footer (NAV-04)**
   - Spec says "office map"
   - Recommendation: Static map placeholder (colored div with address text). Avoids Google Maps API dependency and bundle cost. Swap in real map in later phase if needed.

5. **Interactive 3D tilt vs CSS-only tilt**
   - BRAND-03 says "3D card tilt" -- could mean mouse-tracking (JS) or hover-tilt (CSS)
   - Recommendation: CSS-only hover tilt for Phase 1. Mouse-tracking tilt can be added later with vanilla-tilt.js if needed.

6. **@utility limitation with pseudo-elements**
   - Tailwind v4 `@utility` may not support `::after` / `::before` pseudo-element rules
   - Recommendation: Define shimmer and other pseudo-element effects as regular CSS classes (`.gold-shimmer`, `.gold-shimmer::after`) rather than `@utility` blocks.

## Sources

### Primary (HIGH confidence)
- Existing codebase inspection: package.json, globals.css, layout.tsx, navbar.tsx, footer.tsx, components.json
- [Tailwind CSS v4 Theme Variables](https://tailwindcss.com/docs/theme) -- @theme inline documentation
- [Tailwind CSS v4 Custom Colors](https://tailwindcss.com/docs/customizing-colors) -- color token patterns
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming) -- CSS variable theming with shadcn
- [shadcn/ui Tailwind v4 Guide](https://ui.shadcn.com/docs/tailwind-v4) -- v4-specific setup
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) -- next/font/google multi-font pattern
- [Next.js Font API Reference](https://nextjs.org/docs/app/api-reference/components/font) -- DM_Sans, Montserrat function names

### Secondary (MEDIUM confidence)
- [CSS Metallic Effects](https://ibelick.com/blog/creating-metallic-effect-with-css) -- shimmer gradient technique
- [CSS 3D Perspective Animations](https://www.frontend.fyi/tutorials/css-3d-perspective-animations) -- perspective + rotateX/Y pattern
- [Tailwind CSS v4 Dark Mode](https://tailwindcss.com/docs/dark-mode) -- @custom-variant dark pattern
- [shadcn Tailwind v4 Theming Guide](https://www.shadcnblocks.com/blog/tailwind4-shadcn-themeing/) -- practical theming walkthrough

### Tertiary (LOW confidence)
- [vanilla-tilt.js](https://micku7zu.github.io/vanilla-tilt.js/) -- only if mouse-tracking tilt is needed later
- [Motion (framer-motion)](https://motion.dev/) -- only if CSS transitions prove insufficient for mobile menu

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries verified in package.json, no new deps needed
- Architecture (fonts, theming): HIGH -- patterns verified against Next.js + Tailwind v4 docs
- Architecture (micro-interactions): MEDIUM -- CSS patterns are well-established but exact shimmer/tilt tuning may need iteration
- Pitfalls: HIGH -- identified from direct code inspection of existing codebase gaps
- Color decision: HIGH -- spec values are clear, recommendation is to follow spec exactly

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (stable stack, no fast-moving dependencies)
