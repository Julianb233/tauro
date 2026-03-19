import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const LeadUpdateSchema = z.object({
  status: z.enum(["new", "contacted", "qualified", "closed"]).optional(),
  agent_id: z.string().uuid().nullable().optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

    const { data, error } = await supabase.from("leads").select("*").eq("id", id).single();
    if (error) {
      if (error.code === "PGRST116") return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      console.error("GET /api/leads/[id] error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch (err) {
    console.error("GET /api/leads/[id] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params;
    let body: unknown;
    try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }); }

    const result = LeadUpdateSchema.safeParse(body);
    if (!result.success) return NextResponse.json({ error: "Validation failed", details: result.error.flatten() }, { status: 422 });

    const supabase = await createClient();
    if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

    if (result.data.agent_id) {
      const { data: agent } = await supabase.from("agents").select("id").eq("id", result.data.agent_id).single();
      if (!agent) return NextResponse.json({ error: "Agent not found" }, { status: 422 });
    }

    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (result.data.status !== undefined) updateData.status = result.data.status;
    if (result.data.agent_id !== undefined) updateData.agent_id = result.data.agent_id;

    const { data, error } = await supabase.from("leads").update(updateData).eq("id", id).select().single();
    if (error) {
      if (error.code === "PGRST116") return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      console.error("PATCH /api/leads/[id] error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  } catch (err) {
    console.error("PATCH /api/leads/[id] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
