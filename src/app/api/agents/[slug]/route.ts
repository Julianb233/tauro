import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getAgentBySlug } from "@/lib/supabase/queries";
import type { Database } from "@/types/database";

type AgentUpdate = Database["public"]["Tables"]["agents"]["Update"];

const AgentUpdateSchema = z.object({
  slug: z.string().min(1),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  title: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  photo: z.string().optional(),
  bio: z.string().optional(),
  short_bio: z.string().optional(),
  specialties: z.array(z.string()),
  neighborhoods: z.array(z.string()),
  stats: z.record(z.string(), z.unknown()),
  awards: z.array(z.record(z.string(), z.unknown())),
  video_intro_url: z.string().url().nullable().optional(),
  social: z.record(z.string(), z.unknown()),
  languages: z.array(z.string()),
  license_number: z.string().optional(),
}).partial();

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { slug } = await params;
    const data = await getAgentBySlug(slug);
    return NextResponse.json({ data });
  } catch (err: unknown) {
    const pgError = err as { code?: string };
    if (pgError.code === "PGRST116") {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }
    console.error("GET /api/agents/[slug] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const result = AgentUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 422 },
      );
    }

    const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    const updateData: AgentUpdate = {
      ...result.data,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from("agents")
      .update(updateData)
      .eq("slug", slug)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Agent not found" },
          { status: 404 },
        );
      }
      console.error("PUT /api/agents/[slug] error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("PUT /api/agents/[slug] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    const { error } = await supabase
      .from("agents")
      .delete()
      .eq("slug", slug);

    if (error) {
      console.error("DELETE /api/agents/[slug] error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/agents/[slug] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
