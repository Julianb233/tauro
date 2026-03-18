# Tauro — Design System

**Project**: LYL Realty Group Brokerage Website
**Brand Name**: Tauro
**Design Direction**: Premium Philadelphia real estate — cinematic, dark, bold, luxurious
**Reference Brands**: Compass, SERHANT, The Agency

---

## Color Palette

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `--black` | Near Black | `#0D0D0D` | Page backgrounds |
| `--rich-black` | Rich Black | `#1A1A1A` | Card backgrounds, navbars, sidebars |
| `--gold` | Antique Gold | `#C9A84C` | Primary accent: CTAs, borders, labels, highlights |
| `--gold-light` | Gold Light | `#E2C97E` | Hover states on gold elements |
| `--oxblood` | Oxblood Red | `#8B0000` | Urgency badges (New, Featured), accent dividers |
| `--cream` | Warm Off-White | `#F5F0E8` | Primary text |
| `--cream-muted` | Muted Cream | `#B8B0A0` | Secondary text, labels, metadata |
| `--border` | Gold Border | `rgba(201,168,76,0.18)` | Section borders, card borders |
| `--border-subtle` | Subtle Border | `rgba(255,255,255,0.06)` | Internal dividers, list separators |

---

## Typography

| Family | Weights | Usage |
|--------|---------|-------|
| **Playfair Display** | 400, 600, 700, 900 | All headings (H1–H3), prices, numbers |
| **DM Sans** | 300, 400, 500 | Body text, descriptions, paragraphs |
| **Montserrat** | 400, 500, 600, 700 | Labels, CTAs, navigation, badges, eyebrows |

### Type Scale
| Element | Family | Size | Weight | Notes |
|---------|--------|------|--------|-------|
| Page H1 | Playfair Display | 64–88px | 900 | Hero headlines, cinematic |
| Section H2 | Playfair Display | 30–42px | 700 | Section titles |
| Card H3 | Playfair Display | 18–26px | 600 | Property prices, card titles |
| Eyebrow | Montserrat | 10–11px | 600 | ALL CAPS, letter-spacing: 3px, gold |
| Nav Link | Montserrat | 10px | 600 | ALL CAPS, letter-spacing: 2px |
| Body | DM Sans | 14–17px | 400 | Descriptions, paragraphs, line-height: 1.7–1.8 |
| Small | DM Sans | 12–13px | 400 | Metadata, dates, supporting info |
| CTA Button | Montserrat | 11px | 700 | ALL CAPS, letter-spacing: 2px |

---

## Spacing

- Base unit: `8px`
- Page padding: `80px` (desktop), `24px` (mobile)
- Section vertical padding: `80–100px`
- Component gap: `2px` (cinematic "seam" between cards)
- Card padding: `20–32px`
- Border radius: **0** (sharp, angular — Zorro aesthetic)

---

## Component Patterns

### Navigation
- Fixed header, `72–80px` height
- Logo: `TAURO` in Playfair Display, gold, letter-spacing: 2px
- Links: Montserrat 10px, ALL CAPS, `--cream-muted` default, `--gold` hover
- CTA: Gold filled button, right aligned
- Transparent on hero pages, `--rich-black` on interior pages
- Border-bottom: `1px solid var(--border)`

### Buttons
- **Primary**: `background: var(--gold)`, `color: var(--black)`, Montserrat 11px 700, no border-radius
- **Secondary**: `border: 1px solid var(--gold)`, `color: var(--gold)`, transparent bg
- **Disabled**: 40% opacity
- Padding: `14–18px 28–36px`
- Hover: gold → gold-light

### Cards
- Background: `var(--rich-black)`
- Border: `1px solid var(--border-subtle)`
- Hover: `translateY(-4px)` + border-color → `var(--gold)`
- Images: `filter: brightness(0.85–0.9)`, darken on hover
- Image hover: `scale(1.05–1.08)` transition

### Badges
- Gold (featured): `background: var(--gold)`, `color: var(--black)`
- Oxblood (new/urgent): `background: var(--oxblood)`, `color: var(--cream)`
- Dark (subtle): semi-transparent dark with gold border
- Font: Montserrat 9px, 700, ALL CAPS, letter-spacing: 2px
- Padding: `5–6px 10–12px`, no border-radius

### Forms
- Input background: `rgba(255,255,255,0.04)`
- Input border: `1px solid var(--border-subtle)`
- Label: Montserrat 9px, 700, ALL CAPS, gold
- Focus: border-color → `var(--gold)`
- Color: `var(--cream)`
- No border-radius

### Gold Accent Lines
- Section borders: `1px solid var(--border)`
- Vertical decorative: thin `2px` gold line (diagonal/vertical slash accent)
- Horizontal dividers: `1px solid var(--border-subtle)`
- Before/after pseudo-elements for decorative lines in eyebrows

---

## Page Templates

### 1. Homepage (`/`)
- Full-bleed cinematic hero (100vh) with video background
- Stats band (fixed to bottom of hero)
- Featured properties 3-column grid
- Why Tauro section (2-col: text + pillars)
- Neighborhood scroll (horizontal)

### 2. Property Listing (`/properties`)
- Sidebar filters (300px) + main grid
- 3-column card grid
- Toolbar: sort select, view toggle (grid/map/list)
- Active filter chips
- Pagination

### 3. Property Detail (`/properties/[slug]`)
- Full-bleed gallery (grid: 2fr 1fr)
- 2-col layout: main content + sticky sidebar
- Sidebar: showing date/time picker + contact form

### 4. Agent Profile (`/agents/[slug]`)
- Hero section with agent photo (full-bleed, gradient overlay)
- Stats band (5 columns)
- 2-col: bio/content + sticky contact form sidebar

### 5. Neighborhood Area (`/neighborhoods/[area]`)
- Hero with full-bleed neighborhood photo
- Quick stats band (5 columns)
- 2-col: content + sticky sidebar
- Lifestyle photo grid
- Horizontal listings strip

### 6. Proposal (`/proposal`)
- Single-column hero with brand pattern
- 2-col: scope/timeline + pricing card (sticky)
- Deliverables list with checkmarks
- Timeline component
- Payment CTA buttons

---

## Motion & Interactions

| Interaction | Effect |
|-------------|--------|
| Property card hover | `translateY(-4px)` + image scale(1.06) |
| Image hover | `brightness` drops to 0.7 |
| Nav link hover | Color transition to gold (200ms) |
| Gallery images | Lightbox open transition |
| Hero scroll | Parallax on background image |
| Neighborhood cards | Image scale + brightness |
| Gold shimmer | Keyframe shimmer on gold elements (subtle) |
| Filter chip select | Border-color + background-color transition |
| Button hover | Background color transition (200ms) |

---

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| Dark mode default | Premium, cinematic, sets Tauro apart from competitor beige sites |
| 0px border-radius | Angular Zorro aesthetic — blade-like sharpness |
| 2px gaps between cards | Cinematic "filmstrip" separation without whitespace |
| Playfair for prices | Serif numerals feel authoritative and premium |
| Oxblood as urgency color | Distinct from gold, avoids green (common in real estate) |
| Montserrat ALL CAPS | Luxury brand convention — authority without harshness |
| Sticky sidebars | Lead capture always visible, reduces friction |
| Photo darkening | Dark overlay maintains readability + brand mood |

---

## Assets Required from Client

- [ ] TAURO wordmark / logo (SVG)
- [ ] Agent professional headshots (min 800×800px)
- [ ] Property photography (min 10 properties, 8+ photos each)
- [ ] Neighborhood lifestyle photography (min 3 per neighborhood)
- [ ] Agent bios and credentials
- [ ] GoHighLevel webhook URL + field mapping
- [ ] Target domain name
- [ ] Brand style guide (if existing)

---

*Last updated: 2026-03-18 · AI-3453*
