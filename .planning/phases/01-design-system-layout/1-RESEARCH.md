# Phase 1: Design System & Layout Shell - Research

**Researched:** 2026-03-18
**Domain:** Next.js 16 + Tailwind CSS 4 design system, brand theming, micro-interactions
**Confidence:** HIGH

## Summary

The Tauro codebase already has a functional Next.js 16 + Tailwind CSS 4 scaffold with dark mode, a navbar, footer, and shadcn/ui configured. The phase work is primarily about **correcting brand tokens**, **swapping fonts**, **upgrading micro-interactions**, and **filling gaps** (logo, scroll transparency, full-screen mobile menu, social links, office map in footer).

The existing architecture is sound -- (site) route group with shared layout, shadcn/ui with CSS variables, `@theme inline` in globals.css. No structural rewrites needed. The work is focused refinement: update color hex values, replace Inter with DM Sans + Montserrat, add CSS-based micro-interactions, and enhance the existing navbar/footer components.

**Primary recommendation:** Update the existing globals.css color tokens and font loading in layout.tsx. Build micro-interactions as reusable CSS utility classes in globals.css (no JS animation libraries needed). Enhance existing navbar.tsx and footer.tsx rather than replacing them.

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Next.js | 16.1.7 | App framework | Installed, keep |
| Tailwind CSS | 4.2.2 | Styling | Installed, keep |
| shadcn/ui | 4.0.8 (base-nova) | Component library | Installed, keep |
| lucide-react | 0.577.0 | Icons | Installed, keep |
| tw-animate-css | 1.4.0 | Animation utilities | Installed, keep |
| next/font/google | built-in | Font loading | In use, needs update |

### Supporting (No New Installs Needed)
| Library | Purpose | Notes |
|---------|---------|-------|
| CSS `@keyframes` | Shimmer/wipe animations | Native CSS, no library |
| CSS `clip-path` | Diagonal wipe transitions | Native CSS, widely supported |
| CSS `perspective` + `transform` | 3D card tilt | Native CSS for hover-only; JS for mouse-tracking |

### Alternatives Considered
| Instead of | Could Use | Decision |
|------------|-----------|----------|
| Framer Motion | CSS animations | **Use CSS** -- shimmer, wipes, and tilts are achievable with pure CSS. No need for a 40KB+ JS animation library for hover effects. |
| vanilla-tilt.js | CSS perspective + optional JS | **Use CSS for basic tilt**, add lightweight JS handler only if mouse-tracking tilt is required later. |
| GSAP | CSS clip-path transitions | **Use CSS** -- clip-path transitions are hardware-accelerated and don't need GSAP for the effects described. |

**Installation:** No new packages needed. All requirements are met by existing stack + native CSS.

## Architecture Patterns

### Current Project Structure (Relevant Parts)
```
src/
├── app/
│   ├── globals.css          # Theme tokens, fonts, animations (UPDATE)
│   ├── layout.tsx           # Root layout with font loading (UPDATE)
│   └── (site)/
│       └── layout.tsx       # Navbar + Footer wrapper (MINOR UPDATE)
├── components/
│   ├── navbar.tsx           # Existing navbar (ENHANCE)
│   ├── footer.tsx           # Existing footer (ENHANCE)
│   └── ui/
│       └── button.tsx       # shadcn button (KEEP)
└── lib/
    └── utils.ts             # cn() helper (KEEP)
```

### Pattern 1: Tailwind CSS 4 Theme Tokens via @theme inline
**What:** Define all brand colors as CSS custom properties in `@theme inline {}` block in globals.css, making them available as Tailwind utility classes (e.g., `bg-midnight`, `text-gold`).
**When to use:** Always -- this is how Tailwind v4 works.
**Example:**
```css
/* globals.css */
@theme inline {
  --color-midnight: #1A1A1A;
  --color-gold: #C9A84C;
  --color-gold-light: #D4BC8A;
  --color-gold-dark: #A88A3C;
  --color-oxblood: #8B0000;
  --color-off-white: #F5F0E8;
  --color-near-black: #0F0F1A;
}
```

### Pattern 2: Next.js Font Loading with CSS Variables
**What:** Import fonts via `next/font/google`, assign CSS `variable` names, apply to `<body>` className.
**When to use:** For all Google Fonts in the project.
**Example:**
```tsx
// layout.tsx
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
  display: "swap",
  weight: ["500", "600", "700"],
});

// In <body>:
className={`${playfair.variable} ${dmSans.variable} ${montserrat.variable} ...`}
```

Then in globals.css:
```css
@theme inline {
  --font-sans: var(--font-dm-sans);
  --font-heading: var(--font-playfair);
  --font-label: var(--font-montserrat);
}

body {
  font-family: var(--font-dm-sans), system-ui, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-playfair), Georgia, serif;
}
```

### Pattern 3: Scroll-Based Header Transparency
**What:** Fixed header starts transparent, gains solid background + border on scroll. Uses a small `useEffect` + `useState` or `useCallback` with `scroll` event listener.
**When to use:** NAV-02 requirement.
**Example:**
```tsx
// navbar.tsx
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 50);
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);

// In JSX:
<header className={cn(
  "fixed top-0 z-50 w-full transition-all duration-300",
  scrolled
    ? "border-b border-border/40 bg-near-black/95 backdrop-blur-md"
    : "bg-transparent"
)}>
```

### Pattern 4: Full-Screen Mobile Overlay Menu
**What:** Mobile menu fills entire viewport with animated reveal instead of dropdown panel.
**When to use:** NAV-03 requirement.
**Example:**
```tsx
{/* Full-screen overlay */}
<div className={cn(
  "fixed inset-0 z-40 flex flex-col items-center justify-center bg-near-black/98 backdrop-blur-xl transition-all duration-500 lg:hidden",
  mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"
)}>
  <nav className="flex flex-col items-center gap-6">
    {navLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        className="font-heading text-2xl font-bold text-off-white transition-colors hover:text-gold"
        onClick={() => setMobileOpen(false)}
      >
        {link.label}
      </Link>
    ))}
  </nav>
</div>
```

### Anti-Patterns to Avoid
- **Don't use tailwind.config.js:** Tailwind v4 is CSS-first. All theme configuration goes in globals.css via `@theme inline {}`. There is no tailwind.config.js in this project.
- **Don't use next-themes for dark mode:** The site is dark-mode-first with `className="dark"` on `<html>`. No theme toggle needed. Using next-themes adds unnecessary complexity.
- **Don't use JS animation libraries for hover effects:** Gold shimmer, diagonal wipes, and card tilts are all achievable with CSS transitions and `@keyframes`. Adding Framer Motion or GSAP for hover effects is overkill here.
- **Don't load all Montserrat weights:** Only load weights 500, 600, 700 (labels/CTAs). Loading all weights wastes bandwidth.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Component variants | Custom variant logic | shadcn/ui + cva (already installed) | Handles dark mode, size variants, compound variants |
| Icon system | Custom SVG sprite | lucide-react (already installed) | 1500+ icons, tree-shakeable, consistent sizing |
| CSS utility merging | String concatenation | `cn()` from lib/utils (clsx + tailwind-merge) | Handles conflicting Tailwind classes correctly |
| Scroll animations | Custom IntersectionObserver | tw-animate-css (already installed) | Provides animate-in utilities for entrance animations |
| Font optimization | Self-hosted fonts | next/font/google (built-in) | Automatic subsetting, no layout shift, zero-config |

**Key insight:** The existing stack already covers all utility needs. This phase adds no new dependencies.

## Common Pitfalls

### Pitfall 1: Color Token Mismatch Between Requirements and Code
**What goes wrong:** The current codebase has different hex values than the requirements specify. If you only update `@theme inline` but miss the `.dark {}` CSS variable block, colors will be inconsistent.
**Why it happens:** Colors are defined in TWO places: `@theme inline {}` (Tailwind utility colors) AND `:root` / `.dark` blocks (shadcn semantic tokens).
**How to avoid:** Update BOTH places. Map brand colors to shadcn semantic tokens:
- `--background` should use midnight (#1A1A1A) in dark mode
- `--primary` should use gold (#C9A84C) in dark mode
- `--destructive` should use oxblood (#8B0000)
- `--foreground` should use off-white (#F5F0E8) in dark mode
**Warning signs:** Components look different from raw HTML because shadcn uses `--primary` not `--color-gold`.

### Pitfall 2: Font Variable Not Connecting to Tailwind
**What goes wrong:** Font loads (visible in Network tab) but Tailwind `font-heading` class doesn't apply it.
**Why it happens:** The CSS variable name in `next/font/google` config must match what `@theme inline` references.
**How to avoid:** Ensure chain: `next/font/google` variable `"--font-dm-sans"` -> `@theme inline { --font-sans: var(--font-dm-sans); }` -> body `font-family: var(--font-dm-sans)`.
**Warning signs:** Text renders in fallback font (system-ui) despite font file loading.

### Pitfall 3: Mobile Menu Z-Index Conflict with Fixed Header
**What goes wrong:** Full-screen mobile overlay appears behind the header or doesn't cover entire viewport.
**Why it happens:** Header is `z-50`, overlay needs to be at least `z-40` but positioned correctly.
**How to avoid:** Make the mobile menu a sibling or child of the header with proper z-index stacking. The hamburger toggle button must remain above the overlay (use z-50 on header, z-40 on overlay, and ensure the toggle is in the header).
**Warning signs:** Menu opens but header is still visible on top, or close button is unreachable.

### Pitfall 4: Shimmer Animation Performance
**What goes wrong:** Shimmer effect causes janky scrolling or layout shifts.
**Why it happens:** Animating `background-position` is less performant than `transform`/`opacity`.
**How to avoid:** Use `will-change: background-position` on shimmer elements, or use a pseudo-element approach with `transform: translateX()` which is GPU-accelerated.
**Warning signs:** Low FPS when hovering over multiple cards simultaneously.

### Pitfall 5: Navigation Links Don't Match Requirements
**What goes wrong:** Current navbar has: Home, Properties, Our Agents, Neighborhoods, About, Contact. Requirements specify: Properties, Agents, Sell, About, Contact.
**Why it happens:** Easy to overlook when enhancing existing component.
**How to avoid:** Update navLinks array to match NAV-01: `[Properties, Agents, Sell, About, Contact]`. Drop "Home" (logo serves as home link), "Neighborhoods" (not in nav req), and rename "Our Agents" to "Agents".
**Warning signs:** Side-by-side comparison with requirements shows mismatched nav items.

## Code Examples

### Gold Shimmer Hover Effect (CSS-only, Tailwind v4)
```css
/* globals.css */
@keyframes shimmer-gold {
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}

.shimmer-gold {
  position: relative;
  overflow: hidden;
}

.shimmer-gold::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent 25%,
    rgba(201, 168, 76, 0.15) 50%,
    transparent 75%
  );
  background-size: 250% 100%;
  background-position: -100% 0;
  transition: background-position 0s ease;
  pointer-events: none;
}

.shimmer-gold:hover::after {
  background-position: 200% 0;
  transition-duration: 1.5s;
}
```

### 3D Card Tilt (CSS-only hover)
```css
/* globals.css */
.card-tilt {
  transition: transform 0.3s ease;
  transform-style: preserve-3d;
}

.card-tilt:hover {
  transform: perspective(800px) rotateX(2deg) rotateY(-3deg) scale(1.02);
}
```

### Diagonal Wipe Reveal (CSS clip-path)
```css
/* globals.css */
@keyframes diagonal-wipe-in {
  from {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }
  to {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}

.diagonal-wipe {
  animation: diagonal-wipe-in 0.6s ease-out forwards;
}
```

### Slash/Swipe Reveal (CSS clip-path with diagonal)
```css
/* globals.css */
@keyframes slash-reveal {
  from {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }
  to {
    clip-path: polygon(0 0, 115% 0, 100% 100%, 0 100%);
  }
}

.slash-reveal {
  animation: slash-reveal 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
```

### Required Color Token Updates (Current -> Required)
```
CURRENT                         REQUIRED
--color-midnight: #1A1A2E  -->  --color-midnight: #1A1A1A
--color-gold: #C9A96E      -->  --color-gold: #C9A84C
--color-bold-red: #E94560  -->  --color-oxblood: #8B0000
--color-near-black: #0F0F1A     (keep as-is, used for deeper black)
(missing)                  -->  --color-off-white: #F5F0E8
```

### Required Font Updates (Current -> Required)
```
CURRENT                         REQUIRED
Playfair Display (headings)     Playfair Display (headings) -- KEEP
Inter (body)               -->  DM Sans (body)
(missing)                  -->  Montserrat (labels/CTAs)
```

### Required Nav Links Update (Current -> Required)
```
CURRENT                         REQUIRED (NAV-01)
Home                            (removed -- logo is home link)
Properties                      Properties
Our Agents                 -->  Agents
Neighborhoods                   (removed)
About                           About
Contact                         Contact
(missing)                  -->  Sell
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js | `@theme inline {}` in CSS | Tailwind v4 (2025) | All config in globals.css, no JS config file |
| HSL color format | OKLCH color format | shadcn v4 + Tailwind v4 | Better perceptual uniformity, but hex still works fine |
| `@apply dark:` | `@custom-variant dark` | Tailwind v4 | Dark mode variant defined in CSS |
| next-themes | `className="dark"` on html | N/A (project choice) | Simpler for dark-mode-first sites |

**Deprecated/outdated:**
- `tailwind.config.js` / `tailwind.config.ts`: Not used in Tailwind v4 CSS-first approach
- HSL color values for shadcn: v4 prefers OKLCH but hex values work and are simpler to manage

## Open Questions

1. **Logo Asset**
   - What we know: No logo file exists in /public. Navbar and footer use text "TAURO" as logo placeholder. BRAND-04 says "NanoBanana Pro generated, Zorro/bull-inspired".
   - What's unclear: Whether the logo SVG has been generated yet or needs to be created/sourced.
   - Recommendation: Plan for an SVG component approach (`components/logo.tsx`) that can start with the text "TAURO" and be swapped for the actual SVG asset when available. Add a TODO/placeholder.

2. **Office Map in Footer (NAV-04)**
   - What we know: NAV-04 requires "office map" in footer. Current footer has address text only.
   - What's unclear: Whether this means an embedded Google Map iframe, a static map image, or a link to Google Maps.
   - Recommendation: Plan for a lightweight static map image or a simple "View on Map" link. Avoid embedding Google Maps iframe (performance cost, API key needed). Can upgrade later.

3. **Social Media Links (NAV-04)**
   - What we know: NAV-04 requires social links in footer. Current footer has none.
   - What's unclear: Which social platforms (Instagram, Facebook, LinkedIn, Twitter/X?). No social URLs provided.
   - Recommendation: Add placeholder social icon links using lucide-react icons (Instagram, Facebook, Linkedin). Use `#` hrefs as placeholders.

4. **Exact Micro-Interaction Placement**
   - What we know: BRAND-03 lists shimmer, 3D tilt, slash/swipe reveals, diagonal wipes.
   - What's unclear: Which elements get which effects. Do ALL cards get tilt? Do ALL page transitions get wipes?
   - Recommendation: Build the CSS utility classes as a reusable library. Apply shimmer to gold CTA buttons, tilt to property cards, and diagonal wipe to section reveals. This can be tuned per-page later.

## Sources

### Primary (HIGH confidence)
- Codebase inspection: globals.css, layout.tsx, navbar.tsx, footer.tsx, components.json, package.json
- Tailwind CSS v4 docs: https://tailwindcss.com/docs/theme (theme variables)
- shadcn/ui Tailwind v4 guide: https://ui.shadcn.com/docs/tailwind-v4
- Next.js font optimization docs: https://nextjs.org/docs/app/getting-started/fonts

### Secondary (MEDIUM confidence)
- Shimmer effect pattern: https://ibelick.com/blog/create-shine-effect-on-card-with-tailwind-css
- Button shine effect: https://cruip.com/button-shine-effect-on-hover-with-tailwind-css/
- Clip-path animations: https://css-tricks.com/animating-with-clip-path/
- 3D tilt with CSS perspective: https://www.frontend.fyi/tutorials/css-3d-perspective-animations

### Tertiary (LOW confidence)
- Transition.style library for clip-path transitions: https://www.transition.style/ (could not fetch full docs)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - inspected actual codebase, all dependencies verified in package.json
- Color/font updates: HIGH - exact current vs required values documented from source code
- Architecture patterns: HIGH - based on actual Tailwind v4 docs and existing code patterns
- Micro-interactions: MEDIUM - CSS techniques are well-established but exact placement per BRAND-03 is interpretive
- Pitfalls: HIGH - derived from actual code inspection and known Tailwind v4 patterns

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (stable -- no fast-moving dependencies)
