import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const NewsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const result = NewsletterSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message ?? "Validation failed" },
      { status: 422 },
    );
  }

  const { email } = result.data;
  const supabase = await createClient();

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
