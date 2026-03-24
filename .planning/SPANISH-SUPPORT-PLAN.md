# Spanish Language Support Plan — Tauro Realty

**Created:** 2026-03-24
**Status:** Planning (no implementation yet)
**Priority:** Medium — scheduled for future phase

---

## 1. Current State Audit

### Stack
- **Framework:** Next.js 16 (App Router) with `src/` directory
- **Styling:** Tailwind CSS v4
- **Backend:** Supabase (PostgreSQL)
- **Deployment:** Vercel
- **Monitoring:** Sentry
- **Components:** 69 components, 246 total TS/TSX files

### Existing i18n: None
- No translation files, locale configs, or i18n libraries exist
- All UI strings are hardcoded in JSX across components
- `html lang="en"` is hardcoded in root layout
- OpenGraph locale is `en_US`
- No middleware.ts exists (will need to create one)

### Route Structure (public site)
```
src/app/(site)/          — Main marketing pages (homepage, about, sell, etc.)
src/app/properties/      — Property listings + detail pages
src/app/(auth)/          — Login
src/app/dashboard/       — Internal admin dashboard
src/app/proposal/        — Proposal pages
src/app/api/             — API routes
```

### Key Pages Requiring Translation (public-facing)
1. Homepage (`/`)
2. Properties listing (`/properties`)
3. Property detail (`/properties/[slug]`)
4. Contact (`/contact`)
5. About (`/about`)
6. Sell (`/sell`)
7. Agents (`/agents`)
8. Neighborhoods (`/neighborhoods`)
9. Buyers Guide (`/buyers-guide`)
10. Sellers Guide (`/sellers-guide`)
11. FAQ (`/faq`)
12. Blog (`/blog`) — content translation is separate concern
13. Home Value (`/home-value`)
14. Book Tour (`/book-tour`)

### Pages NOT needing translation (internal)
- Dashboard (admin-only, English is fine)
- Auth pages (minimal UI)
- API routes
- Proposal pages (internal tool)

---

## 2. i18n Approach Evaluation

### Option A: `next-intl` (RECOMMENDED)

**What it is:** The most popular i18n library for Next.js App Router. 5M+ monthly downloads, actively maintained, first-class RSC support.

**How it works:**
- JSON translation files per locale (`messages/en.json`, `messages/es.json`)
- Middleware handles locale detection and routing
- `[locale]` dynamic segment wraps all routes
- `useTranslations()` hook for client components
- `getTranslations()` for server components
- ICU message format for plurals, variables, etc.

**Pros:**
- Best App Router + RSC support (server components get translations without client JS)
- Built-in middleware for locale detection, cookie persistence, redirects
- Type-safe with TypeScript (auto-complete for translation keys)
- Supports `localePrefix: 'as-needed'` — no `/en/` prefix for default locale
- Localized pathnames (`/properties` -> `/es/propiedades`)
- Battle-tested with Next.js 14/15/16
- Excellent documentation

**Cons:**
- Requires restructuring route tree under `[locale]` segment
- All components need refactoring to use `useTranslations()` / `getTranslations()`
- One more dependency

**Effort:** Medium-high (restructure + extract strings)

### Option B: `next-i18next`

**Pros:** Very popular, good ecosystem
**Cons:** Primarily designed for Pages Router. App Router support is limited and unofficial. Not recommended for new App Router projects.

**Verdict:** Skip — not suitable for App Router.

### Option C: Built-in Next.js i18n Routing

**What it is:** Next.js has built-in `i18n` config in `next.config.js` for locale routing.

**Pros:** No extra dependency
**Cons:**
- Only available for Pages Router (`next.config.js` `i18n` key)
- App Router has NO built-in i18n — you must handle it yourself or use a library
- Would require building middleware, context providers, and translation loading from scratch

**Verdict:** Skip — too much custom work, reinvents what next-intl already does.

### Option D: Content Layer Translation (separate JSON/MDX per locale)

**What it is:** Keep routing as-is, load different content files based on a locale cookie/param.

**Pros:** Minimal route changes, flexible
**Cons:**
- No URL-based locale (`/es/...`), bad for SEO
- Must build all translation infrastructure manually
- No middleware for auto-detection
- Harder to maintain consistency

**Verdict:** Skip — poor SEO and too much custom code.

### RECOMMENDATION: `next-intl`

It is the clear winner for Next.js App Router projects. It handles routing, middleware, server/client components, and SEO out of the box.

---

## 3. File Structure Changes

### New Files
```
src/i18n/
  routing.ts              — defineRouting({ locales: ['en', 'es'], defaultLocale: 'en' })
  request.ts              — getRequestConfig() for loading messages

src/middleware.ts          — Locale detection + routing middleware

messages/
  en.json                 — English translations (extracted from components)
  es.json                 — Spanish translations
```

### Route Restructure
```
BEFORE:
src/app/(site)/page.tsx
src/app/(site)/about/page.tsx
src/app/properties/page.tsx
...

AFTER:
src/app/[locale]/(site)/page.tsx
src/app/[locale]/(site)/about/page.tsx
src/app/[locale]/properties/page.tsx
...
```

The `[locale]` segment wraps everything except `api/` routes.

### Layout Changes
```
BEFORE: src/app/layout.tsx         — <html lang="en">
AFTER:  src/app/[locale]/layout.tsx — <html lang={locale}>
                                      + NextIntlClientProvider
                                      + locale-aware metadata
```

### Component Changes
Every component with hardcoded English strings needs refactoring:
```tsx
// BEFORE
<h1>Find Your Place in Philadelphia</h1>

// AFTER
const t = useTranslations('Hero');
<h1>{t('title')}</h1>
```

### next.config.ts Changes
```typescript
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
// Wrap existing config (including Sentry)
```

---

## 4. Translation Workflow

### Who Translates
**Option A — Professional Translation Service (Recommended for launch)**
- Services: Gengo, Translated.com, or local Philadelphia Spanish translator
- Cost: ~$0.08-0.12/word, estimated 5,000-8,000 words for priority pages = $400-960
- Turnaround: 3-5 business days for initial batch
- Quality: Native-quality, culturally appropriate for real estate

**Option B — AI Translation + Human Review (Recommended for ongoing)**
- Use Claude/GPT to generate initial Spanish translations
- Have a bilingual team member or freelancer review for accuracy
- Cost: ~$100-200 for review pass
- Good for: blog posts, new pages, ongoing content updates

**Option C — Bilingual Agent on Team**
- If Tauro has Spanish-speaking agents, they can review/approve translations
- Best for real estate terminology accuracy

### Recommended Approach: Hybrid
1. Professional translator for initial core pages (homepage, contact, about, listings UI)
2. AI-assisted translation for content pages (blog, guides) with human review
3. Ongoing: AI draft -> team review workflow

### Translation File Management
- Keep `messages/en.json` as source of truth
- Use namespaced keys: `{ "Hero": { "title": "...", "subtitle": "..." } }`
- Consider tools like Crowdin or Lokalise if translation volume grows
- For now, JSON files in repo are sufficient

---

## 5. Priority Pages (Phase Order)

### Phase 1 — Core Pages (Week 1-2)
Highest traffic, most visible to Spanish-speaking visitors.

| Page | Route | String Count (est.) |
|------|-------|-------------------|
| Homepage | `/` | ~40 strings |
| Navbar + Footer | (shared) | ~30 strings |
| Contact | `/contact` | ~20 strings |
| Properties Listing | `/properties` | ~25 strings |
| Property Detail | `/properties/[slug]` | ~35 strings |

**Estimated total: ~150 strings**

### Phase 2 — Secondary Pages (Week 3)
| Page | Route | String Count (est.) |
|------|-------|-------------------|
| About | `/about` | ~25 strings |
| Agents | `/agents` | ~15 strings |
| Sell | `/sell` | ~30 strings |
| Home Value | `/home-value` | ~20 strings |
| Book Tour | `/book-tour` | ~15 strings |

**Estimated total: ~105 strings**

### Phase 3 — Content Pages (Week 4+)
| Page | Route | String Count (est.) |
|------|-------|-------------------|
| Buyers Guide | `/buyers-guide` | ~40 strings |
| Sellers Guide | `/sellers-guide` | ~40 strings |
| FAQ | `/faq` | ~30 strings |
| Neighborhoods | `/neighborhoods` | ~20 strings |
| Blog | `/blog` | per-post translation |

**Estimated total: ~130+ strings**

### Phase 4 — Dynamic Content
- Property descriptions (from Supabase) — need DB-level translation strategy
- Blog posts — separate translated MDX or DB field
- Email templates — separate translated versions

---

## 6. Browser Language Auto-Detection

`next-intl` middleware handles this automatically:

```typescript
// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',  // No /en/ prefix, only /es/
  localeDetection: true,       // Accept-Language header detection
});
```

**Behavior:**
1. First visit: middleware reads `Accept-Language` header
2. If browser prefers Spanish -> redirect to `/es/...`
3. Stores preference in `NEXT_LOCALE` cookie
4. Subsequent visits use cookie (user choice persists)
5. Default locale (`en`) has no URL prefix — clean URLs preserved
6. Spanish pages get `/es/` prefix: `/es/propiedades`, `/es/contacto`

---

## 7. Language Switcher UI Component

### Design
A simple dropdown or toggle in the navbar:

```
[EN | ES]  — pill toggle style matching Tauro's gold/dark aesthetic
```

### Behavior
- Shows current locale highlighted
- Clicking switches to the same page in the other language
- Uses `next-intl`'s `usePathname()` + `Link` to build correct localized URL
- Preserves all query params and scroll position
- Stores choice in cookie for persistence

### Placement
- Desktop: right side of navbar, before theme toggle
- Mobile: in hamburger menu, above sign-in button

### Implementation (conceptual)
```tsx
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex rounded-full border border-white/20 overflow-hidden">
      <button
        onClick={() => switchLocale('en')}
        className={locale === 'en' ? 'bg-gold text-near-black' : 'text-white/60'}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('es')}
        className={locale === 'es' ? 'bg-gold text-near-black' : 'text-white/60'}
      >
        ES
      </button>
    </div>
  );
}
```

---

## 8. SEO Considerations

### hreflang Tags
`next-intl` generates these automatically via Next.js metadata API:

```html
<link rel="alternate" hreflang="en" href="https://taurorealty.com/properties" />
<link rel="alternate" hreflang="es" href="https://taurorealty.com/es/propiedades" />
<link rel="alternate" hreflang="x-default" href="https://taurorealty.com/properties" />
```

### Implementation
```typescript
// In layout.tsx or page.tsx metadata
export function generateMetadata({ params }: { params: { locale: string } }) {
  return {
    alternates: {
      languages: {
        en: '/properties',
        es: '/es/propiedades',
      },
    },
  };
}
```

### Separate Sitemaps
- Generate locale-aware sitemap entries in `app/sitemap.ts`
- Each URL gets both `en` and `es` variants
- Google Search Console: verify both language versions are indexed

### Localized Metadata
- Each page needs Spanish `title` and `description` for search results
- OpenGraph tags need `locale: "es_US"` or `"es_MX"` for Spanish pages
- Structured data (JSON-LD) should include Spanish variants

### URL Strategy
```
English (default, no prefix):
  taurorealty.com/properties
  taurorealty.com/about
  taurorealty.com/contact

Spanish (with /es/ prefix):
  taurorealty.com/es/propiedades
  taurorealty.com/es/nosotros
  taurorealty.com/es/contacto
```

Using `localePrefix: 'as-needed'` keeps English URLs clean (no breaking changes) while giving Spanish pages proper indexable URLs.

### Localized Pathnames (Optional Enhancement)
```typescript
pathnames: {
  '/properties': { en: '/properties', es: '/propiedades' },
  '/about': { en: '/about', es: '/nosotros' },
  '/contact': { en: '/contact', es: '/contacto' },
  '/sell': { en: '/sell', es: '/vender' },
  '/agents': { en: '/agents', es: '/agentes' },
}
```

---

## 9. Timeline Estimate

### Phase 1: Infrastructure Setup (2-3 days dev time)
- Install `next-intl`
- Create `routing.ts`, `request.ts`, `middleware.ts`
- Restructure routes under `[locale]`
- Update `next.config.ts` (compose with Sentry plugin)
- Update root layout with `NextIntlClientProvider`
- Verify English site still works identically

### Phase 2: String Extraction (2-3 days dev time)
- Extract all hardcoded strings from components into `messages/en.json`
- Replace JSX strings with `useTranslations()` / `getTranslations()` calls
- Namespace by component: `Hero`, `Navbar`, `Footer`, `Contact`, etc.
- Test that English site renders correctly from translation files

### Phase 3: Spanish Translation (3-5 days elapsed)
- Send `messages/en.json` to translator
- Create `messages/es.json` with translations
- Review real estate terminology with bilingual agent

### Phase 4: UI + Polish (1-2 days dev time)
- Build `LanguageSwitcher` component
- Add to navbar (desktop + mobile)
- Test locale detection, cookie persistence, URL routing
- Verify hreflang tags and metadata
- Test all pages in Spanish

### Phase 5: Content Translation (ongoing)
- Translate blog posts, guides, FAQ content
- Set up translation workflow for new content
- Consider database-level translation for property descriptions

**Total estimated dev time: 7-10 days**
**Total elapsed time (including translation): 2-3 weeks**

---

## 10. Cost Considerations

| Item | Estimated Cost |
|------|---------------|
| `next-intl` package | Free (MIT license) |
| Professional translation — core pages (~400 strings, ~5,000 words) | $400-600 |
| Professional translation — secondary pages (~250 strings, ~3,000 words) | $240-360 |
| AI translation + human review for content pages | $100-200 |
| Crowdin/Lokalise (if needed later) | $0-40/mo |
| **Total initial setup** | **$740-1,160** |
| **Ongoing monthly (new content)** | **$50-150/mo** |

### Developer Time Cost
- 7-10 days of development work
- This is the primary cost — the translation service is relatively cheap

---

## 11. Risks and Mitigations

| Risk | Mitigation |
|------|-----------|
| Route restructure breaks existing URLs | Use `localePrefix: 'as-needed'` — English URLs stay the same |
| Sentry + next-intl plugin conflicts | Test plugin composition early in Phase 1 |
| Dynamic content (properties from DB) | Phase 4 concern — start with UI strings only |
| Translation quality for real estate terms | Have bilingual agent review, provide glossary |
| SEO ranking disruption during migration | Implement hreflang tags before launching Spanish |
| Increased maintenance burden | Enforce translation key additions in PR reviews |

---

## 12. Decision Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| i18n library | `next-intl` | Best App Router support, type-safe, active maintenance |
| URL strategy | Prefix-based (`/es/...`) | Best for SEO, clean English URLs preserved |
| Default locale prefix | `as-needed` (no `/en/`) | No breaking changes to existing URLs |
| Translation source | Professional + AI hybrid | Quality for core pages, efficiency for content |
| Dashboard translation | Skip | Internal tool, English-only is fine |

---

## Appendix: Sample Translation Structure

See `messages/en.json` and `messages/es.json` in this repo for a proof-of-concept of homepage strings.
