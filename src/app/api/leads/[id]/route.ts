import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// ---------------------------------------------------------------------------
// GET  /api/leads/[id]  — fetch a single lead by ID
// ---------------------------------------------------------------------------

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 },
    );
  }

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`GET /api/leads/${id} error:`, error);
    const status = error.code === "PGRST116" ? 404 : 500;
    return NextResponse.json(
      { error: status === 404 ? "Lead not found" : error.message },
      { status },
    );
  }

  return NextResponse.json({ data });
}

// ---------------------------------------------------------------------------
// PATCH  /api/leads/[id]  — update lead status and/or agent_id
// ---------------------------------------------------------------------------

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 },
    );
  }

  // Only allow updating status and agent_id
  const updates: Record<string, unknown> = {};
  if ("status" in body && typeof body.status === "string") {
    updates.status = body.status;
  }
  if ("agent_id" in body) {
    updates.agent_id = body.agent_id === "" ? null : body.agent_id;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      { error: "No valid fields to update" },
      { status: 422 },
    );
  }

  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("leads")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`PATCH /api/leads/${id} error:`, error);
    const status = error.code === "PGRST116" ? 404 : 500;
    return NextResponse.json(
      { error: status === 404 ? "Lead not found" : error.message },
      { status },
    );
  }

  return NextResponse.json({ data });
}
