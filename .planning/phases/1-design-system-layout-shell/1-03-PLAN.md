---
phase: 1-design-system-layout-shell
plan: 03
type: execute
wave: 2
depends_on: ["1-01", "1-02"]
files_modified:
  - src/components/navbar.tsx
  - src/components/footer.tsx
autonomous: true

must_haves:
  truths:
    - "Header is fixed, shows correct nav items (Properties, Agents, Sell, About, Contact), transitions to transparent on scroll"
    - "Mobile nav opens a full-screen overlay menu covering the entire viewport"
    - "Footer displays social icons (Instagram, Facebook, LinkedIn) alongside links and contact info"
    - "Logo area displays styled TAURO text in brand typography (Playfair Display) as the current logo implementation"
    - "Gold shimmer micro-interaction is visible on navbar CTA button and footer social links on hover"
  artifacts:
    - path: "src/components/navbar.tsx"
      provides: "Fixed header with scroll transparency transition, correct nav links, styled text logo, and GoldShimmer on CTA"
      contains: "useEffect"
    - path: "src/components/footer.tsx"
      provides: "Footer with social media icon links wrapped in GoldShimmer"
      contains: "Instagram"
  key_links:
    - from: "src/components/navbar.tsx"
      to: "window.scrollY"
      via: "scroll event listener for transparency transition"
      pattern: "addEventListener.*scroll"
    - from: "src/components/navbar.tsx"
      to: "src/app/globals.css"
      via: "brand color classes (bg-midnight, text-gold, etc.)"
      pattern: "bg-(midnight|near-black)"
    - from: "src/components/navbar.tsx"
      to: "src/components/ui/gold-shimmer.tsx"
      via: "GoldShimmer wrapping the CTA button"
      pattern: "import.*GoldShimmer"
    - from: "src/components/footer.tsx"
      to: "src/components/ui/gold-shimmer.tsx"
      via: "GoldShimmer wrapping social icon links"
      pattern: "import.*GoldShimmer"
---

<objective>
Refine the Navbar and Footer to fully satisfy NAV-01 through NAV-04 and BRAND-04 requirements, and integrate micro-interactions from Plan 02.

Purpose: The existing navbar and footer are functional but have wrong nav links, no scroll transparency transition, a basic mobile menu (not full-screen overlay), no social icons in the footer, and no micro-interactions applied. This plan fixes all NAV requirements and integrates GoldShimmer from Plan 02 onto interactive elements so the micro-interactions are visible and testable.

Output: Updated navbar.tsx with scroll behavior, correct links, styled text logo, and GoldShimmer CTA. Updated footer.tsx with social icons and GoldShimmer on social links.
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-plan.md
@~/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/phases/1-design-system-layout-shell/1-01-SUMMARY.md
@.planning/phases/1-design-system-layout-shell/1-02-SUMMARY.md
@src/components/navbar.tsx
@src/components/footer.tsx
@src/components/ui/gold-shimmer.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update Navbar — correct links, scroll transparency, full-screen mobile overlay, logo text, and GoldShimmer CTA</name>
  <files>src/components/navbar.tsx</files>
  <action>
Make these changes to navbar.tsx:

**1. Fix navigation links (NAV-01):**
Replace the current `navLinks` array with:
```
const navLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/agents", label: "Agents" },
  { href: "/sell", label: "Sell" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
```
Remove "Home" (logo handles that), rename "Our Agents" to "Agents", add "Sell", remove "Neighborhoods" (moved under areas).

**2. Add scroll transparency transition (NAV-02):**
Add a `useEffect` with a scroll event listener:
- Track `scrolled` state (boolean)
- On scroll: if `window.scrollY > 50`, set scrolled to true, else false
- When `scrolled` is false (at top): header background should be `bg-transparent` with no border and no backdrop blur
- When `scrolled` is true: header background should be `bg-midnight/95 backdrop-blur-md border-b border-border/40` (current style)
- Add `transition-all duration-300` to the header for smooth transition
- Clean up the scroll listener on unmount

Update the header className to be dynamic based on `scrolled` state:
```
className={cn(
  "fixed top-0 z-50 w-full transition-all duration-300",
  scrolled
    ? "border-b border-border/40 bg-midnight/95 backdrop-blur-md"
    : "bg-transparent"
)}
```

**3. Full-screen mobile overlay (NAV-03):**
Replace the current mobile menu `div` with a full-screen overlay:
- When open: `fixed inset-0 z-40 bg-midnight flex flex-col items-center justify-center`
- The overlay should cover the entire viewport (not just slide down below the header)
- Nav links should be centered vertically with larger text: `text-2xl font-heading font-bold`
- Each link should have `text-off-white hover:text-gold` styling
- Add spacing between links: `space-y-6`
- The CTA button ("Schedule a Showing") should appear below the links with gold styling
- The close button (X) should be in the top-right corner, `absolute top-5 right-5`
- Add the phone number in the overlay too, below the CTA

When the overlay is open, the hamburger button in the header should show the X icon. But since the overlay covers the header, also put an X close button inside the overlay itself.

IMPORTANT: Add `useEffect` to prevent body scroll when mobile menu is open:
```
useEffect(() => {
  if (mobileOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  return () => { document.body.style.overflow = ''; };
}, [mobileOpen]);
```

**4. Styled text logo (BRAND-04):**
Update the logo area to use a styled text treatment for "TAURO" instead of plain text. The logo link should render:
```tsx
<Link href="/" className="flex items-center gap-2">
  <span className="font-heading text-2xl font-bold tracking-wider text-gold">TAURO</span>
  <span className="hidden sm:inline text-xs font-label uppercase tracking-[0.2em] text-off-white/70">Realty</span>
</Link>
```
This uses Playfair Display (via font-heading) for the wordmark and Montserrat (via font-label) for the subtitle. NOTE: The actual Zorro/bull-inspired logo asset will be swapped in when the designer delivers it. This styled text treatment serves as the brand-consistent placeholder.

**5. Wrap CTA button with GoldShimmer (BRAND-03 integration):**
Import GoldShimmer: `import { GoldShimmer } from "@/components/ui/gold-shimmer"`
Wrap the desktop "Schedule a Showing" CTA button with `<GoldShimmer>`:
```tsx
<GoldShimmer>
  <Button variant="default" className="bg-gold text-midnight hover:bg-gold-light font-label uppercase tracking-wide text-sm">
    Schedule a Showing
  </Button>
</GoldShimmer>
```
Do the same for the CTA in the mobile overlay.

Keep the existing desktop nav and desktop CTA section structure. Only modify the mobile menu, add scroll behavior, update logo, and wrap CTAs.
  </action>
  <verify>
`grep "useEffect" src/components/navbar.tsx` — should find scroll listener and body overflow lock
`grep "scrolled" src/components/navbar.tsx` — should find scroll state
`grep "bg-transparent" src/components/navbar.tsx` — should find transparent state
`grep "fixed inset-0" src/components/navbar.tsx` — should find full-screen overlay
`grep '"Sell"' src/components/navbar.tsx` — should find the Sell nav link
`grep '"Home"' src/components/navbar.tsx` — should NOT find Home link
`grep "GoldShimmer" src/components/navbar.tsx` — should find GoldShimmer import and usage
`grep "font-heading" src/components/navbar.tsx` — should find styled TAURO text logo
`npx next build 2>&1 | tail -5` — build succeeds
  </verify>
  <done>Navbar shows correct 5 nav items (Properties, Agents, Sell, About, Contact). Header transitions from transparent to solid on scroll. Mobile menu is a full-screen centered overlay with body scroll lock. Logo uses styled "TAURO" text in Playfair Display with "Realty" subtitle in Montserrat. Desktop and mobile CTA buttons wrapped with GoldShimmer.</done>
</task>

<task type="auto">
  <name>Task 2: Add social icons to Footer with GoldShimmer</name>
  <files>src/components/footer.tsx</files>
  <action>
Update footer.tsx to add social media icons (NAV-04) and integrate GoldShimmer micro-interaction:

1. Add imports:
   - From lucide-react: `Instagram`, `Facebook`, `Linkedin` (lucide-react has all three)
   - From gold-shimmer: `import { GoldShimmer } from "@/components/ui/gold-shimmer"`

2. Add a social links section in the "Contact" column (the 4th column), after the existing contact items. Wrap each social icon link with GoldShimmer so the shimmer effect is visible and testable:

```tsx
<li className="pt-2">
  <div className="flex items-center gap-3">
    <GoldShimmer>
      <a
        href="https://instagram.com/taurorealty"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:text-gold"
      >
        <Instagram className="size-5" />
      </a>
    </GoldShimmer>
    <GoldShimmer>
      <a
        href="https://facebook.com/taurorealty"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:text-gold"
      >
        <Facebook className="size-5" />
      </a>
    </GoldShimmer>
    <GoldShimmer>
      <a
        href="https://linkedin.com/company/taurorealty"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:text-gold"
      >
        <Linkedin className="size-5" />
      </a>
    </GoldShimmer>
  </div>
</li>
```

3. Also update the Quick Links to match the new nav structure. Replace:
   - "Browse Properties" -> "Properties" (href: /properties)
   - "Our Agents" -> "Agents" (href: /agents)
   - Keep "About Tauro" and "Contact Us"
   - Add "Sell Your Home" (href: /sell)
   - Remove "Neighborhoods" from quick links (it has its own column)

Keep the overall footer structure (4-column grid, bottom bar with copyright/legal links) exactly the same.
  </action>
  <verify>
`grep "Instagram" src/components/footer.tsx` — should find Instagram import/usage
`grep "Facebook" src/components/footer.tsx` — should find Facebook import/usage
`grep "Linkedin" src/components/footer.tsx` — should find LinkedIn import/usage
`grep "Sell" src/components/footer.tsx` — should find Sell link
`grep "GoldShimmer" src/components/footer.tsx` — should find GoldShimmer import and usage on social links
`npx next build 2>&1 | tail -5` — build succeeds
  </verify>
  <done>Footer displays Instagram, Facebook, and LinkedIn social icons each wrapped with GoldShimmer for visible shimmer hover effect. Quick links updated to match site navigation. All links have proper aria-labels and open in new tabs. Build passes.</done>
</task>

</tasks>

<verification>
1. Navbar shows 5 links: Properties, Agents, Sell, About, Contact (no Home, no Neighborhoods)
2. Header is transparent at page top, becomes solid midnight with blur on scroll
3. Mobile hamburger opens a full-screen overlay menu
4. Logo displays styled "TAURO" text in Playfair Display with Montserrat subtitle
5. Footer has Instagram, Facebook, LinkedIn icons that hover gold with shimmer effect
6. GoldShimmer is imported and used in both navbar.tsx (CTA) and footer.tsx (social icons)
7. `npx next build` succeeds with no errors
</verification>

<success_criteria>
- NAV-01: Header shows Properties, Agents, Sell, About, Contact navigation
- NAV-02: Header transitions from transparent to solid background on scroll (threshold ~50px)
- NAV-03: Mobile menu is a full-screen overlay with centered links, body scroll locked when open
- NAV-04: Footer has social icons (Instagram, Facebook, LinkedIn), contact info, and quick links
- BRAND-04: Logo area shows styled "TAURO" wordmark in Playfair Display (actual logo asset to be swapped when available)
- BRAND-03 integration: Gold shimmer hover effect visible on navbar CTA button and footer social icon links
- Build passes with no errors
</success_criteria>

<output>
After completion, create `.planning/phases/1-design-system-layout-shell/1-03-SUMMARY.md`
</output>
