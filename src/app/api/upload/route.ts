import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createClient as createServerClient } from "@/lib/supabase/server";

const ALLOWED_BUCKETS = ["property-images", "agent-photos"] as const;
type Bucket = (typeof ALLOWED_BUCKETS)[number];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export async function POST(request: NextRequest) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid form data" },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  const bucket = formData.get("bucket") as string | null;

  // Validate file presence
  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: "Missing or invalid file" },
      { status: 400 }
    );
  }

  // Validate bucket
  if (!bucket || !ALLOWED_BUCKETS.includes(bucket as Bucket)) {
    return NextResponse.json(
      { error: `Invalid bucket. Must be one of: ${ALLOWED_BUCKETS.join(", ")}` },
      { status: 400 }
    );
  }

  // Validate MIME type
  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Only image files are allowed" },
      { status: 415 }
    );
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File exceeds maximum size of 10 MB" },
      { status: 413 }
    );
  }

  // Generate unique filename
  const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = `${Date.now()}-${randomUUID().slice(0, 8)}-${originalName}`;

  try {
    const supabase = await createServerClient();
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: "Upload failed: " + uploadError.message },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(filePath);

    return NextResponse.json(
      { url: publicUrl, path: filePath, bucket },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
