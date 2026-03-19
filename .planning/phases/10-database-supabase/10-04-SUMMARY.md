---
phase: 10-database-supabase
plan: 04
status: complete
---

# 10-04 Summary: CRUD API Routes & Query Functions

## What was built

### 1. Shared query functions (`src/lib/supabase/queries.ts`)
- `getProperties(options?)` — filtered, paginated, with agent join
- `getPropertyBySlug(slug)` — single property with agent details
- `getFeaturedProperties(limit)` — featured properties for homepage
- `getAgents()` — all agents ordered by created_at
- `getAgentBySlug(slug)` — single agent with their properties
- `getNeighborhoods()` — all neighborhoods ordered by name
- `getNeighborhoodBySlug(slug)` — single neighborhood
- `getFeaturedNeighborhoods()` — featured neighborhoods
- `getTestimonials()` — ordered by sort_order
- `getFaqs(category?)` — optionally filtered by category
- All functions return `null` when Supabase is not configured

### 2. Properties CRUD (`src/app/api/properties/route.ts` + `[slug]/route.ts`)
- GET /api/properties — paginated with 8 filter parameters
- POST /api/properties — Zod-validated creation, returns 201
- GET /api/properties/[slug] — single property lookup, 404 on miss
- PUT /api/properties/[slug] — partial update with Zod validation
- DELETE /api/properties/[slug] — returns 204

### 3. Agents CRUD (`src/app/api/agents/route.ts` + `[slug]/route.ts`)
- GET /api/agents — list all agents
- POST /api/agents — Zod-validated creation
- GET /api/agents/[slug] — single agent with properties join
- PUT /api/agents/[slug] — partial update
- DELETE /api/agents/[slug] — returns 204

### 4. Leads route rewrite (`src/app/api/leads/route.ts`)
- POST: persists to database FIRST, then forwards to GHL via `createGhlContact()`
- Includes Turnstile CAPTCHA verification, input sanitization, honeypot
- Email notifications (lead confirmation, agent notification, application confirmation)
- GET: paginated lead list for dashboard with status/type filtering
- Graceful fallback when Supabase not configured

### 5. Data mapper functions (`src/lib/supabase/mappers.ts`)
- `mapPropertyRow()` — snake_case DB row to camelCase Property interface
- `mapAgentRow()` — DB row to Agent interface
- `mapNeighborhoodRow()` — DB row to Neighborhood interface
- `mapTestimonialRow()` — DB row to Testimonial interface
- `mapFaqRow()` — DB row to FaqItem interface

### 6. Data loading module (`src/lib/data.ts`)
- Central module that tries Supabase first, falls back to static data
- `loadProperties()`, `loadPropertyBySlug()`, `loadFeaturedProperties()`
- `loadAgents()`, `loadAgentBySlug()`
- `loadNeighborhoods()`, `loadNeighborhoodBySlug()`, `loadFeaturedNeighborhoods()`
- `loadTestimonials()`, `loadFaqs()`, `loadHomepageNeighborhoods()`

## Verification
- `npx tsc --noEmit` passes
- All route files export correct HTTP method handlers
- Zod schemas match database column types
- Leads route preserves GHL webhook forwarding logic
