import { NextRequest, NextResponse } from "next/server";

export interface LeadPayload {
  type: "contact" | "showing" | "seller" | "agent-application" | "agent-contact";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  // Showing-specific
  propertyAddress?: string;
  propertyId?: string;
  preferredDate?: string;
  preferredTime?: string;
  agentPreference?: string;
  // Seller-specific
  homeAddress?: string;
  beds?: string;
  baths?: string;
  sqft?: string;
  timeline?: string;
  reason?: string;
  // Agent application-specific
  licenseNumber?: string;
  yearsExperience?: string;
  currentBrokerage?: string;
  whyJoin?: string;
  // Agent contact-specific
  agentName?: string;
  agentSlug?: string;
}

function buildGhlContact(data: LeadPayload) {
  const tags: string[] = [];

  if (data.type === "contact") tags.push("website-contact");
  if (data.type === "showing") tags.push("showing-request");
  if (data.type === "seller") tags.push("seller-lead");
  if (data.type === "agent-application") tags.push("agent-application");

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

export async function POST(request: NextRequest) {
  let body: LeadPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Validate required fields
  const { firstName, lastName, email, phone, type } = body;
  if (!firstName || !lastName || !email || !phone || !type) {
    return NextResponse.json(
      { error: "Missing required fields: firstName, lastName, email, phone, type" },
      { status: 422 }
    );
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 422 });
  }

  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (!webhookUrl) {
    // In dev/staging without GHL config, log and return success
    console.log("[leads/route] GHL_WEBHOOK_URL not set — lead payload:", body);
    return NextResponse.json(
      { success: true, message: "Lead received (GHL not configured)" },
      { status: 200 }
    );
  }

  try {
    const contact = buildGhlContact(body);

    const ghlResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });

    if (!ghlResponse.ok) {
      const errorText = await ghlResponse.text();
      console.error("[leads/route] GHL webhook error:", ghlResponse.status, errorText);
      return NextResponse.json(
        { error: "CRM submission failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[leads/route] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
