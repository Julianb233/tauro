import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAgentBySlug } from "@/lib/supabase/queries";

type RouteContext = { params: Promise<{ slug: string }> };

// UUID regex to determine if the param is an ID or slug
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// GET /api/agents/[slug] — single agent with listings count
export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { slug } = await params;

    if (UUID_RE.test(slug)) {
      // Lookup by ID with listings count
      const supabase = await createClient();
      if (!supabase) {
        return NextResponse.json(
          { error: "Database not configured" },
          { status: 503 },
        );
      }

      const { data, error } = await supabase
        .from("agents")
        .select("*, properties!listing_agent_id(id)")
        .eq("id", slug)
        .single();

      if (error || !data) {
        return NextResponse.json(
          { error: "Agent not found" },
          { status: 404 },
        );
      }

      const listingsCount = Array.isArray(data.properties)
        ? data.properties.length
        : 0;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { properties: _props, ...agent } = data;
      return NextResponse.json({
        data: { ...agent, listings_count: listingsCount },
      });
    }

    // Lookup by slug (original behavior)
    const data = await getAgentBySlug(slug);
    return NextResponse.json({ data });
  } catch (err: unknown) {
    const pgError = err as { code?: string };
    if (pgError.code === "PGRST116") {
      return NextResponse.json(
        { error: "Agent not found" },
        { status: 404 },
      );
    }
    console.error("GET /api/agents/[slug] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PATCH /api/agents/[slug] — update agent fields (by ID or slug)
export async function PATCH(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    const allowedFields = [
      "first_name",
      "last_name",
      "title",
      "email",
      "phone",
      "photo",
      "bio",
      "short_bio",
      "specialties",
      "neighborhoods",
      "video_intro_url",
      "social",
      "languages",
      "license_number",
    ];

    const updates: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (key in body) {
        updates[key] = body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 },
      );
    }

    // Auto-update full_name if first or last name changes
    const isById = UUID_RE.test(slug);
    const eqCol = isById ? "id" : "slug";

    if (updates.first_name || updates.last_name) {
      const { data: current } = await supabase
        .from("agents")
        .select("first_name, last_name")
        .eq(eqCol, slug)
        .single();

      if (current) {
        const firstName =
          (updates.first_name as string) ?? current.first_name;
        const lastName =
          (updates.last_name as string) ?? current.last_name;
        updates.full_name = `${firstName} ${lastName}`;
      }
    }

    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from("agents")
      .update(updates)
      .eq(eqCol, slug)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Agent not found" },
          { status: 404 },
        );
      }
      console.error("PATCH /api/agents/[slug] error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("PATCH /api/agents/[slug] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT /api/agents/[slug] — full update (legacy, by slug)
export async function PUT(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { slug } = await params;
    const body = await request.json();
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    const updateData = {
      ...body,
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

// DELETE /api/agents/[slug] — delete agent (with FK check)
export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { slug } = await params;
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 503 },
      );
    }

    const isById = UUID_RE.test(slug);
    const eqCol = isById ? "id" : "slug";

    // Resolve agent ID for FK checks
    let agentId = slug;
    if (!isById) {
      const { data: agentRow } = await supabase
        .from("agents")
        .select("id")
        .eq("slug", slug)
        .single();
      if (!agentRow) {
        return NextResponse.json(
          { error: "Agent not found" },
          { status: 404 },
        );
      }
      agentId = agentRow.id;
    }

    // Check for linked properties
    const { count: propCount } = await supabase
      .from("properties")
      .select("id", { count: "exact", head: true })
      .eq("listing_agent_id", agentId);

    if (propCount && propCount > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot delete agent with active properties. Reassign or remove properties first.",
        },
        { status: 409 },
      );
    }

    // Check for linked leads
    const { count: leadCount } = await supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("agent_id", agentId);

    if (leadCount && leadCount > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot delete agent with assigned leads. Reassign leads first.",
        },
        { status: 409 },
      );
    }

    const { error } = await supabase
      .from("agents")
      .delete()
      .eq(eqCol, slug);

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
