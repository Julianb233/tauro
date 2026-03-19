import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { siteUrl } from "@/lib/site-config";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${siteUrl}/newsletter/unsubscribe?status=invalid`);
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.redirect(`${siteUrl}/newsletter/unsubscribe?status=error`);
  }

  const { data: subscriber } = await supabase
    .from("newsletter_subscribers")
    .select("id, unsubscribed_at")
    .eq("unsubscribe_token", token)
    .maybeSingle();

  if (!subscriber) {
    return NextResponse.redirect(`${siteUrl}/newsletter/unsubscribe?status=invalid`);
  }

  if (subscriber.unsubscribed_at) {
    return NextResponse.redirect(`${siteUrl}/newsletter/unsubscribe?status=already`);
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("id", subscriber.id);

  if (error) {
    console.error("Newsletter unsubscribe error:", error);
    return NextResponse.redirect(`${siteUrl}/newsletter/unsubscribe?status=error`);
  }

  return NextResponse.redirect(`${siteUrl}/newsletter/unsubscribe?status=success`);
}

// POST endpoint for resubscribing from the unsubscribe page
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token : null;
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .update({ unsubscribed_at: null })
    .eq("unsubscribe_token", token);

  if (error) {
    console.error("Newsletter resubscribe error:", error);
    return NextResponse.json({ error: "Failed to resubscribe" }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: "You've been resubscribed!" });
}
