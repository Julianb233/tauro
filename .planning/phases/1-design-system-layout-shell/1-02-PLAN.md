---
phase: 1-design-system-layout-shell
plan: 02
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/ui/gold-shimmer.tsx
  - src/components/ui/tilt-card.tsx
  - src/app/globals.css
autonomous: true

must_haves:
  truths:
    - "Gold shimmer effect plays on hover over buttons and interactive elements"
    - "Cards tilt subtly in 3D when the cursor moves over them"
    - "Micro-interactions are reusable components/utilities, not one-off inline styles"
  artifacts:
    - path: "src/components/ui/gold-shimmer.tsx"
      provides: "GoldShimmer wrapper component with CSS shimmer animation on hover"
      min_lines: 20
    - path: "src/components/ui/tilt-card.tsx"
      provides: "TiltCard wrapper component with 3D perspective tilt on mouse move"
      min_lines: 30
  key_links:
    - from: "src/components/ui/gold-shimmer.tsx"
      to: "src/app/globals.css"
      via: "CSS keyframes for shimmer animation"
      pattern: "@keyframes.*shimmer"
    - from: "src/components/ui/tilt-card.tsx"
      to: "react"
      via: "useRef and mouse event handlers for 3D transform"
      pattern: "onMouseMove|transform.*perspective"
---

<objective>
Create reusable micro-interaction components for BRAND-03: gold shimmer hover effect and 3D card tilt.

Purpose: The Tauro brand spec requires signature micro-interactions (gold shimmer on hover, 3D card tilt) that appear throughout the site. Building these as standalone components now means every future page can import and use them without reimplementation.

Output: Two new React components (GoldShimmer, TiltCard) and supporting CSS keyframes.
</objective>

<execution_context>
@~/.claude/get-shit-done/workflows/execute-plan.md
@~/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@src/app/globals.css
@src/lib/utils.ts
@src/components/ui/button.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create GoldShimmer hover effect component</name>
  <files>src/components/ui/gold-shimmer.tsx, src/app/globals.css</files>
  <action>
1. Create `src/components/ui/gold-shimmer.tsx` — a wrapper component that adds a gold shimmer animation on hover.

The component should:
- Be a "use client" component
- Accept `children`, `className`, and standard div props
- Use `cn()` from `@/lib/utils` for class merging
- Render a `div` with `position: relative; overflow: hidden`
- On hover, show a diagonal gold shimmer streak (a pseudo-element or inner div) that sweeps left-to-right across the element
- The shimmer should use the gold color (#C9A84C at ~30% opacity)
- Animation duration: ~0.6s ease-in-out
- The component should be generic — usable on buttons, cards, links, anything
- Export as named export: `export function GoldShimmer({ ... })`

Implementation approach:
- Use a CSS class `.gold-shimmer` that has a `::before` pseudo-element (the shimmer streak)
- The pseudo-element is `position: absolute`, skewed, with a linear-gradient (transparent -> gold/30% -> transparent)
- On hover, translate the pseudo-element from left to right using a CSS animation
- Add the `@keyframes gold-shimmer-sweep` to globals.css at the bottom of the file

2. Add to the BOTTOM of `src/app/globals.css` (after the existing body/heading rules):

```css
/* Gold shimmer micro-interaction */
@keyframes gold-shimmer-sweep {
  0% {
    transform: translateX(-100%) skewX(-15deg);
  }
  100% {
    transform: translateX(200%) skewX(-15deg);
  }
}

.gold-shimmer {
  position: relative;
  overflow: hidden;
}

.gold-shimmer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(201, 168, 76, 0.3),
    transparent
  );
  transform: translateX(-100%) skewX(-15deg);
  transition: none;
  z-index: 1;
  pointer-events: none;
}

.gold-shimmer:hover::before {
  animation: gold-shimmer-sweep 0.6s ease-in-out;
}
```

The React component is a thin wrapper that applies the `.gold-shimmer` class plus any custom className, and renders children with `position: relative; z-index: 2` so content stays above the shimmer.
  </action>
  <verify>
File exists: `ls src/components/ui/gold-shimmer.tsx`
CSS keyframes exist: `grep "gold-shimmer-sweep" src/app/globals.css`
Component exports: `grep "export function GoldShimmer" src/components/ui/gold-shimmer.tsx`
  </verify>
  <done>GoldShimmer component exists and applies a diagonal gold sweep animation on hover. CSS keyframes defined in globals.css. Component is importable from @/components/ui/gold-shimmer.</done>
</task>

<task type="auto">
  <name>Task 2: Create TiltCard 3D perspective component</name>
  <files>src/components/ui/tilt-card.tsx</files>
  <action>
Create `src/components/ui/tilt-card.tsx` — a wrapper component that applies a subtle 3D tilt effect based on mouse position.

The component should:
- Be a "use client" component
- Accept `children`, `className`, `maxTilt` (default 8 degrees), and standard div props
- Use `useRef` for the card element reference
- Use `cn()` from `@/lib/utils`
- On `onMouseMove`: Calculate the cursor position relative to the card center, compute rotateX and rotateY values (max tilt configurable, default 8 degrees), apply `transform: perspective(800px) rotateX(Xdeg) rotateY(Ydeg)` via inline style
- On `onMouseLeave`: Reset transform to `perspective(800px) rotateX(0deg) rotateY(0deg)` with a smooth transition
- Use CSS `transition: transform 0.15s ease-out` for smooth movement
- On mouse leave, use `transition: transform 0.4s ease-out` for a slower snap-back
- Export as named export: `export function TiltCard({ ... })`

Implementation details:
- Use `useState` for the current transform style
- Calculate tilt: `rotateY = ((mouseX - centerX) / halfWidth) * maxTilt` and `rotateX = -((mouseY - centerY) / halfHeight) * maxTilt` (negative for natural tilt direction)
- The card should have `will-change: transform` for GPU acceleration
- Add `transform-style: preserve-3d` to the container

Do NOT use any external libraries. Pure React + CSS.
  </action>
  <verify>
File exists: `ls src/components/ui/tilt-card.tsx`
Component exports: `grep "export function TiltCard" src/components/ui/tilt-card.tsx`
Uses perspective: `grep "perspective" src/components/ui/tilt-card.tsx`
Uses mouse events: `grep "onMouseMove" src/components/ui/tilt-card.tsx`
  </verify>
  <done>TiltCard component exists, applies 3D perspective tilt on mouse move with configurable max angle, smooth transitions on hover and leave. No external dependencies. Importable from @/components/ui/tilt-card.</done>
</task>

</tasks>

<verification>
1. `ls src/components/ui/gold-shimmer.tsx src/components/ui/tilt-card.tsx` — both files exist
2. `grep "@keyframes gold-shimmer" src/app/globals.css` — keyframes defined
3. `grep "export function GoldShimmer" src/components/ui/gold-shimmer.tsx` — exported
4. `grep "export function TiltCard" src/components/ui/tilt-card.tsx` — exported
5. `grep "perspective" src/components/ui/tilt-card.tsx` — 3D perspective used
6. `npx next build` succeeds — no type errors or import issues
</verification>

<success_criteria>
- GoldShimmer component renders a gold diagonal sweep animation on hover
- TiltCard component applies 3D perspective tilt following mouse position
- Both components are "use client" and work in Next.js App Router
- Both use cn() for class merging and accept className prop
- No external animation libraries used (pure CSS + React)
- Build passes with no errors
</success_criteria>

<output>
After completion, create `.planning/phases/1-design-system-layout-shell/1-02-SUMMARY.md`
</output>
