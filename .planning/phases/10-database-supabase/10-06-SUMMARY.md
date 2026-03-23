---
phase: 10-database-supabase
plan: 06
status: complete
subsystem: database/migrations
tags: [supabase, migrations, schema, seed, typescript]
completed: 2026-03-23

dependency-graph:
  requires: [10-01, 10-02, 10-03, 10-04, 10-05]
  provides: [clean-migration-sequence, video_intro_id-agent-column, storage-policies-migration, complete-seed-mappings]
  affects: [11-auth-agent-portal, 13-ghl-sync-production-hardening]

tech-stack:
  added: []
  patterns: [sequential-migration-numbering, idempotent-seed-script]

key-files:
  created:
    - supabase/migrations/008_add_video_intro_id.sql
    - supabase/migrations/009_storage_policies.sql
  modified:
    - supabase/migrations/005_add_hoa_fields.sql (unchanged, number preserved)
    - supabase/migrations/006_open_house_event.sql (renamed from 005_open_house_event.sql)
    - supabase/migrations/007_property_details_fields.sql (renamed from 006_property_details_fields.sql)
    - src/types/database.ts
    - scripts/seed.ts

decisions:
  - MIGRATION-NUMBERING-01: Sequential 001-009 numbering with no gaps or collisions
  - STORAGE-POLICIES-01: storage-policies.sql promoted to 009_storage_policies.sql migration
  - AGENT-VIDEO-ID-01: video_intro_id stored separately from video_intro_url for embed URL construction

metrics:
  duration: ~5m
---

# Phase 10 Plan 06: Schema and Seed Gap Fixes Summary

**One-liner:** Fixed five schema/seed gaps — migration collision, missing video_intro_id column, storage policies as migration, database.ts type sync, and seed open-house field mappings.

## What was built

### Gap 1: Migration numbering collision resolved

Two migrations had the `005_` prefix:
- `005_add_hoa_fields.sql` (kept as 005)
- `005_open_house_event.sql` → renamed to `006_open_house_event.sql`
- `006_property_details_fields.sql` → renamed to `007_property_details_fields.sql`

Final sequence: 001 through 007 with no gaps or collisions.

### Gap 2: video_intro_id column migration

Created `008_add_video_intro_id.sql`:

```sql
ALTER TABLE agents ADD COLUMN IF NOT EXISTS video_intro_id text;
```

The `agents` table in `001_initial_schema.sql` only had `video_intro_url`. The `Agent` interface in `src/data/agents.ts` has both `videoIntroUrl` and `videoIntroId`, so a separate column is needed to store the raw video platform ID for embed URL construction.

### Gap 3: storage-policies.sql as proper migration

`supabase/storage-policies.sql` was a standalone file that ran outside the migration sequence. Promoted to `009_storage_policies.sql` so it runs in order with the rest of the schema setup. The original file is preserved.

### Gap 4: database.ts AgentRow missing video_intro_id

Added `video_intro_id: string | null` to all three AgentRow shapes in `src/types/database.ts`:
- `agents.Row`
- `agents.Insert`
- `agents.Update`

### Gap 5: seed script missing open_house fields

Updated `scripts/seed.ts` `seedProperties()` function to map from the `openHouseEvent` nested object to the flat DB columns:

```ts
open_house_date: p.openHouseEvent?.date ?? null,
open_house_start: p.openHouseEvent?.startTime ?? null,
open_house_end: p.openHouseEvent?.endTime ?? null,
```

Also added `video_intro_id: a.videoIntroId` to the `seedAgents()` function.

## Verification

- `npx tsc --noEmit --diagnostics` → `ok (no errors)`
- All 9 migration files now in clean sequential order
- `scripts/seed.ts` maps all DB columns added in migrations 005-008
- `src/types/database.ts` AgentRow in sync with actual agents table schema

## Deviations from Plan

None — plan executed exactly as written. All five gaps identified in the plan description were addressed.

## Next Phase Readiness

- Phase 11 (Auth / Agent Portal): `video_intro_id` column and type available for agent profile UI
- Phase 13 (GHL sync / production hardening): seed script is now complete and will insert all structured open house events when seeding
