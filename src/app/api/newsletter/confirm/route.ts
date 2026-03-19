import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendNewsletterWelcome } from "@/lib/email";
import { siteUrl } from "@/lib/site-config";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${siteUrl}/newsletter/confirm?status=invalid`);
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.redirect(`${siteUrl}/newsletter/confirm?status=error`);
  }

  // Find subscriber by confirm token
  const { data: subscriber, error: fetchError } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .eq("confirm_token", token)
    .maybeSingle();

  if (fetchError || !subscriber) {
    return NextResponse.redirect(`${siteUrl}/newsletter/confirm?status=invalid`);
  }

  if (subscriber.confirmed) {
    return NextResponse.redirect(`${siteUrl}/newsletter/confirm?status=already-confirmed`);
  }

  // Confirm the subscription
  const { error: updateError } = await supabase
    .from("newsletter_subscribers")
    .update({
      confirmed: true,
      confirmed_at: new Date().toISOString(),
      confirm_token: null, // Clear token after use
    })
    .eq("id", subscriber.id);

  if (updateError) {
    console.error("Newsletter confirm error:", updateError);
    return NextResponse.redirect(`${siteUrl}/newsletter/confirm?status=error`);
  }

  // Send welcome email
  const unsubscribeUrl = `${siteUrl}/newsletter/unsubscribe?token=${subscriber.unsubscribe_token}`;
  await sendNewsletterWelcome(subscriber.email, {
    firstName: subscriber.first_name || "",
    interests: subscriber.interests || [],
    unsubscribeUrl,
  });

  // Sync to GoHighLevel
  try {
    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    if (apiKey) {
      const contact = {
        firstName: subscriber.first_name || "",
        lastName: "",
        name: subscriber.first_name || "Newsletter Subscriber",
        email: subscriber.email,
        tags: ["newsletter-subscriber", "tauro-lead", ...(subscriber.interests || []).map((i: string) => `newsletter-${i}`)],
        source: "Tauro Newsletter",
        customFields: {
          newsletter_interests: (subscriber.interests || []).join(", "),
          newsletter_source: subscriber.source || "footer",
        },
        locationId: locationId ?? undefined,
      };
      const res = await fetch("https://services.leadconnectorhq.com/contacts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          Version: "2021-07-28",
        },
        body: JSON.stringify(contact),
      });
      if (res.ok) {
        await supabase
          .from("newsletter_subscribers")
          .update({ ghl_synced: true })
          .eq("id", subscriber.id);
      }
    }
  } catch (err) {
    console.error("GHL newsletter sync error:", err);
  }

  return NextResponse.redirect(`${siteUrl}/newsletter/confirm?status=success`);
}
