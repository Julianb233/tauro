---
phase: 10-database-supabase
plan: 03
status: complete
---

# 10-03 Summary: Supabase Storage & Image Upload

## What was built

### 1. Storage bucket configuration (`supabase/storage-policies.sql`)
- SQL to create `property-images` and `agent-photos` storage buckets
- Public read access policies for both buckets
- Authenticated upload and delete policies for dashboard use (Phase 11)

### 2. Upload API route (`src/app/api/upload/route.ts`)
- POST endpoint accepting multipart/form-data with file + bucket name
- API key authentication via `x-api-key` header
- File validation: image MIME type only, max 10 MB
- Unique filename generation with timestamp + UUID prefix
- Uploads to Supabase Storage, returns public URL
- Graceful 503 when Supabase is not configured
- Proper error status codes: 400, 401, 413, 415, 500, 503

### 3. ImageUpload component (`src/components/ImageUpload.tsx`)
- Client component with drag-and-drop zone
- Props: `bucket`, `onUpload`, `currentImage`, `className`, `label`, `multiple`
- Upload states: idle, uploading, done, error
- CSS spinner animation during upload
- Styled to match Tauro dark theme (gold accents, dark backgrounds)
- Posts to `/api/upload` with FormData

### 4. Next.js image config (`next.config.ts`)
- Added `*.supabase.co` hostname to `images.remotePatterns`
- Allows Next.js Image component to serve Supabase-hosted images

## Verification
- `npx tsc --noEmit` passes
- All files export expected symbols
- SQL is syntactically valid for Supabase SQL Editor
