import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { sendLeadConfirmation, sendAgentNotification, sendApplicationConfirmation } from "@/lib/email";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { sanitize } from "@/lib/sanitize";
import { getClientIp } from "@/lib/rate-limit";
import { createGhlContact } from "@/lib/ghl";

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

const LeadCreateSchema = z.object({
  type: z.enum(["contact", "showing", "seller", "agent-application", "agent-contact", "open_house_rsvp", "callback"]),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  message: z.string().optional(),
  propertyAddress: z.string().optional(),
  propertyId: z.string().optional(),
  propertySlug: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  agentPreference: z.string().optional(),
  homeAddress: z.string().optional(),
  beds: z.string().optional(),
  baths: z.string().optional(),
  sqft: z.string().optional(),
  timeline: z.string().optional(),
  reason: z.string().optional(),
  licenseNumber: z.string().optional(),
  yearsExperience: z.string().optional(),
  currentBrokerage: z.string().optional(),
  whyJoin: z.string().optional(),
  agentName: z.string().optional(),
  agentSlug: z.string().optional(),
  captchaToken: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
});

export type LeadPayload = z.infer<typeof LeadCreateSchema>;

// ---------------------------------------------------------------------------
// POST /api/leads — persist to DB, send emails, forward to GHL
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot check
  if (body && typeof body === "object" && "website" in body && body.website) {
    return NextResponse.json({ success: true });
  }

  const result = LeadCreateSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.error.flatten() },
      { status: 422 },
    );
  }

  const data = result.data;

  // --- Turnstile CAPTCHA verification ---
  const ip = getClientIp(request.headers);
  const turnstileResult = await verifyTurnstileToken(data.captchaToken, ip);
  if (!turnstileResult.success) {
    return NextResponse.json({ error: turnstileResult.error }, { status: 400 });
  }

  // --- Input sanitization ---
  data.firstName = sanitize(data.firstName);
  data.lastName = sanitize(data.lastName);
  data.email = sanitize(data.email);
  data.phone = sanitize(data.phone);
  if (data.message) data.message = sanitize(data.message);
  if (data.homeAddress) data.homeAddress = sanitize(data.homeAddress);
  if (data.propertyAddress) data.propertyAddress = sanitize(data.propertyAddress);
  if (data.whyJoin) data.whyJoin = sanitize(data.whyJoin);
  if (data.currentBrokerage) data.currentBrokerage = sanitize(data.currentBrokerage);
  if (data.agentName) data.agentName = sanitize(data.agentName);

  // 1. Persist to database
  const supabase = await createClient();
  let dbSaved = false;
  let agentId: string | null = null;

  if (supabase) {
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
    if (data.utm_source) metadata.utm_source = data.utm_source;
    if (data.utm_medium) metadata.utm_medium = data.utm_medium;
    if (data.utm_campaign) metadata.utm_campaign = data.utm_campaign;

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
    } else {
      dbSaved = true;
    }
  } else {
    console.warn("POST /api/leads: Supabase not configured");
  }

  // 2. Send emails (best effort)
  try {
    if (data.type !== "agent-application") {
      sendLeadConfirmation(data.email, {
        firstName: data.firstName,
        type: data.type,
        message: data.message,
      }).catch((err) => console.error("Lead confirmation email failed:", err));
    }

    if (data.type === "agent-application") {
      sendApplicationConfirmation(data.email, {
        firstName: data.firstName,
        licenseNumber: data.licenseNumber,
      }).catch((err) => console.error("Application confirmation email failed:", err));
    }

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
  } catch (emailErr) {
    console.error("POST /api/leads email section error:", emailErr);
  }

  // 3. Forward to GHL (best effort)
  const ghlResult = await createGhlContact(data);
  const ghlSynced = ghlResult.success;

  if (!ghlSynced && ghlResult.error) {
    console.error("GHL sync failed:", ghlResult.error);
  }

  if (ghlSynced && supabase && dbSaved) {
    await supabase
      .from("leads")
      .update({ ghl_synced: true })
      .eq("email", data.email)
      .eq("type", data.type)
      .order("created_at", { ascending: false })
      .limit(1);
  }



  return NextResponse.json(
    { success: true, db_saved: dbSaved, ghl_synced: ghlSynced },
    { status: 200 },
  );
}

// ---------------------------------------------------------------------------
// GET /api/leads
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
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
