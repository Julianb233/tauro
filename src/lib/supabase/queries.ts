import { createClient } from "./server";

// ---------------------------------------------------------------------------
// Properties
// ---------------------------------------------------------------------------

export async function getProperties(options?: {
  neighborhood?: string;
  status?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  sortBy?: "price" | "created_at" | "beds" | "sqft";
  sortOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
  featured?: boolean;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("properties")
    .select(
      "*, agents!listing_agent_id(id, slug, full_name, photo, phone, email)",
      { count: "exact" },
    );

  if (options?.neighborhood) query = query.eq("neighborhood", options.neighborhood);
  if (options?.status) query = query.eq("status", options.status);
  if (options?.propertyType) query = query.eq("property_type", options.propertyType);
  if (options?.minPrice) query = query.gte("price", options.minPrice);
  if (options?.maxPrice) query = query.lte("price", options.maxPrice);
  if (options?.beds) query = query.gte("beds", options.beds);
  if (options?.baths) query = query.gte("baths", options.baths);
  if (options?.featured !== undefined) query = query.eq("featured", options.featured);

  const sortBy = options?.sortBy || "created_at";
  const sortOrder = options?.sortOrder || "desc";
  query = query.order(sortBy, { ascending: sortOrder === "asc" });

  const limit = options?.limit || 20;
  const offset = options?.offset || 0;
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;
  if (error) throw error;
  return { data: data || [], count: count || 0 };
}

export async function getPropertyBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select(
      "*, agents!listing_agent_id(id, slug, full_name, first_name, last_name, photo, phone, email, title)",
    )
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data;
}

export async function getFeaturedProperties(limit = 6) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select(
      "*, agents!listing_agent_id(id, slug, full_name, photo, phone, email)",
    )
    .eq("featured", true)
    .limit(limit);
  if (error) throw error;
  return data || [];
}

// ---------------------------------------------------------------------------
// Agents
// ---------------------------------------------------------------------------

export async function getAgents() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("agents")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getAgentBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("agents")
    .select("*, properties!listing_agent_id(*)")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data;
}

// ---------------------------------------------------------------------------
// Neighborhoods
// ---------------------------------------------------------------------------

export async function getNeighborhoods() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("neighborhoods")
    .select("*")
    .order("name", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function getNeighborhoodBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("neighborhoods")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) throw error;
  return data;
}

export async function getFeaturedNeighborhoods() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("neighborhoods")
    .select("*")
    .eq("featured", true)
    .order("name", { ascending: true });
  if (error) throw error;
  return data || [];
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export async function getTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return data || [];
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export async function getFaqs(category?: "buyer" | "seller" | "general") {
  const supabase = await createClient();
  let query = supabase
    .from("faq")
    .select("*")
    .order("sort_order", { ascending: true });
  if (category) query = query.eq("category", category);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}
