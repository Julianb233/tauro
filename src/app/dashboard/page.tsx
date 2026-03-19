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

interface RecentLead {
  id: string;
  firstName: string;
  lastName: string;
  type: string;
  status: string;
  createdAt: string;
}

async function getDashboardStats(): Promise<DashboardStats> {
  const supabase = await createClient();
  if (!supabase) {
    return { leadsThisMonth: 0, activeListings: 0, showingsScheduled: 0, newLeads: 0 };
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

async function getRecentLeads(): Promise<RecentLead[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data } = await supabase
    .from("leads")
    .select("id, first_name, last_name, type, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  return (data ?? []).map((row) => ({
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    type: row.type,
    status: row.status,
    createdAt: row.created_at,
  }));
}

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  return `${diffD}d ago`;
}

const typeBadge: Record<string, string> = {
  buyer: "bg-blue-500/20 text-blue-400",
  seller: "bg-emerald-500/20 text-emerald-400",
  showing: "bg-purple-500/20 text-purple-400",
  general: "bg-white/10 text-white/60",
};

const statusBadge: Record<string, string> = {
  new: "bg-gold/20 text-gold",
  contacted: "bg-blue-500/20 text-blue-400",
  qualified: "bg-emerald-500/20 text-emerald-400",
  closed: "bg-white/10 text-white/40",
};

export default async function DashboardPage() {
  const [profile, stats, recentLeads] = await Promise.all([
    getUserProfile(),
    getDashboardStats(),
    getRecentLeads(),
  ]);

  const firstName = profile?.full_name.split(" ")[0] ?? "Agent";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-off-white lg:text-3xl">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1 text-sm text-off-white/50">Dashboard Overview</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard title="Leads This Month" value={stats.leadsThisMonth} icon={Inbox} href="/dashboard/leads" />
        <StatCard title="Active Listings" value={stats.activeListings} icon={Building2} href="/dashboard/properties" />
        <StatCard title="Showings Scheduled" value={stats.showingsScheduled} icon={Calendar} href="/dashboard/calendar" />
        <StatCard title="New Leads" value={stats.newLeads} icon={Bell} href="/dashboard/leads?status=new" />
      </div>

      <div className="rounded-xl border border-white/10 bg-[#1E1E32]">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <h2 className="font-heading text-lg font-semibold text-off-white">Recent Leads</h2>
          <a href="/dashboard/leads" className="text-xs font-medium text-gold hover:text-gold-light transition-colors">
            View all leads &rarr;
          </a>
        </div>
        {recentLeads.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-off-white/40">
            No leads yet. They&apos;ll appear here once submitted.
          </p>
        ) : (
          <div className="divide-y divide-white/5">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-off-white">
                    {lead.firstName} {lead.lastName}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${typeBadge[lead.type] ?? typeBadge.general}`}
                  >
                    {lead.type}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusBadge[lead.status] ?? statusBadge.new}`}
                  >
                    {lead.status}
                  </span>
                  <span className="text-xs text-off-white/40">{relativeTime(lead.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
