import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getAgents } from "@/lib/supabase/queries";

const AgentCreateSchema = z.object({
  slug: z.string().min(1),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  title: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  photo: z.string().optional(),
  bio: z.string().optional(),
  short_bio: z.string().optional(),
  specialties: z.array(z.string()).default([]),
  neighborhoods: z.array(z.string()).default([]),
  stats: z.record(z.string(), z.unknown()).default({}),
  awards: z.array(z.record(z.string(), z.unknown())).default([]),
  video_intro_url: z.string().url().nullable().optional(),
  social: z.record(z.string(), z.unknown()).default({}),
  languages: z.array(z.string()).default([]),
  license_number: z.string().optional(),
});

export async function GET() {
  try {
    const data = await getAgents();
    return NextResponse.json({ data });
  } catch (err) {
    console.error("GET /api/agents error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = AgentCreateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 422 },
      );
    }

    const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    const { data, error } = await supabase
      .from("agents")
      .insert(result.data)
      .select()
      .single();

    if (error) {
      console.error("POST /api/agents insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error("POST /api/agents error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
