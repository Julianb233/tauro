---
phase: 10-database-supabase
plan: "02"
status: complete
---

## What was done

1. **Installed dev dependencies**: `tsx` (TypeScript script runner) and `dotenv` (env loading).

2. **Created `scripts/seed.ts`** (240 lines): Idempotent seed script that:
   - Imports all static data from `src/data/*.ts` (agents, properties, neighborhoods, testimonials, FAQ)
   - Uses `@supabase/supabase-js` `createClient` directly with `SUPABASE_SERVICE_ROLE_KEY` (bypasses RLS)
   - Loads env vars from `.env.local` via dotenv
   - Seeds tables in FK-respecting order: agents -> neighborhoods -> properties -> testimonials -> FAQ
   - Maps all camelCase TypeScript fields to snake_case database columns
   - Resolves agent FK (`listing_agent_id`) by email lookup after agents are seeded
   - Uses `upsert` with `onConflict` on unique columns (`slug`, `name`, `question`) for idempotency
   - Logs row counts for each table and exits with code 1 on any error

3. **Added `seed` script to `package.json`**: `"seed": "tsx scripts/seed.ts"`

4. **Updated SQL migration** (`supabase/migrations/001_initial_schema.sql`):
   - Added `UNIQUE(name)` constraint on `testimonials` table
   - Added `UNIQUE(question)` constraint on `faq` table
   - These enable upsert-based idempotency for the seed script

5. **Updated `.env.example`** with `SUPABASE_SERVICE_ROLE_KEY` placeholder.

6. **Excluded `scripts/` from `tsconfig.json`** to prevent Next.js build from type-checking standalone scripts.

## Verification

- `npm run build` succeeds without errors
- `npm run seed` (via tsx) correctly parses and exits with helpful error when env vars are missing
- Script is 240 lines (exceeds 100-line minimum)
- All data counts: 6 agents, 15 neighborhoods, 16 properties, 3 testimonials, 18 FAQ items
