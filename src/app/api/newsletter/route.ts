import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { verifyTurnstileToken } from "@/lib/turnstile";
import { getClientIp } from "@/lib/rate-limit";

const NewsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  captchaToken: z.string().optional(),
});

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot check - bots fill this hidden field, humans never see it
  if (body && typeof body === "object" && "website" in body && body.website) {
    return NextResponse.json({ success: true, message: "Thanks for subscribing!" });
  }

  const result = NewsletterSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Validation failed" },
      { status: 422 },
    );
  }

  const { email, captchaToken } = result.data;

  // --- Turnstile CAPTCHA verification ---
  const ip = getClientIp(request.headers);
  const turnstileResult = await verifyTurnstileToken(captchaToken, ip);
  if (!turnstileResult.success) {
    return NextResponse.json({ error: turnstileResult.error }, { status: 400 });
  }

  const supabase = await createClient();

  if (!supabase) {
    // Graceful degradation: return success even without DB
    return NextResponse.json(
      { success: true, message: "Thanks for subscribing!" },
      { status: 200 },
    );
  }

  // Store as a lead with type "newsletter"
  const { error: dbError } = await supabase.from("leads").insert({
    type: "newsletter",
    first_name: "",
    last_name: "",
    email,
    phone: "",
    status: "new",
    metadata: { source: "footer-newsletter" },
    ghl_synced: false,
  });

  if (dbError) {
    // Handle unique constraint / duplicate email gracefully
    if (dbError.code === "23505") {
      return NextResponse.json(
        { success: true, message: "You're already subscribed!" },
        { status: 200 },
      );
    }
    console.error("POST /api/newsletter DB insert error:", dbError);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { success: true, message: "Thanks for subscribing!" },
    { status: 200 },
  );
}
