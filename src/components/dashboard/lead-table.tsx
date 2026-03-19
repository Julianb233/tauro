"use client";

import { cn } from "@/lib/utils";
import type { LeadRow } from "@/types/database";

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

interface LeadTableProps {
  leads: LeadRow[];
  agents: { id: string; full_name: string }[];
  onRowClick: (lead: LeadRow) => void;
  selectedLeadId?: string;
}

export function LeadTable({ leads, agents, onRowClick, selectedLeadId }: LeadTableProps) {
  const agentMap = new Map(agents.map((a) => [a.id, a.full_name]));

  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-[#1E1E32] py-16">
        <p className="text-sm text-off-white/40">No leads found</p>
        <p className="mt-1 text-xs text-off-white/25">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-white/10">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-[#1E1E32]">
              <th className="px-4 py-3 text-left font-medium text-off-white/60">Name</th>
              <th className="px-4 py-3 text-left font-medium text-off-white/60 hidden sm:table-cell">Email</th>
              <th className="px-4 py-3 text-left font-medium text-off-white/60">Type</th>
              <th className="px-4 py-3 text-left font-medium text-off-white/60">Status</th>
              <th className="px-4 py-3 text-left font-medium text-off-white/60 hidden md:table-cell">Agent</th>
              <th className="px-4 py-3 text-left font-medium text-off-white/60 hidden lg:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const isSelected = selectedLeadId === lead.id;
              return (
                <tr
                  key={lead.id}
                  onClick={() => onRowClick(lead)}
                  className={cn(
                    "cursor-pointer border-b border-white/5 last:border-0 transition-colors",
                    isSelected ? "bg-gold/10" : "hover:bg-white/[0.03]",
                  )}
                >
                  <td className="px-4 py-3 font-medium text-off-white">
                    {lead.first_name} {lead.last_name}
                  </td>
                  <td className="px-4 py-3 text-off-white/60 hidden sm:table-cell">{lead.email}</td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-block rounded-full px-2 py-0.5 text-xs font-medium", typeColors[lead.type] ?? "bg-white/10 text-white/60")}>
                      {lead.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("inline-block rounded-full px-2 py-0.5 text-xs font-medium", statusColors[lead.status] ?? "bg-white/10 text-white/60")}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {lead.agent_id ? (
                      <span className="text-off-white/80">{agentMap.get(lead.agent_id) ?? "Unknown"}</span>
                    ) : (
                      <span className="text-off-white/30">Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-off-white/50 hidden lg:table-cell whitespace-nowrap">
                    {formatRelativeTime(lead.created_at)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
