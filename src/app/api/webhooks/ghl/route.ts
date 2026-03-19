import { NextRequest, NextResponse } from "next/server";
import { verifyGhlSignature, GHL_STATUS_MAP } from "@/lib/ghl";
import { createClient } from "@/lib/supabase/server";

interface GhlWebhookPayload {
  type: string;
  contact: {
    id: string;
    email: string;
    phone?: string;
    tags?: string[];
    customFields?: Record<string, string>;
  };
  status?: string;
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  const signature =
    request.headers.get("x-ghl-signature") ??
    request.headers.get("x-webhook-signature") ??
    "";

  const secret = process.env.GHL_WEBHOOK_SECRET;

  if (secret) {
    if (!signature || !verifyGhlSignature(rawBody, signature)) {
      console.error("GHL webhook signature verification failed");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  } else {
    console.warn("GHL_WEBHOOK_SECRET not set -- skipping signature verification (development mode)");
  }

  let payload: GhlWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as GhlWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!payload.contact?.email) {
    return NextResponse.json({ error: "Missing contact email" }, { status: 422 });
  }

  if (payload.type === "ContactStatusChanged" && payload.status) {
    const mappedStatus = GHL_STATUS_MAP[payload.status.toLowerCase()];

    if (mappedStatus) {
      const supabase = await createClient();

      if (!supabase) {
        console.error("GHL webhook: Supabase not configured");
        return NextResponse.json({ error: "Database not configured" }, { status: 503 });
      }

      try {
        const { error } = await supabase
          .from("leads")
          .update({
            status: mappedStatus,
            ghl_synced: true,
            updated_at: new Date().toISOString(),
          })
          .eq("email", payload.contact.email)
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) {
          console.error("GHL webhook: Failed to update lead status:", error);
          return NextResponse.json({ error: "Database update failed" }, { status: 500 });
        }
      } catch (err) {
        console.error("GHL webhook: Unexpected error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
      }
    } else {
      console.warn(`GHL webhook: Unknown status "${payload.status}", ignoring`);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
