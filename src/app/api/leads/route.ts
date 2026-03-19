import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { sendLeadConfirmation, sendAgentNotification, sendApplicationConfirmation } from "@/lib/email";

// ---------------------------------------------------------------------------
// Rate limiting (in-memory, per IP)
// ---------------------------------------------------------------------------

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max submissions per window

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60_000);

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const LeadCreateSchema = z.object({
  type: z.enum(["contact", "showing", "seller", "agent-application", "agent-contact"]),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  message: z.string().optional(),
  // Showing-specific
  propertyAddress: z.string().optional(),
  propertyId: z.string().optional(),
  propertySlug: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  agentPreference: z.string().optional(),
  // Seller-specific
  homeAddress: z.string().optional(),
  beds: z.string().optional(),
  baths: z.string().optional(),
  sqft: z.string().optional(),
  timeline: z.string().optional(),
  reason: z.string().optional(),
  // Agent application-specific
  licenseNumber: z.string().optional(),
  yearsExperience: z.string().optional(),
  currentBrokerage: z.string().optional(),
  whyJoin: z.string().optional(),
  // Agent contact-specific
  agentName: z.string().optional(),
  agentSlug: z.string().optional(),
});

export type LeadPayload = z.infer<typeof LeadCreateSchema>;

// ---------------------------------------------------------------------------
// GHL webhook helper (preserved from original implementation)
// ---------------------------------------------------------------------------

function buildGhlContact(data: LeadPayload) {
  const tags: string[] = [];

  if (data.type === "contact") tags.push("website-contact");
  if (data.type === "showing") tags.push("showing-request");
  if (data.type === "seller") tags.push("seller-lead");
  if (data.type === "agent-application") tags.push("agent-application");
  if (data.type === "agent-contact") tags.push("agent-contact");

  const customFields: Record<string, string> = {};

  if (data.message) customFields.message = data.message;
  if (data.propertyAddress) customFields.property_address = data.propertyAddress;
  if (data.preferredDate) customFields.preferred_date = data.preferredDate;
  if (data.preferredTime) customFields.preferred_time = data.preferredTime;
  if (data.agentPreference) customFields.agent_preference = data.agentPreference;
  if (data.homeAddress) customFields.home_address = data.homeAddress;
  if (data.beds) customFields.bedrooms = data.beds;
  if (data.baths) customFields.bathrooms = data.baths;
  if (data.sqft) customFields.square_feet = data.sqft;
  if (data.timeline) customFields.selling_timeline = data.timeline;
  if (data.reason) customFields.selling_reason = data.reason;
  if (data.licenseNumber) customFields.license_number = data.licenseNumber;
  if (data.yearsExperience) customFields.years_experience = data.yearsExperience;
  if (data.currentBrokerage) customFields.current_brokerage = data.currentBrokerage;
  if (data.whyJoin) customFields.why_join = data.whyJoin;
  if (data.agentName) customFields.agent_name = data.agentName;

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    tags,
    customFields,
    source: "Tauro Website",
  };
}

// ---------------------------------------------------------------------------
// POST  /api/leads  — persist to DB, then forward to GHL
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  // Rate limit by IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot check - bots fill this hidden field, humans never see it
  if (body && typeof body === "object" && "website" in body && body.website) {
    // Return 200 to avoid tipping off the bot, but don't process
    return NextResponse.json({ success: true });
  }

  // Validate input
  const result = LeadCreateSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten() },
      { status: 422 },
    );
  }

  const data = result.data;

  // ---------------------------------------------------------------------------
  // 1. Persist to database (if Supabase is configured)
  // ---------------------------------------------------------------------------
  const supabase = await createClient();
  let dbSaved = false;
  let agentId: string | null = null;

  if (supabase) {
    // Resolve optional property_id and agent_id from slugs or IDs
    let propertyId: string | null = data.propertyId ?? null;

    if (!propertyId && data.propertySlug) {
      const { data: prop } = await supabase
        .from("properties")
        .select("id")
        .eq("slug", data.propertySlug)
        .single();
      if (prop) propertyId = prop.id;
    }

    if (data.agentSlug) {
      const { data: agent } = await supabase
        .from("agents")
        .select("id")
        .eq("slug", data.agentSlug)
        .single();
      if (agent) agentId = agent.id;
    }

    // Build metadata from extra fields
    const metadata: Record<string, unknown> = {};
    if (data.propertyAddress) metadata.propertyAddress = data.propertyAddress;
    if (data.preferredDate) metadata.preferredDate = data.preferredDate;
    if (data.preferredTime) metadata.preferredTime = data.preferredTime;
    if (data.agentPreference) metadata.agentPreference = data.agentPreference;
    if (data.homeAddress) metadata.homeAddress = data.homeAddress;
    if (data.beds) metadata.beds = data.beds;
    if (data.baths) metadata.baths = data.baths;
    if (data.sqft) metadata.sqft = data.sqft;
    if (data.timeline) metadata.timeline = data.timeline;
    if (data.reason) metadata.reason = data.reason;
    if (data.licenseNumber) metadata.licenseNumber = data.licenseNumber;
    if (data.yearsExperience) metadata.yearsExperience = data.yearsExperience;
    if (data.currentBrokerage) metadata.currentBrokerage = data.currentBrokerage;
    if (data.whyJoin) metadata.whyJoin = data.whyJoin;
    if (data.agentName) metadata.agentName = data.agentName;

    const { error: dbError } = await supabase.from("leads").insert({
      type: data.type,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      message: data.message ?? null,
      property_id: propertyId,
      agent_id: agentId,
      status: "new",
      metadata,
      ghl_synced: false,
    });

    if (dbError) {
      console.error("POST /api/leads DB insert error:", dbError);
      // Don't return 500 — fall through to GHL webhook so the lead isn't lost
    } else {
      dbSaved = true;
    }
  } else {
    console.warn("POST /api/leads: Supabase not configured — skipping DB insert");
  }

  // ---------------------------------------------------------------------------
  // 2. Send emails (best effort — never block response on email failure)
  // ---------------------------------------------------------------------------

  // 2a. Visitor confirmation email (all lead types except agent-application)
  if (data.type !== "agent-application") {
    sendLeadConfirmation(data.email, {
      firstName: data.firstName,
      type: data.type,
      message: data.message,
    }).catch((err) => console.error("Lead confirmation email failed:", err));
  }

  // 2b. Agent-application gets application confirmation instead
  if (data.type === "agent-application") {
    sendApplicationConfirmation(data.email, {
      firstName: data.firstName,
      licenseNumber: data.licenseNumber,
    }).catch((err) => console.error("Application confirmation email failed:", err));
  }

  // 2c. Agent notification (or admin fallback)
  if (data.type !== "agent-application") {
    let notifyEmail: string | null = null;

    if (supabase && agentId) {
      const { data: agentRow } = await supabase
        .from("agents")
        .select("email")
        .eq("id", agentId)
        .single();
      notifyEmail = agentRow?.email ?? null;
    }

    if (!notifyEmail) {
      notifyEmail = process.env.ADMIN_EMAIL || "admin@lylrealty.com";
    }

    sendAgentNotification(notifyEmail, {
      leadName: `${data.firstName} ${data.lastName}`,
      leadEmail: data.email,
      leadPhone: data.phone,
      leadType: data.type,
      message: data.message,
      propertyAddress: data.propertyAddress || data.homeAddress,
    }).catch((err) => console.error("Agent notification email failed:", err));
  }

  // ---------------------------------------------------------------------------
  // 3. Forward to GHL webhook (best effort)
  // ---------------------------------------------------------------------------
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  let ghlSynced = false;

  if (webhookUrl) {
    try {
      const contact = buildGhlContact(data);
      const ghlResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      ghlSynced = ghlResponse.ok;

      if (!ghlSynced) {
        console.error(
          "GHL webhook returned non-OK:",
          ghlResponse.status,
          await ghlResponse.text(),
        );
      }
    } catch (ghlErr) {
      console.error("GHL webhook error:", ghlErr);
    }

    // Update ghl_synced flag in DB if both are available
    if (ghlSynced && supabase && dbSaved) {
      await supabase
        .from("leads")
        .update({ ghl_synced: true })
        .eq("email", data.email)
        .eq("type", data.type)
        .order("created_at", { ascending: false })
        .limit(1);
    }
  }

  // ---------------------------------------------------------------------------
  // 4. Fallback: if neither DB nor GHL is configured, log lead to console
  // ---------------------------------------------------------------------------
  if (!supabase && !webhookUrl) {
    console.log("POST /api/leads [NO BACKEND] — lead data:", JSON.stringify(data, null, 2));
  }

  return NextResponse.json(
    { success: true, db_saved: dbSaved, ghl_synced: ghlSynced },
    { status: 200 },
  );
}

// ---------------------------------------------------------------------------
// GET  /api/leads  — paginated lead list (for dashboard)
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json(
        { data: [], count: 0, limit, offset, warning: "Database not configured" },
        { status: 200 },
      );
    }
    let query = supabase.from("leads").select("*", { count: "exact" });

    if (status) query = query.eq("status", status);
    if (type) query = query.eq("type", type);

    query = query
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error("GET /api/leads error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, count, limit, offset });
  } catch (err) {
    console.error("GET /api/leads error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
