"use client";

import { useEffect, useState } from "react";
import { Inbox, Building2, Users, Calendar } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

interface Stats {
  leads: number;
  newLeads: number;
  properties: number;
  agents: number;
  showings: number;
}

interface RecentLead {
  id: string;
  first_name: string;
  last_name: string;
  type: string;
  status: string;
  created_at: string;
}

const typeColors: Record<string, string> = {
  contact: "bg-blue-500/20 text-blue-400",
  showing: "bg-emerald-500/20 text-emerald-400",
  seller: "bg-purple-500/20 text-purple-400",
  "agent-application": "bg-orange-500/20 text-orange-400",
  "agent-contact": "bg-cyan-500/20 text-cyan-400",
};

const statusColors: Record<string, string> = {
  new: "bg-yellow-500/20 text-yellow-400",
  contacted: "bg-blue-500/20 text-blue-400",
  qualified: "bg-emerald-500/20 text-emerald-400",
  closed: "bg-white/10 text-white/50",
};

function formatRelativeTime(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  const diffMo = Math.floor(diffDay / 30);
  return `${diffMo}mo ago`;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<RecentLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [leadsRes, propsRes, agentsRes, newLeadsRes, showingsRes] =
          await Promise.all([
            fetch("/api/leads?limit=5"),
            fetch("/api/properties?limit=1"),
            fetch("/api/agents"),
            fetch("/api/leads?status=new&limit=1"),
            fetch("/api/leads?type=showing&limit=1"),
          ]);
        const leadsData = await leadsRes.json();
        const propsData = await propsRes.json();
        const agentsData = await agentsRes.json();
        const newLeadsData = await newLeadsRes.json();
        const showingsData = await showingsRes.json();
        setStats({
          leads: leadsData.count ?? 0,
          newLeads: newLeadsData.count ?? 0,
          properties: propsData.count ?? 0,
          agents: agentsData.data?.length ?? 0,
          showings: showingsData.count ?? 0,
        });
        setLeads(leadsData.data ?? []);
      } catch {
        setStats({ leads: 0, newLeads: 0, properties: 0, agents: 0, showings: 0 });
        setLeads([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-off-white lg:text-3xl">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-off-white/50">Manage your leads, properties, and agents.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[132px] animate-pulse rounded-xl border border-white/10 bg-[#1E1E32]" />
          ))
        ) : (
          <>
            <StatCard title="Total Leads" value={stats?.leads ?? 0} icon={Inbox} change={stats?.newLeads ? `+${stats.newLeads} new` : undefined} href="/dashboard/leads" />
            <StatCard title="Properties" value={stats?.properties ?? 0} icon={Building2} href="/dashboard/properties" />
            <StatCard title="Agents" value={stats?.agents ?? 0} icon={Users} href="/dashboard/agents" />
            <StatCard title="Showings" value={stats?.showings ?? 0} icon={Calendar} href="/dashboard/calendar" />
          </>
        )}
      </div>
      <div className="rounded-xl border border-white/10 bg-[#1E1E32]">
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <h2 className="font-heading text-lg font-semibold text-off-white">Recent Leads</h2>
          <a href="/dashboard/leads" className="text-xs font-medium text-gold hover:text-gold-light transition-colors">View all leads &rarr;</a>
        </div>
        {loading ? (
          <div className="divide-y divide-white/5">
            {Array.from({ length: 3 }).map((_, i) => (<div key={i} className="h-12 animate-pulse bg-white/[0.02]" />))}
          </div>
        ) : leads.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-off-white/40">No leads yet.</p>
        ) : (
          <div className="divide-y divide-white/5">
            {leads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-off-white">{lead.first_name} {lead.last_name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${typeColors[lead.type] ?? "bg-white/10 text-white/60"}`}>{lead.type}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusColors[lead.status] ?? "bg-white/10 text-white/60"}`}>{lead.status}</span>
                  <span className="text-xs text-off-white/40">{formatRelativeTime(lead.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
