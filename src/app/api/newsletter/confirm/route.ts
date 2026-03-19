import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendNewsletterWelcome } from "@/lib/email";
import { siteUrl } from "@/lib/site-config";
import type { Database } from "@/types/database";

type SubscriberRow =
  Database["public"]["Tables"]["newsletter_subscribers"]["Row"];

interface Subscriber {
  id: string;
  email: string;
  first_name: string | null;
  confirmed: boolean;
  confirm_token: string | null;
  unsubscribe_token: string;
  interests: string[] | null;
  source: string | null;
interface NewsletterSubscriber {
  confirmed_at: string | null;
  unsubscribed_at: string | null;
  ghl_synced: boolean;
  created_at: string;
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${siteUrl}/newsletter/confirm?status=invalid`);
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.redirect(`${siteUrl}/newsletter/confirm?status=error`);
  }

const { data: subscriber, error: fetchError } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .eq("confirm_token", token)
    .maybeSingle<Subscriber>();
// Find subscriber by confirm token
  const { data: subscriberData, error: fetchError } = await supabase
    .maybeSingle();
  const subscriber = subscriberData as NewsletterSubscriber | null;

  if (fetchError || !subscriber) {
    return NextResponse.redirect(`${siteUrl}/newsletter/confirm?status=invalid`);
  }

  const sub = subscriber as unknown as SubscriberRow;

  if (sub.confirmed) {
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
    .eq("id", sub.id);

  if (updateError) {
    console.error("Newsletter confirm error:", updateError);
    return NextResponse.redirect(`${siteUrl}/newsletter/confirm?status=error`);
  }

  // Send welcome email
  const unsubscribeUrl = `${siteUrl}/newsletter/unsubscribe?token=${sub.unsubscribe_token}`;
  await sendNewsletterWelcome(sub.email, {
    firstName: sub.first_name || "",
    interests: sub.interests || [],
    unsubscribeUrl,
  });

  // Sync to GoHighLevel
  try {
    const apiKey = process.env.GHL_API_KEY;
    const locationId = process.env.GHL_LOCATION_ID;
    if (apiKey) {
      const contact = {
        firstName: sub.first_name || "",
        lastName: "",
        name: sub.first_name || "Newsletter Subscriber",
        email: sub.email,
        tags: ["newsletter-subscriber", "tauro-lead", ...(sub.interests || []).map((i: string) => `newsletter-${i}`)],
        source: "Tauro Newsletter",
        customFields: {
          newsletter_interests: (sub.interests || []).join(", "),
          newsletter_source: sub.source || "footer",
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
          .eq("id", sub.id);
      }
    }
  } catch (err) {
    console.error("GHL newsletter sync error:", err);
  }

  return NextResponse.redirect(`${siteUrl}/newsletter/confirm?status=success`);
}
