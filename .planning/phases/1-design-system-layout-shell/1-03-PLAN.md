---
phase: 1-design-system-layout-shell
plan: 03
type: execute
wave: 2
depends_on: ["1-01"]
files_modified:
  - src/components/navbar.tsx
  - src/components/footer.tsx
autonomous: true

must_haves:
  truths:
    - "Header is fixed, shows correct nav items (Properties, Agents, Sell, About, Contact), transitions to transparent on scroll"
    - "Mobile nav opens a full-screen overlay menu covering the entire viewport"
    - "Footer displays social icons (Instagram, Facebook, LinkedIn) alongside links and contact info"
  artifacts:
    - path: "src/components/navbar.tsx"
      provides: "Fixed header with scroll transparency transition and correct nav links"
      contains: "useEffect"
    - path: "src/components/footer.tsx"
      provides: "Footer with social media icon links"
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
---

<objective>
Refine the Navbar and Footer to fully satisfy NAV-01 through NAV-04 requirements.

Purpose: The existing navbar and footer are functional but have wrong nav links, no scroll transparency transition, a basic mobile menu (not full-screen overlay), and no social icons in the footer. This plan fixes all four NAV requirements.

Output: Updated navbar.tsx with scroll behavior and correct links, updated footer.tsx with social icons.
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-plan.md
@~/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/phases/1-design-system-layout-shell/1-01-SUMMARY.md
@src/components/navbar.tsx
@src/components/footer.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update Navbar — correct links, scroll transparency, full-screen mobile overlay</name>
  <files>src/components/navbar.tsx</files>
  <action>
Make three changes to navbar.tsx:

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

Keep the existing logo, desktop nav, and desktop CTA section structure. Only modify the mobile menu and add scroll behavior.
  </action>
  <verify>
`grep "useEffect" src/components/navbar.tsx` — should find scroll listener and body overflow lock
`grep "scrolled" src/components/navbar.tsx` — should find scroll state
`grep "bg-transparent" src/components/navbar.tsx` — should find transparent state
`grep "fixed inset-0" src/components/navbar.tsx` — should find full-screen overlay
`grep '"Sell"' src/components/navbar.tsx` — should find the Sell nav link
`grep '"Home"' src/components/navbar.tsx` — should NOT find Home link
`npx next build 2>&1 | tail -5` — build succeeds
  </verify>
  <done>Navbar shows correct 5 nav items (Properties, Agents, Sell, About, Contact). Header transitions from transparent to solid on scroll. Mobile menu is a full-screen centered overlay with body scroll lock.</done>
</task>

<task type="auto">
  <name>Task 2: Add social icons to Footer</name>
  <files>src/components/footer.tsx</files>
  <action>
Update footer.tsx to add social media icons (NAV-04):

1. Add SVG icon imports or use lucide-react icons. Lucide has `Instagram` but not Facebook/LinkedIn as standard icons. Use this approach:
   - Import from lucide-react: `Instagram`
   - For Facebook and LinkedIn, create simple inline SVG components or use lucide's generic icons. Actually, lucide-react DOES have `Facebook` and `Linkedin` icons — import those:
   `import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from "lucide-react"`

2. Add a social links section in the "Contact" column (the 4th column), after the existing contact items. Add a horizontal row of social icon links:

```tsx
<li className="pt-2">
  <div className="flex items-center gap-3">
    <a
      href="https://instagram.com/taurorealty"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="text-muted-foreground transition-colors hover:text-gold"
    >
      <Instagram className="size-5" />
    </a>
    <a
      href="https://facebook.com/taurorealty"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="text-muted-foreground transition-colors hover:text-gold"
    >
      <Facebook className="size-5" />
    </a>
    <a
      href="https://linkedin.com/company/taurorealty"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="text-muted-foreground transition-colors hover:text-gold"
    >
      <Linkedin className="size-5" />
    </a>
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
`npx next build 2>&1 | tail -5` — build succeeds
  </verify>
  <done>Footer displays Instagram, Facebook, and LinkedIn social icons with hover:text-gold effect. Quick links updated to match site navigation. All links have proper aria-labels and open in new tabs.</done>
</task>

</tasks>

<verification>
1. Navbar shows 5 links: Properties, Agents, Sell, About, Contact (no Home, no Neighborhoods)
2. Header is transparent at page top, becomes solid midnight with blur on scroll
3. Mobile hamburger opens a full-screen overlay menu
4. Footer has Instagram, Facebook, LinkedIn icons that hover gold
5. `npx next build` succeeds with no errors
</verification>

<success_criteria>
- NAV-01: Header shows Properties, Agents, Sell, About, Contact navigation
- NAV-02: Header transitions from transparent to solid background on scroll (threshold ~50px)
- NAV-03: Mobile menu is a full-screen overlay with centered links, body scroll locked when open
- NAV-04: Footer has social icons (Instagram, Facebook, LinkedIn), contact info, and quick links
- Build passes with no errors
</success_criteria>

<output>
After completion, create `.planning/phases/1-design-system-layout-shell/1-03-SUMMARY.md`
</output>
