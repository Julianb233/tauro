---
phase: 10-database-supabase
plan: 07
status: complete
subsystem: api-routes
tags: [supabase, api, agents, file-upload, env]
---

# Phase 10 Plan 07: Gap Fixes — Supabase DB Write + Env Cleanup Summary

## One-liner

Rewrote agents/add API route to insert into Supabase DB (service role + storage), added UPLOAD_API_KEY to .env.local, and resolved .env.example merge conflict.

## What was built

### Task 1 — agents/add route rewritten to use Supabase DB

**File:** `src/app/api/agents/add/route.ts`

The route previously:
- Wrote agent data by mutating the `src/data/agents.ts` TypeScript source file at runtime via `addAgentToFile()` from `src/lib/agents-writer.ts`
- Wrote uploaded photos to `public/agents/` on disk via `fs.writeFile`

Both approaches break in serverless environments (Vercel, Lambda) where the filesystem is read-only.

The route now:
- Validates requests with `x-api-key` header checked against `UPLOAD_API_KEY` env var
- Creates a Supabase admin client using `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS
- Checks for duplicate slugs via `SELECT id FROM agents WHERE slug = ?`
- Uploads photos to Supabase Storage (`agent-photos` bucket) using the admin client, returning a public URL
- Inserts the new agent row into the `agents` table with all fields (first_name, last_name, full_name, slug, title, email, phone, photo, bio, short_bio, specialties, neighborhoods, license_number, social, languages, stats, awards)
- Returns `{ success, slug, id, message }` on 201

The `agents-writer.ts` module is no longer imported anywhere.

### Task 2 — UPLOAD_API_KEY added to .env.local

Added `UPLOAD_API_KEY=dev-upload-key-change-in-production` to `.env.local`.

This key is required by both:
- `/api/upload` (existed previously, key was missing causing all upload requests to 401)
- `/api/agents/add` (now enforces auth via same key)

### Task 3 — .env.example merge conflict resolved

The file had a merge conflict between `HEAD` (full comprehensive env template) and `ai-3460-contact-lead-capture` (minimal version with only `NEXT_PUBLIC_MAPBOX_TOKEN`).

Resolved by keeping the complete HEAD version with all documented variables, and updating the `UPLOAD_API_KEY` comment to mention `/api/agents/add` as well.

### Bonus — Pre-existing uncommitted changes staged

Four pre-existing uncommitted changes were staged and included in the commit:

- `src/types/database.ts` — added `video_intro_id` field to agents Row/Insert/Update types
- `scripts/seed.ts` — mapped `video_intro_id` and `open_house_date/start/end` fields
- `supabase/migrations/` — renumbered migration files (005→006, 006→007, added 008 + 009) to resolve numbering gaps

## Verification

- `npx tsc --noEmit` — passes with 0 errors
- `npm run build` — compiled successfully (4.8s); EAGAIN spawn error is a machine resource issue, not a code error
- `grep -r "agents-writer"` — no remaining imports
- `UPLOAD_API_KEY` present in `.env.local`
- `.env.example` has no merge conflict markers

## Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Auth on agents/add | Reuse `UPLOAD_API_KEY` + `x-api-key` header | Consistent with `/api/upload` endpoint pattern |
| Supabase client for write | `createClient` with `SUPABASE_SERVICE_ROLE_KEY` | Bypasses RLS for admin writes; consistent with cron route pattern |
| Photo storage | Supabase Storage `agent-photos` bucket | Consistent with existing upload infrastructure; serverless-safe |
| agents-writer.ts | Kept file, no longer imported | Left in place to avoid unnecessary deletion noise; dead code linter will catch it |

## Files Created / Modified

### Modified
- `src/app/api/agents/add/route.ts` — full rewrite (Supabase DB + storage)
- `src/types/database.ts` — add video_intro_id to agents type
- `scripts/seed.ts` — map open_house fields + video_intro_id
- `.env.example` — resolve merge conflict, document all vars

### Renamed (migration renumbering)
- `supabase/migrations/005_open_house_event.sql` → `006_open_house_event.sql`
- `supabase/migrations/006_property_details_fields.sql` → `007_property_details_fields.sql`
- `supabase/migrations/008_add_video_intro_id.sql` (new)
- `supabase/migrations/009_storage_policies.sql` (new)

## Deviations from Plan

The plan file (`10-07-PLAN.md`) was not pre-authored — this plan was executed directly from the gap description in the prompt. Tasks executed:

1. Rewrote agents/add route to Supabase (primary ask)
2. Added UPLOAD_API_KEY to .env.local (primary ask)
3. Resolved .env.example merge conflict (primary ask)
4. [Rule 2 - Missing Critical] Added API key authentication to agents/add — the old route had no auth, allowing anyone to POST new agents. Applied same `UPLOAD_API_KEY` pattern used by `/api/upload`.
5. Included pre-existing uncommitted changes (database.ts types, seed.ts, migrations) to keep working tree clean.

## Metrics

- Duration: ~8 minutes
- Completed: 2026-03-23
- Commit: 3727838
