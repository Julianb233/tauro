import { createHmac } from "crypto";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LeadPayload {
  type: "contact" | "showing" | "seller" | "agent-application" | "agent-contact";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  propertyAddress?: string;
  propertyId?: string;
  propertySlug?: string;
  preferredDate?: string;
  preferredTime?: string;
  agentPreference?: string;
  homeAddress?: string;
  beds?: string;
  baths?: string;
  sqft?: string;
  timeline?: string;
  reason?: string;
  licenseNumber?: string;
  yearsExperience?: string;
  currentBrokerage?: string;
  whyJoin?: string;
  agentName?: string;
  agentSlug?: string;
}

// ---------------------------------------------------------------------------
// Tag & field mapping constants
// ---------------------------------------------------------------------------

export const GHL_TAG_MAP: Record<LeadPayload["type"], string[]> = {
  contact: ["website-contact", "tauro-lead"],
  showing: ["showing-request", "tauro-lead", "buyer"],
  seller: ["seller-lead", "tauro-lead", "seller"],
  "agent-application": ["agent-application", "recruitment"],
  "agent-contact": ["agent-contact", "tauro-lead"],
};

/**
 * Maps LeadPayload field names to GHL custom field keys.
 */
export const GHL_FIELD_MAP: Record<string, string> = {
  message: "message",
  propertyAddress: "property_address",
  preferredDate: "preferred_date",
  preferredTime: "preferred_time",
  agentPreference: "agent_preference",
  homeAddress: "home_address",
  beds: "bedrooms",
  baths: "bathrooms",
  sqft: "square_feet",
  timeline: "selling_timeline",
  reason: "selling_reason",
  licenseNumber: "license_number",
  yearsExperience: "years_experience",
  currentBrokerage: "current_brokerage",
  whyJoin: "why_join",
  agentName: "agent_name",
};

// ---------------------------------------------------------------------------
// GHL status mapping (inbound webhook)
// ---------------------------------------------------------------------------

export const GHL_STATUS_MAP: Record<string, string> = {
  open: "new",
  new: "new",
  contacted: "contacted",
  qualified: "qualified",
  won: "closed",
  "closed-won": "closed",
  lost: "closed",
  "closed-lost": "closed",
};

// ---------------------------------------------------------------------------
// mapLeadToGhlContact
// ---------------------------------------------------------------------------

export function mapLeadToGhlContact(data: LeadPayload) {
  const tags = GHL_TAG_MAP[data.type] ?? [];

  const customFields: Record<string, string> = {};
  for (const [payloadKey, ghlKey] of Object.entries(GHL_FIELD_MAP)) {
    const value = data[payloadKey as keyof LeadPayload];
    if (typeof value === "string" && value) {
      customFields[ghlKey] = value;
    }
  }

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    name: `${data.firstName} ${data.lastName}`,
    email: data.email,
    phone: data.phone,
    tags,
    customFields,
    source: "Tauro Website",
  };
}

// ---------------------------------------------------------------------------
// createGhlContact
// ---------------------------------------------------------------------------

export async function createGhlContact(
  data: LeadPayload,
): Promise<{ success: boolean; error?: string }> {
  const contact = mapLeadToGhlContact(data);
  let succeeded = false;

  // Strategy 1: GHL API v2 (if API key is available)
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (apiKey) {
    try {
      const apiResponse = await fetch(
        "https://services.leadconnectorhq.com/contacts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            Version: "2021-07-28",
          },
          body: JSON.stringify({
            ...contact,
            locationId: locationId ?? undefined,
          }),
        },
      );

      if (apiResponse.ok) {
        succeeded = true;
      } else {
        const errorText = await apiResponse.text();
        console.error(
          "GHL API v2 returned non-OK:",
          apiResponse.status,
          errorText,
        );
      }
    } catch (err) {
      console.error("GHL API v2 request failed:", err);
    }
  }

  // Strategy 2: Webhook fallback (or primary if no API key)
  if (!succeeded) {
    const webhookUrl = process.env.GHL_WEBHOOK_URL;

    if (!webhookUrl) {
      if (!apiKey) {
        // Neither API key nor webhook URL configured — skip gracefully
        return { success: false, error: "No GHL credentials configured" };
      }
      // API was tried but failed, and no webhook fallback
      return {
        success: false,
        error: "GHL API failed and no webhook URL configured",
      };
    }

    try {
      const webhookResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      if (webhookResponse.ok) {
        succeeded = true;
      } else {
        const errorText = await webhookResponse.text();
        console.error(
          "GHL webhook returned non-OK:",
          webhookResponse.status,
          errorText,
        );
        return {
          success: false,
          error: `Webhook returned ${webhookResponse.status}`,
        };
      }
    } catch (err) {
      console.error("GHL webhook error:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Webhook request failed",
      };
    }
  }

  return { success: succeeded };
}

// ---------------------------------------------------------------------------
// verifyGhlSignature
// ---------------------------------------------------------------------------

export function verifyGhlSignature(
  rawBody: string,
  signature: string,
): boolean {
  const secret = process.env.GHL_WEBHOOK_SECRET;
  if (!secret) {
    return false;
  }

  const computed = createHmac("sha256", secret).update(rawBody).digest("hex");

  // Constant-time comparison
  if (computed.length !== signature.length) return false;

  let mismatch = 0;
  for (let i = 0; i < computed.length; i++) {
    mismatch |= computed.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return mismatch === 0;
}
