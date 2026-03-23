import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  return createClient<Database>(url, serviceKey);
}

export async function POST(request: NextRequest) {
  // Validate API key
  const apiKey = request.headers.get("x-api-key");
  const expectedKey = process.env.UPLOAD_API_KEY;

  if (!expectedKey || apiKey !== expectedKey) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  const supabase = getAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 },
    );
  }

  try {
    let formData: FormData;

    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { error: "Invalid form data. Send multipart/form-data." },
        { status: 400 },
      );
    }

    // Required fields
    const firstName = (formData.get("firstName") as string)?.trim();
    const lastName = (formData.get("lastName") as string)?.trim();
    const title = (formData.get("title") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();

    if (!firstName || !lastName || !title || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields: firstName, lastName, title, email, phone" },
        { status: 422 },
      );
    }

    // Optional fields
    const bio = (formData.get("bio") as string)?.trim() || "";
    const shortBio = (formData.get("shortBio") as string)?.trim() || "";
    const licenseNumber = (formData.get("licenseNumber") as string)?.trim() || "";
    const instagram = (formData.get("instagram") as string)?.trim() || "";
    const linkedin = (formData.get("linkedin") as string)?.trim() || "";
    const facebook = (formData.get("facebook") as string)?.trim() || "";

    const specialtiesRaw = (formData.get("specialties") as string)?.trim() || "";
    const neighborhoodsRaw = (formData.get("neighborhoods") as string)?.trim() || "";

    const specialties = specialtiesRaw
      ? specialtiesRaw.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const neighborhoods = neighborhoodsRaw
      ? neighborhoodsRaw.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    // Generate slug
    const slug = `${firstName}-${lastName}`
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");

    // Check for duplicate slug
    const { data: existingAgent } = await supabase
      .from("agents")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existingAgent) {
      return NextResponse.json(
        { error: `An agent with slug "${slug}" already exists` },
        { status: 409 },
      );
    }

    // Handle photo upload to Supabase Storage
    let photoUrl: string | null = null;
    const photoFile = formData.get("photo");

    if (photoFile && photoFile instanceof File && photoFile.size > 0) {
      if (!photoFile.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Photo must be an image file" },
          { status: 415 },
        );
      }

      if (photoFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "Photo exceeds maximum size of 5 MB" },
          { status: 413 },
        );
      }

      const ext = photoFile.type.split("/")[1] || "jpg";
      const filePath = `${slug}.${ext}`;
      const fileBuffer = Buffer.from(await photoFile.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from("agent-photos")
        .upload(filePath, fileBuffer, {
          contentType: photoFile.type,
          upsert: true,
        });

      if (uploadError) {
        return NextResponse.json(
          { error: "Photo upload failed: " + uploadError.message },
          { status: 500 },
        );
      }

      const { data: { publicUrl } } = supabase.storage
        .from("agent-photos")
        .getPublicUrl(filePath);

      photoUrl = publicUrl;
    }

    // Build social object
    const social: Record<string, string> = {};
    if (instagram) social.instagram = instagram;
    if (linkedin) social.linkedin = linkedin;
    if (facebook) social.facebook = facebook;

    // Insert agent into database
    const { data: newAgent, error: insertError } = await supabase
      .from("agents")
      .insert({
        slug,
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
        title,
        email,
        phone,
        photo: photoUrl,
        bio: bio || null,
        short_bio: shortBio || null,
        specialties,
        neighborhoods,
        license_number: licenseNumber || null,
        social,
        languages: ["English"],
        stats: {
          propertiesSold: 0,
          totalVolume: "$0",
          avgDaysOnMarket: 0,
          yearsExperience: 0,
        },
        awards: [],
      })
      .select("id, slug")
      .single();

    if (insertError) {
      console.error("POST /api/agents/add DB insert error:", insertError);
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        slug: newAgent.slug,
        id: newAgent.id,
        message: `Agent ${firstName} ${lastName} added successfully`,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/agents/add error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 },
    );
  }
}
