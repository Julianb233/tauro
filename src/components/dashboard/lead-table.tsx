"use client";

import type { LeadRow } from "@/types/database";
import { cn } from "@/lib/utils";

const typeColors: Record<string, string> = {
  contact: "bg-blue-500/20 text-blue-400",
  showing: "bg-purple-500/20 text-purple-400",
  seller: "bg-emerald-500/20 text-emerald-400",
  "agent-application": "bg-orange-500/20 text-orange-400",
  "agent-contact": "bg-cyan-500/20 text-cyan-400",
};

const statusColors: Record<string, string> = {
  new: "bg-yellow-500/20 text-yellow-400",
  contacted: "bg-blue-500/20 text-blue-400",
  qualified: "bg-emerald-500/20 text-emerald-400",
  closed: "bg-red-500/20 text-red-400",
};

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

interface LeadTableProps {
  leads: LeadRow[];
  onSelectLead: (lead: LeadRow) => void;
  agentMap?: Record<string, string>;
}

export function LeadTable({ leads, onSelectLead, agentMap }: LeadTableProps) {
  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#1E1E32] px-6 py-12 text-center">
        <p className="text-off-white/40">No leads found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#1E1E32]">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-off-white/50">
            <th className="px-4 py-3">Name</th>
            <th className="hidden px-4 py-3 md:table-cell">Email</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Status</th>
            <th className="hidden px-4 py-3 lg:table-cell">Agent</th>
            <th className="hidden px-4 py-3 sm:table-cell">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {leads.map((lead) => (
            <tr
              key={lead.id}
              onClick={() => onSelectLead(lead)}
              className="cursor-pointer transition-colors hover:bg-white/[0.03]"
            >
              {/* Name */}
              <td className="px-4 py-3">
                <div className="font-medium text-off-white">
                  {lead.first_name} {lead.last_name}
                </div>
                <div className="text-xs text-off-white/40 md:hidden">
                  {lead.email}
                </div>
              </td>

              {/* Email */}
              <td className="hidden px-4 py-3 text-off-white/60 md:table-cell">
                {lead.email}
              </td>

              {/* Type badge */}
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
                    typeColors[lead.type] ?? "bg-white/10 text-off-white/60",
                  )}
                >
                  {lead.type}
                </span>
              </td>

              {/* Status badge */}
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
                    statusColors[lead.status] ?? "bg-white/10 text-off-white/60",
                  )}
                >
                  {lead.status}
                </span>
              </td>

              {/* Agent */}
              <td className="hidden px-4 py-3 text-off-white/60 lg:table-cell">
                {lead.agent_id && agentMap?.[lead.agent_id]
                  ? agentMap[lead.agent_id]
                  : "Unassigned"}
              </td>

              {/* Date */}
              <td className="hidden px-4 py-3 text-off-white/40 sm:table-cell">
                {relativeTime(lead.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
