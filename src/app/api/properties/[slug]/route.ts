import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getPropertyBySlug } from "@/lib/supabase/queries";
import type { Database } from "@/types/database";

type PropertyUpdate = Database["public"]["Tables"]["properties"]["Update"];

const PropertyUpdateSchema = z.object({
  slug: z.string().min(1),
  address: z.string().min(1),
  city: z.string(),
  state: z.string(),
  zip: z.string().min(5),
  neighborhood: z.string().min(1),
  price: z.number().positive(),
  beds: z.number().int().min(0),
  baths: z.number().min(0),
  sqft: z.number().int().positive(),
  lot_sqft: z.number().int(),
  year_built: z.number().int().optional(),
  status: z.enum(["Active", "Pending", "Sold", "Open House", "New"]),
  property_type: z.enum([
    "Single Family",
    "Condo",
    "Townhouse",
    "Multi-Family",
    "Land",
  ]),
  images: z.array(z.string()),
  description: z.string().min(1),
  features_interior: z.array(z.string()),
  features_exterior: z.array(z.string()),
  features_community: z.array(z.string()),
  listing_agent_id: z.string().uuid().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  open_house: z.string().optional(),
  open_house_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  open_house_start: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  open_house_end: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  video_url: z.string().url().optional(),
  virtual_tour_url: z.string().url().optional(),
  featured: z.boolean(),
}).partial();

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(
  _request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const { slug } = await params;
    const data = await getPropertyBySlug(slug);
    return NextResponse.json({ data });
  } catch (err: unknown) {
    const pgError = err as { code?: string };
    if (pgError.code === "PGRST116") {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    console.error("GET /api/properties/[slug] error:", err);
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
    const result = PropertyUpdateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 422 },
      );
    }

    const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    const updateData: PropertyUpdate = {
      ...result.data,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from("properties")
      .update(updateData)
      .eq("slug", slug)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Property not found" },
          { status: 404 },
        );
      }
      console.error("PUT /api/properties/[slug] error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("PUT /api/properties/[slug] error:", err);
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
      .from("properties")
      .delete()
      .eq("slug", slug);

    if (error) {
      console.error("DELETE /api/properties/[slug] error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("DELETE /api/properties/[slug] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
