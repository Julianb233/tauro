import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getProperties } from "@/lib/supabase/queries";

const PropertyCreateSchema = z.object({
  slug: z.string().min(1),
  address: z.string().min(1),
  city: z.string().default("Philadelphia"),
  state: z.string().default("PA"),
  zip: z.string().min(5),
  neighborhood: z.string().min(1),
  price: z.number().positive(),
  beds: z.number().int().min(0),
  baths: z.number().min(0),
  sqft: z.number().int().positive(),
  lot_sqft: z.number().int().default(0),
  year_built: z.number().int().optional(),
  status: z
    .enum(["Active", "Pending", "Sold", "Open House", "New"])
    .default("Active"),
  property_type: z.enum([
    "Single Family",
    "Condo",
    "Townhouse",
    "Multi-Family",
    "Land",
  ]),
  images: z.array(z.string()).default([]),
  description: z.string().min(1),
  features_interior: z.array(z.string()).default([]),
  features_exterior: z.array(z.string()).default([]),
  features_community: z.array(z.string()).default([]),
  listing_agent_id: z.string().uuid().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  open_house: z.string().optional(),
  open_house_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  open_house_start: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  open_house_end: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  video_url: z.string().url().optional(),
  virtual_tour_url: z.string().url().optional(),
  featured: z.boolean().default(false),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const options = {
      neighborhood: searchParams.get("neighborhood") || undefined,
      status: searchParams.get("status") || undefined,
      propertyType: searchParams.get("propertyType") || undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      beds: searchParams.get("beds")
        ? Number(searchParams.get("beds"))
        : undefined,
      baths: searchParams.get("baths")
        ? Number(searchParams.get("baths"))
        : undefined,
      sortBy: (searchParams.get("sortBy") as "price" | "created_at" | "beds" | "sqft") || undefined,
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || undefined,
      limit: searchParams.get("limit")
        ? Number(searchParams.get("limit"))
        : 20,
      offset: searchParams.get("offset")
        ? Number(searchParams.get("offset"))
        : 0,
      featured: searchParams.has("featured")
        ? searchParams.get("featured") === "true"
        : undefined,
    };

    const result = await getProperties(options);
    const { data, count } = result ?? { data: [], count: 0 };
    return NextResponse.json({
      data,
      count,
      limit: options.limit,
      offset: options.offset,
    });
  } catch (err) {
    console.error("GET /api/properties error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = PropertyCreateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 422 },
      );
    }

    const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    const { data, error } = await supabase
      .from("properties")
      .insert(result.data)
      .select()
      .single();

    if (error) {
      console.error("POST /api/properties insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error("POST /api/properties error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
