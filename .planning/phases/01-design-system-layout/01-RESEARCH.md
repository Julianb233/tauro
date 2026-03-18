# Phase 1: Design System & Layout Shell - Research

**Researched:** 2026-03-18 (v2)
**Domain:** Next.js 16 + Tailwind CSS v4 + shadcn/ui design system, typography, micro-interactions, responsive navigation
**Confidence:** HIGH

## Summary

This phase transforms the existing Tauro scaffold into the final brand system. The project already has a working Next.js 16 + Tailwind v4 + shadcn/ui foundation with a Navbar, Footer, dark mode, and basic brand colors. The work is primarily **refinement and extension**, not greenfield.

Key changes from current state to requirements:

1. **Color corrections** -- current palette differs from BRAND-01 spec in every value (gold `#C9A96E` vs `#C9A84C`, midnight `#1A1A2E` vs `#1A1A1A`, destructive `#E94560` vs oxblood `#8B0000`, off-white `#F5F3F0` vs `#F5F0E8`)
2. **Font swap** -- replace Inter with DM Sans (body) + add Montserrat (labels/CTAs); keep Playfair Display (headings)
3. **Navigation items** -- current has 6 items (Home, Properties, Our Agents, Neighborhoods, About, Contact); spec requires 5 (Properties, Agents, Sell, About, Contact)
4. **Header scroll effect** -- add transparent-to-solid transition on scroll (currently always opaque)
5. **Mobile menu** -- convert dropdown to full-screen overlay with centered links
6. **Micro-interactions** -- gold shimmer hover (CSS), 3D card tilt (motion library for mouse-tracking)
7. **Footer additions** -- social icons, office map placeholder

The existing architecture is correct. All changes work within the established patterns.

**Primary recommendation:** Update globals.css color values to match spec exactly, swap Inter for DM Sans + add Montserrat, add `motion` library for mouse-tracking 3D tilt, implement shimmer as pure CSS. Enhance existing navbar/footer components in place.

## Existing Scaffold Analysis

**What already exists and should NOT be rebuilt:**

| File | What It Has | What Needs Changing |
|------|-------------|---------------------|
| `src/app/layout.tsx` | Root layout, `className="dark"`, Playfair + Inter fonts | Replace Inter with DM Sans, add Montserrat |
| `src/app/globals.css` | Full `@theme inline` block, `:root` + `.dark` CSS vars, shadcn tokens | Update hex values to match BRAND-01, add font vars, add shimmer keyframes |
| `src/components/navbar.tsx` | Fixed header, desktop/mobile nav, nav links, CTA button | Add scroll transparency, full-screen overlay, update nav items |
| `src/components/footer.tsx` | 4-column grid, links, contact info | Add social icons, office map placeholder |
| `src/app/(site)/layout.tsx` | Site layout wrapping Navbar + Footer around children | No changes needed |
| `components.json` | shadcn/ui config (base-nova style, lucide icons) | No changes needed |
| `postcss.config.mjs` | `@tailwindcss/postcss` plugin | No changes needed |

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Next.js | 16.1.7 | Framework (App Router, Turbopack) | Installed |
| React | 19.2.3 | UI library | Installed |
| Tailwind CSS | 4.2.2 | Styling (CSS-first config) | Installed |
| shadcn/ui | 4.0.8 (base-nova) | Component library | Installed |
| Lucide React | 0.577.0 | Icons (social, UI) | Installed |
| tw-animate-css | 1.4.0 | Tailwind animation utilities | Installed |
| class-variance-authority | 0.7.1 | Component variant API | Installed |
| clsx + tailwind-merge | installed | Class merging via cn() | Installed |

### To Add
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | latest (12.x+) | 3D card tilt with mouse tracking, spring physics | Industry standard React animation library. React 19 compatible since v12. Required for BRAND-03 mouse-following 3D tilt effect -- CSS alone cannot track mouse position for per-cursor rotation. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| motion (for 3D tilt) | Pure CSS `:hover` tilt | CSS gives uniform tilt direction, not mouse-following. motion provides true cursor-tracking with spring physics. |
| motion (for shimmer) | Pure CSS `@keyframes` | Shimmer is a gradient sweep -- CSS is simpler and more performant. Use CSS. |
| Custom `useScrolled` hook | react-intersection-observer | A 6-line custom hook is simpler than adding a dependency for a boolean scroll check. |
| next-themes | Hardcoded `dark` class | Site is dark-mode-only. No theme switching needed. |

**Installation:**
```bash
npm install motion
```

## Architecture Patterns

### Project Structure (Additions to Existing)
```
src/
├── app/
│   ├── globals.css              # UPDATE: brand colors, font vars, shimmer/tilt CSS
│   ├── layout.tsx               # UPDATE: font imports (DM Sans, Montserrat replace Inter)
│   └── (site)/layout.tsx        # NO CHANGE
├── components/
│   ├── navbar.tsx               # UPDATE: scroll transparency, full-screen overlay, nav items
│   ├── footer.tsx               # UPDATE: social icons, map placeholder
│   └── ui/
│       ├── button.tsx           # EXISTS - no change
│       └── tilt-card.tsx        # NEW: reusable 3D tilt card (uses motion)
├── hooks/
│   └── use-scrolled.ts          # NEW: scroll position hook for header
└── lib/
    └── utils.ts                 # EXISTS - no change
```

### Pattern 1: Font Loading with next/font/google (Three Fonts)
**What:** Load Playfair Display, DM Sans, and Montserrat via next/font/google with CSS variable strategy.
**When to use:** Root layout only -- fonts are loaded once and available globally via CSS vars.

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

// Apply all three variable classes to body:
<body className={`${playfair.variable} ${dmSans.variable} ${montserrat.variable} ...`}>
```

Then register in globals.css:
```css
@theme inline {
  --font-sans: var(--font-dm-sans);
  --font-heading: var(--font-playfair);
  --font-label: var(--font-montserrat);
}

body { font-family: var(--font-dm-sans), system-ui, sans-serif; }
h1, h2, h3, h4, h5, h6 { font-family: var(--font-playfair), Georgia, serif; }
```

This enables `font-sans`, `font-heading`, and `font-label` as Tailwind utility classes.

**Key detail:** DM Sans and Playfair Display are variable fonts -- no `weight` array needed (all weights included automatically). Montserrat should specify `weight: ["500", "600", "700"]` to limit download since it is used only for labels/CTAs.

### Pattern 2: Brand Color Update (CRITICAL)
**What:** Update existing `@theme inline` block and `:root`/`.dark` CSS variable values to match BRAND-01 exactly.

Color corrections needed:
| Token | Current Value | Required Value | Delta |
|-------|--------------|----------------|-------|
| midnight | `#1A1A2E` | `#1A1A1A` | Remove blue tint |
| gold | `#C9A96E` | `#C9A84C` | Slightly different hue |
| destructive | `#E94560` | `#8B0000` (oxblood) | Major change: bright red to deep oxblood |
| foreground (dark) | `#F5F3F0` | `#F5F0E8` | Warmer off-white |
| near-black/bg | `#0F0F1A` | `#1A1A1A` | Use midnight as dark bg, not separate near-black |

```css
@theme inline {
  --color-midnight: #1A1A1A;
  --color-gold: #C9A84C;
  --color-gold-light: #D4B968;
  --color-gold-dark: #A8893D;
  --color-oxblood: #8B0000;
  --color-off-white: #F5F0E8;
  --color-near-black: #0F0F0F;
}

.dark {
  --background: #0F0F0F;
  --foreground: #F5F0E8;
  --card: #1A1A1A;
  --card-foreground: #F5F0E8;
  --primary: #C9A84C;
  --primary-foreground: #0F0F0F;
  --accent: #C9A84C;
  --accent-foreground: #0F0F0F;
  --destructive: #8B0000;
  --secondary: #1A1A1A;
  --secondary-foreground: #F5F0E8;
  --muted: #1A1A1A;
  --muted-foreground: #8A8A8A;
  --border: #2A2A2A;
  --input: #2A2A2A;
  --ring: #C9A84C;
}
```

### Pattern 3: Scroll-Aware Header
**What:** Custom hook that tracks scroll position for NAV-02 transparency transition.

```typescript
// src/hooks/use-scrolled.ts
"use client";
import { useState, useEffect } from "react";

export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    handler(); // check initial position
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return scrolled;
}
```

Usage in Navbar:
```tsx
const scrolled = useScrolled();

<header className={cn(
  "fixed top-0 z-50 w-full transition-all duration-300",
  scrolled
    ? "border-b border-border/40 bg-near-black/95 backdrop-blur-md"
    : "bg-transparent"
)}>
```

### Pattern 4: Full-Screen Mobile Overlay
**What:** Mobile nav covers entire viewport with centered large links for NAV-03.

```tsx
{mobileOpen && (
  <div
    className="fixed inset-0 z-50 flex flex-col bg-near-black lg:hidden"
    role="dialog"
    aria-modal="true"
    aria-label="Navigation menu"
  >
    <div className="flex h-16 items-center justify-between px-4 sm:px-6">
      <Link href="/" className="font-heading text-2xl font-bold text-gold">TAURO</Link>
      <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close menu"
        className="rounded-md p-2 text-muted-foreground">
        <X className="size-6" />
      </button>
    </div>
    <nav className="flex flex-1 flex-col items-center justify-center gap-6">
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href}
          className="font-heading text-3xl text-off-white transition-colors hover:text-gold"
          onClick={() => setMobileOpen(false)}>
          {link.label}
        </Link>
      ))}
    </nav>
  </div>
)}
```

Accessibility requirements:
- `role="dialog"` and `aria-modal="true"` on the overlay
- Close on Escape key: `useEffect` with `keydown` listener
- Body scroll lock: `document.body.style.overflow = 'hidden'` when open
- Focus management: return focus to hamburger on close

### Pattern 5: Gold Shimmer Hover (Pure CSS)
**What:** Diagonal light sweep across element on hover for BRAND-03.

```css
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
  .gold-shimmer:hover::after { animation: none; }
}
```

**Note:** This must be defined as regular CSS classes, not `@utility` blocks, because Tailwind v4 `@utility` does not support pseudo-element (`::after`) rules.

### Pattern 6: 3D Card Tilt with Mouse Tracking (motion library)
**What:** Cards rotate to follow cursor for depth effect (BRAND-03).
**Why motion library:** CSS `:hover` can only do uniform tilt. Mouse-tracking tilt requires JS to read cursor position and apply dynamic `rotateX`/`rotateY` values. The `motion` library provides `useMotionValue`, `useSpring`, and `useTransform` for smooth spring-based animations that automatically handle `prefers-reduced-motion`.

```tsx
// src/components/ui/tilt-card.tsx
"use client";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { type MouseEvent } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltDegrees?: number;
}

export function TiltCard({ children, className, tiltDegrees = 8 }: TiltCardProps) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [tiltDegrees, -tiltDegrees]), {
    stiffness: 300, damping: 30
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-tiltDegrees, tiltDegrees]), {
    stiffness: 300, damping: 30
  });

  function handleMouse(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
```

### Pattern 7: Navigation Items Update
**What:** Update nav links to match NAV-01 requirement.
**Current:** `Home, Properties, Our Agents, Neighborhoods, About, Contact`
**Required:** `Properties, Agents, Sell, About, Contact`

```typescript
const navLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/agents", label: "Agents" },
  { href: "/sell", label: "Sell" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
```

### Anti-Patterns to Avoid
- **Do NOT create a `tailwind.config.ts` file.** Tailwind v4 uses CSS-first config via `@theme` in globals.css.
- **Do NOT use `next-themes` for dark mode.** Site is dark-mode-only (`className="dark"` on `<html>`).
- **Do NOT import fonts via `@import url()` in CSS.** Use `next/font/google` -- it self-hosts fonts and eliminates render-blocking requests.
- **Do NOT use `framer-motion` package name.** Import from `motion/react`, not `framer-motion`.
- **Do NOT use `@utility` for pseudo-element effects.** Tailwind v4 `@utility` does not support `::after`/`::before`. Use regular CSS classes.
- **Do NOT use `@theme` without `inline`.** `@theme` alone replaces defaults. `@theme inline` extends them.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading | Manual `@font-face` or CDN links | `next/font/google` | Self-hosts, subsets, eliminates CLS |
| Spring animations / mouse tracking | Custom rAF loops | `motion` library | Spring physics, GPU acceleration, reduced-motion support |
| Icon system | Custom SVGs or sprite sheets | `lucide-react` | Already installed, tree-shakeable, consistent |
| CSS class merging | String concatenation | `cn()` from `@/lib/utils` | Handles Tailwind conflict deduplication |
| Component variants | Manual if/else className | `cva` (class-variance-authority) | Already installed, used by shadcn |
| Scroll detection | IntersectionObserver or library | 6-line `useScrolled` hook | Simple boolean, no dependency needed |

**Key insight:** The existing scaffold has all the right abstractions. This phase is about updating values and adding interaction layers, not building infrastructure.

## Common Pitfalls

### Pitfall 1: Color Value Mismatch
**What goes wrong:** Every color in the current scaffold differs from the BRAND-01 spec.
**Why it happens:** Scaffold used approximate/placeholder colors.
**How to avoid:** Systematically update ALL hex values in globals.css. Use the diff table in Pattern 2 as a checklist. Update both `@theme inline` brand tokens AND `.dark`/`:root` semantic variable blocks.
**Warning signs:** Visual comparison shows blue tint in backgrounds, wrong gold hue, bright red instead of oxblood.

### Pitfall 2: Font Variable Connection
**What goes wrong:** Fonts fall back to system fonts.
**Why it happens:** CSS variable name mismatch between `next/font/google` config and `@theme inline` reference.
**How to avoid:** Ensure exact match: font `variable: "--font-dm-sans"` must match `--font-sans: var(--font-dm-sans)` in `@theme inline`. All three font variable classes must be on `<body>`.
**Warning signs:** DM Sans or Montserrat not rendering, falling back to system fonts.

### Pitfall 3: Scroll Event Performance
**What goes wrong:** Header transitions feel janky.
**Why it happens:** Setting state on every scroll event.
**How to avoid:** Use `{ passive: true }`. The boolean comparison is cheap. Do NOT add debounce/throttle -- it causes visible delay.
**Warning signs:** Header transition has noticeable lag.

### Pitfall 4: Mobile Overlay Body Scroll
**What goes wrong:** Page scrolls behind the full-screen overlay.
**Why it happens:** Body scroll not locked when overlay opens.
**How to avoid:** Toggle `document.body.style.overflow` in a `useEffect` keyed to `mobileOpen`.
**Warning signs:** Content scrolling visible while mobile menu is open.

### Pitfall 5: Missing prefers-reduced-motion
**What goes wrong:** Users with motion sensitivity see shimmer and tilt animations.
**Why it happens:** Custom CSS animations not wrapped in motion preference check.
**How to avoid:** `motion` library handles this automatically. For CSS shimmer, add `@media (prefers-reduced-motion: reduce)` rule.
**Warning signs:** Accessibility audit failures.

### Pitfall 6: Navigation Items Not Matching Spec
**What goes wrong:** Nav shows wrong links.
**Why it happens:** Existing navbar has different items than NAV-01 requires.
**How to avoid:** Replace entire `navLinks` array. See Pattern 7. Key changes: remove "Home" and "Neighborhoods", add "Sell", shorten "Our Agents" to "Agents".
**Warning signs:** Side-by-side comparison with requirements shows different navigation items.

### Pitfall 7: @utility Cannot Do Pseudo-Elements
**What goes wrong:** Shimmer effect defined with `@utility` doesn't work.
**Why it happens:** Tailwind v4 `@utility` blocks cannot contain `::after` or `::before` pseudo-element rules.
**How to avoid:** Define shimmer and overlay effects as regular CSS classes in globals.css instead of `@utility` blocks.
**Warning signs:** Shimmer gradient overlay not appearing on hover.

## Code Examples

All code examples are provided inline in the Architecture Patterns section above. Quick reference:

1. **Font Setup** -- Pattern 1 (layout.tsx + globals.css @theme inline)
2. **Color Update** -- Pattern 2 (globals.css hex values + dark mode block)
3. **Scroll Hook** -- Pattern 3 (use-scrolled.ts)
4. **Mobile Overlay** -- Pattern 4 (full-screen nav with ARIA)
5. **Gold Shimmer** -- Pattern 5 (CSS @keyframes + pseudo-element)
6. **3D Tilt Card** -- Pattern 6 (motion/react component)
7. **Nav Items** -- Pattern 7 (updated navLinks array)

### Additional: Escape Key Handler
```typescript
useEffect(() => {
  if (!mobileOpen) return;
  const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
  document.addEventListener("keydown", handler);
  return () => document.removeEventListener("keydown", handler);
}, [mobileOpen]);
```

### Additional: Body Scroll Lock
```typescript
useEffect(() => {
  document.body.style.overflow = mobileOpen ? "hidden" : "";
  return () => { document.body.style.overflow = ""; };
}, [mobileOpen]);
```

### Additional: Footer Social Icons
```tsx
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "X (Twitter)" },
];

<div className="flex gap-3">
  {socials.map(({ icon: Icon, href, label }) => (
    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
      aria-label={label} className="rounded-md p-2 text-muted-foreground transition-colors hover:text-gold">
      <Icon className="size-5" />
    </a>
  ))}
</div>
```

### Additional: Map Placeholder
```tsx
<div className="mt-4 h-32 w-full overflow-hidden rounded-md bg-midnight/50">
  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
    <MapPin className="mr-1 size-3" /> Philadelphia, PA
  </div>
</div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.ts` | `@theme inline` in CSS | Tailwind v4.0 (Jan 2025) | No JS config file. Already correct in project. |
| `framer-motion` package | `motion` package, import `motion/react` | Late 2024 | Package renamed. Use `motion` for new installs. |
| Inter as body font | DM Sans per BRAND-02 | This phase | Direct swap in `next/font/google` |
| HSL colors in shadcn | Hex values in shadcn v4 | shadcn v4 (2025) | Project uses hex directly, which is correct. |
| `@layer utilities` | `@utility` directive | Tailwind v4.0 | Cleaner registration (but no pseudo-element support). |

**Deprecated/outdated:**
- `framer-motion` package name: Use `motion`, import from `motion/react`
- `tailwind.config.ts`: Not used in Tailwind v4 CSS-first
- `next-themes`: Not needed for dark-mode-only sites
- `@apply` in `@layer base`: Use CSS variables in `@theme inline`

## Open Questions

1. **Logo asset (BRAND-04)**
   - What we know: Requirements say "NanoBanana Pro generated, Zorro/bull-inspired"
   - What's unclear: Whether the SVG/PNG exists or needs to be created
   - Recommendation: Keep text "TAURO" placeholder (already in navbar/footer). Add logo integration when asset is available. Design layout to accommodate both text and image logo.

2. **Office address for map (NAV-04)**
   - What we know: Footer currently shows "Philadelphia, PA"
   - What's unclear: Exact office address
   - Recommendation: Use styled placeholder div until real address is provided. Avoids Google Maps API cost.

3. **Social media URLs**
   - What we know: Footer needs social icons per NAV-04
   - What's unclear: Actual profile URLs
   - Recommendation: Use `#` placeholder hrefs. Update later.

4. **Diagonal wipe and slash/swipe reveals (BRAND-03)**
   - What we know: Listed in BRAND-03 alongside shimmer and tilt
   - What's unclear: Where exactly these apply -- likely page/section transitions
   - Recommendation: Build shimmer and tilt as reusable utilities in Phase 1. Defer diagonal wipe and slash/swipe to Phase 2 where they have concrete use cases (hero section, section reveals). Include the CSS `@keyframes` for diagonal wipe in globals.css as a ready-to-use utility.

## Sources

### Primary (HIGH confidence)
- Existing codebase: `package.json`, `globals.css`, `layout.tsx`, `navbar.tsx`, `footer.tsx`, `components.json`
- [Tailwind CSS v4 Theme Variables](https://tailwindcss.com/docs/theme) -- `@theme inline` and CSS-first config
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) -- `next/font/google` multi-font setup
- [shadcn/ui Theming](https://ui.shadcn.com/docs/theming) -- CSS variable customization
- [shadcn/ui Dark Mode](https://ui.shadcn.com/docs/dark-mode) -- Dark mode with CSS variables
- [shadcn/ui Tailwind v4](https://ui.shadcn.com/docs/tailwind-v4) -- v4-specific integration
- [Motion for React](https://motion.dev/docs/react) -- React 19 compatible, useMotionValue/useSpring/useTransform

### Secondary (MEDIUM confidence)
- [Google Fonts + Next.js 15 + Tailwind v4](https://www.buildwithmatija.com/blog/how-to-use-custom-google-fonts-in-next-js-15-and-tailwind-v4) -- Integration pattern
- [Creating tilt effect with React](https://ibelick.com/blog/create-tilt-effect-with-react) -- motion useMotionValue pattern
- [Tiltable cards in React](https://stackrant.com/posts/tiltable-cards) -- Mouse tracking implementation
- [CSS 3D Perspective Animations](https://www.frontend.fyi/tutorials/css-3d-perspective-animations) -- perspective + rotateX/Y
- [CSS Shimmer Effects](https://medium.com/@forfrontendofficial/14-css-shine-effects-for-frontend-3194b796c174) -- Gradient sweep patterns
- [Accessible mobile menu](https://plousia.com/blog/how-create-accessible-mobile-menu) -- ARIA, focus trap, scroll lock
- [Motion upgrade guide](https://motion.dev/docs/react-upgrade-guide) -- framer-motion to motion migration

### Tertiary (LOW confidence)
- CSS shimmer gold-specific patterns from CodePen examples -- adapted for `#C9A84C`

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- verified against installed package.json
- Architecture (fonts): HIGH -- next/font/google API verified via official docs
- Architecture (theming): HIGH -- existing globals.css demonstrates the pattern
- Architecture (colors): HIGH -- straightforward hex value replacement
- Micro-interactions (shimmer): MEDIUM -- CSS patterns well-established, community-sourced
- Micro-interactions (3D tilt): MEDIUM -- motion library API verified, implementation from blog posts
- Accessibility (mobile nav): MEDIUM -- standard ARIA patterns, well-documented
- Navigation items: HIGH -- clear spec, straightforward array update

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (30 days -- stable stack, no fast-moving dependencies)
