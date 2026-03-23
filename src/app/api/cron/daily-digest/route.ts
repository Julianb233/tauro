import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendDailyDigest } from "@/lib/email";
import type { Database } from "@/types/database";

export async function GET(request: NextRequest) {
  // 1. Verify cron secret to prevent unauthorized triggers
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Check that Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 },
    );
  }

  // Use service role client — no cookies needed for cron jobs
  const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

  // 3. Query leads from last 24 hours
  const twentyFourHoursAgo = new Date(
    Date.now() - 24 * 60 * 60 * 1000,
  ).toISOString();

  const { data: leads, error } = await supabase
    .from("leads")
    .select("first_name, last_name, email, type, created_at")
    .gte("created_at", twentyFourHoursAgo)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Daily digest query error:", error);
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }

  // 4. Aggregate by type
  const leadsByType = {
    contact: 0,
    showing: 0,
    seller: 0,
    agentApplication: 0,
    agentContact: 0,
  };

  const typeMap: Record<string, keyof typeof leadsByType> = {
    contact: "contact",
    showing: "showing",
    seller: "seller",
    "agent-application": "agentApplication",
    "agent-contact": "agentContact",
  };

  for (const lead of leads || []) {
    const key = typeMap[lead.type];
    if (key) leadsByType[key]++;
  }

  // 5. Format recent leads (max 10)
  const recentLeads = (leads || []).slice(0, 10).map((lead) => ({
    name: `${lead.first_name} ${lead.last_name}`,
    email: lead.email,
    type: lead.type,
    createdAt: new Date(lead.created_at).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "America/Los_Angeles",
    }),
  }));

  // 6. Format date
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Los_Angeles",
  });

  // 7. Send digest
  const result = await sendDailyDigest({
    date,
    totalLeads: (leads || []).length,
    leadsByType,
    recentLeads,
  });

  if (!result.success) {
    if (result.error === "Email client not configured") {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 },
      );
    }
    console.error("Daily digest send failed:", result.error);
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    leadsProcessed: (leads || []).length,
    date,
  });
}
