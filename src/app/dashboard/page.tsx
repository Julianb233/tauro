import { Inbox, Building2, Calendar, Bell } from "lucide-react";
import { getUserProfile } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/dashboard/stat-card";

interface DashboardStats {
  leadsThisMonth: number;
  activeListings: number;
  showingsScheduled: number;
  newLeads: number;
}

async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();
  if (!supabase) {
    return {
      leadsThisMonth: 0,
      activeListings: 0,
      showingsScheduled: 0,
      newLeads: 0,
    };
  }

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [leadsMonth, activeProps, showings, newLeads] = await Promise.all([
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString()),
    supabase
      .from("properties")
      .select("id", { count: "exact", head: true })
      .eq("status", "Active"),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("type", "showing")
      .neq("status", "closed"),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
  ]);

  return {
    leadsThisMonth: leadsMonth.count ?? 0,
    activeListings: activeProps.count ?? 0,
    showingsScheduled: showings.count ?? 0,
    newLeads: newLeads.count ?? 0,
  };
}

export default async function DashboardPage() {
  const [profile, stats] = await Promise.all([
    getUserProfile(),
    getDashboardStats(),
  ]);

  const firstName = profile?.full_name.split(" ")[0] ?? "Saraha";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-off-white lg:text-3xl">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-sm text-off-white/50">Dashboard Overview</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Leads This Month"
          value={stats.leadsThisMonth}
          icon={Inbox}
          href="/dashboard/leads"
        />
        <StatCard
          title="Active Listings"
          value={stats.activeListings}
          icon={Building2}
          href="/dashboard/properties"
        />
        <StatCard
          title="Showings Scheduled"
          value={stats.showingsScheduled}
          icon={Calendar}
          href="/dashboard/calendar"
        />
        <StatCard
          title="New Leads"
          value={stats.newLeads}
          icon={Bell}
          href="/dashboard/leads?status=new"
        />
      </div>
    </div>
  );
}
