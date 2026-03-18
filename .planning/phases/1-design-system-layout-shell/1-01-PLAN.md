---
phase: 1-design-system-layout-shell
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/app/globals.css
  - src/app/layout.tsx
autonomous: true

must_haves:
  truths:
    - "Site renders with correct brand colors: midnight #1A1A1A, gold #C9A84C, oxblood #8B0000, off-white #F5F0E8"
    - "Headings use Playfair Display, body text uses DM Sans, labels/CTAs use Montserrat"
    - "Dark mode is the default with all CSS variables using correct hex values"
  artifacts:
    - path: "src/app/globals.css"
      provides: "Brand color tokens and typography CSS variables"
      contains: "#1A1A1A"
    - path: "src/app/layout.tsx"
      provides: "Font loading for Playfair Display, DM Sans, Montserrat"
      contains: "DM_Sans"
  key_links:
    - from: "src/app/layout.tsx"
      to: "src/app/globals.css"
      via: "CSS variable font families"
      pattern: "--font-(dm-sans|montserrat|playfair)"
---

<objective>
Fix brand color tokens and typography to match Tauro brand spec (BRAND-01, BRAND-02).

Purpose: The existing codebase has wrong hex values for all brand colors and uses Inter instead of DM Sans for body text. Montserrat for labels/CTAs is completely missing. This plan corrects the design system foundation that every subsequent component depends on.

Output: Updated globals.css with correct brand tokens, updated layout.tsx with correct font imports.
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-plan.md
@~/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@src/app/globals.css
@src/app/layout.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix brand color tokens in globals.css</name>
  <files>src/app/globals.css</files>
  <action>
Update ALL brand color values in globals.css to match the Tauro brand spec:

1. In the `@theme inline` block, update these color variables:
   - `--color-midnight: #1A1A1A` (was #1A1A2E)
   - `--color-gold: #C9A84C` (was #C9A96E)
   - `--color-gold-light: #D4B96A` (was #D4BC8A — lighten the new gold proportionally)
   - `--color-gold-dark: #A8893D` (was #B08E4A — darken the new gold proportionally)
   - `--color-near-black: #111111` (was #0F0F1A — keep near-black neutral, not blue-tinted)
   - ADD `--color-oxblood: #8B0000` (new — does not exist yet)
   - ADD `--color-off-white: #F5F0E8` (new — the warm off-white from the brand spec)
   - REMOVE `--color-bold-red: #E94560` (replace with oxblood as the red)

2. In the `:root` (light mode) block, update:
   - `--primary: #1A1A1A` (was #1A1A2E)
   - `--secondary: #F5F0E8` (was #F5F3F0)
   - `--muted: #F5F0E8` (was #F5F3F0)
   - `--accent: #C9A84C` (was #C9A96E)
   - `--foreground: #111111` (was #0F0F1A)
   - `--card-foreground: #111111`
   - `--popover-foreground: #111111`
   - `--secondary-foreground: #1A1A1A`
   - `--destructive: #8B0000` (was #E94560 — use oxblood)
   - `--ring: #C9A84C` (was #C9A96E)
   - `--accent-foreground: #111111`

3. In the `.dark` block, update:
   - `--background: #111111` (was #0F0F1A)
   - `--foreground: #F5F0E8` (was #F5F3F0)
   - `--card: #1A1A1A` (was #1A1A2E)
   - `--card-foreground: #F5F0E8`
   - `--popover: #1A1A1A`
   - `--popover-foreground: #F5F0E8`
   - `--primary: #C9A84C` (was #C9A96E)
   - `--primary-foreground: #111111`
   - `--secondary: #1A1A1A` (was #1A1A2E)
   - `--secondary-foreground: #F5F0E8`
   - `--muted: #1A1A1A` (was #1A1A2E)
   - `--accent: #C9A84C`
   - `--accent-foreground: #111111`
   - `--destructive: #8B0000`
   - `--border: #2A2A2A` (was #2A2A3E — neutral, not blue)
   - `--input: #2A2A2A`
   - `--ring: #C9A84C`

4. Update the `--font-sans` in `@theme inline` to reference `--font-dm-sans` instead of `--font-inter`.

5. Add a new font variable: `--font-label: var(--font-montserrat)` in the `@theme inline` block.

IMPORTANT: Do NOT change any structural CSS, class names, or the @import statements. Only change color hex values and font variable references.
  </action>
  <verify>
Run `grep -c "1A1A2E\|C9A96E\|F5F3F0\|0F0F1A\|E94560\|2A2A3E" src/app/globals.css` — should return 0 (no old values remain).
Run `grep -c "1A1A1A\|C9A84C\|F5F0E8\|8B0000" src/app/globals.css` — should return multiple matches.
Run `grep "font-sans" src/app/globals.css` — should reference dm-sans.
  </verify>
  <done>All brand colors match spec: midnight #1A1A1A, gold #C9A84C, oxblood #8B0000, off-white #F5F0E8. No old hex values remain. Font-sans points to DM Sans.</done>
</task>

<task type="auto">
  <name>Task 2: Replace Inter with DM Sans and add Montserrat font loading</name>
  <files>src/app/layout.tsx</files>
  <action>
Update the font imports and configuration in layout.tsx:

1. Change the import line from:
   `import { Playfair_Display, Inter } from "next/font/google"`
   to:
   `import { Playfair_Display, DM_Sans, Montserrat } from "next/font/google"`

2. Replace the `inter` font config with `dmSans`:
   ```
   const dmSans = DM_Sans({
     variable: "--font-dm-sans",
     subsets: ["latin"],
     display: "swap",
   });
   ```

3. Add Montserrat config:
   ```
   const montserrat = Montserrat({
     variable: "--font-montserrat",
     subsets: ["latin"],
     display: "swap",
     weight: ["500", "600", "700"],
   });
   ```

4. Update the body className to use the new font variables:
   Change `${playfair.variable} ${inter.variable}` to `${playfair.variable} ${dmSans.variable} ${montserrat.variable}`

Keep everything else in layout.tsx exactly the same (metadata, html attributes, etc).
  </action>
  <verify>
Run `npx next build 2>&1 | tail -20` — build should succeed (or at minimum, no font-related errors).
Run `grep "DM_Sans" src/app/layout.tsx` — should find the import.
Run `grep "Montserrat" src/app/layout.tsx` — should find the import.
Run `grep "Inter" src/app/layout.tsx` — should return nothing (Inter fully removed).
  </verify>
  <done>Body text uses DM Sans via --font-dm-sans CSS variable. Montserrat available via --font-montserrat for labels/CTAs. Inter completely removed. Build passes.</done>
</task>

</tasks>

<verification>
1. `grep -r "Inter" src/app/layout.tsx` returns nothing
2. `grep "#C9A84C" src/app/globals.css` returns multiple matches
3. `grep "#1A1A1A" src/app/globals.css` returns multiple matches
4. `grep "#8B0000" src/app/globals.css` returns matches (oxblood)
5. `grep "#F5F0E8" src/app/globals.css` returns matches (off-white)
6. `grep "DM_Sans" src/app/layout.tsx` returns a match
7. `grep "Montserrat" src/app/layout.tsx` returns a match
8. `npx next build` succeeds without errors
</verification>

<success_criteria>
- All four brand colors present in globals.css: midnight #1A1A1A, gold #C9A84C, oxblood #8B0000, off-white #F5F0E8
- Zero references to old incorrect hex values (#1A1A2E, #C9A96E, #F5F3F0, #E94560)
- DM Sans loaded and set as default body font
- Montserrat loaded and available via CSS variable for labels/CTAs
- Inter fully removed from the project
- Build passes successfully
</success_criteria>

<output>
After completion, create `.planning/phases/1-design-system-layout-shell/1-01-SUMMARY.md`
</output>
