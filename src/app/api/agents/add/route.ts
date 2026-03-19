import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { addAgentToFile } from "@/lib/agents-writer";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: NextRequest) {
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

    // Generate slug for file naming
    const slug = `${firstName}-${lastName}`
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");

    // Handle photo upload
    let photoPath = "/agents/placeholder.jpg";
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

      const agentsDir = path.join(process.cwd(), "public", "agents");
      await mkdir(agentsDir, { recursive: true });

      const buffer = Buffer.from(await photoFile.arrayBuffer());
      const filename = `${slug}.jpg`;
      const filePath = path.join(agentsDir, filename);

      await writeFile(filePath, buffer);
      photoPath = `/agents/${filename}`;
    }

    // Add agent to the data file
    const result = await addAgentToFile({
      firstName,
      lastName,
      title,
      email,
      phone,
      photo: photoPath,
      bio,
      shortBio,
      specialties,
      neighborhoods,
      licenseNumber,
      social: {
        instagram: instagram || undefined,
        linkedin: linkedin || undefined,
        facebook: facebook || undefined,
      },
    });

    return NextResponse.json(
      {
        success: true,
        slug: result.slug,
        id: result.id,
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
