"use client";

import { useEffect, useState, useCallback } from "react";
import { Inbox } from "lucide-react";
import type { LeadRow } from "@/types/database";
import { LeadTable } from "@/components/dashboard/lead-table";
import { LeadDetail } from "@/components/dashboard/lead-detail";

const LEAD_TYPES = ["contact", "showing", "seller", "agent-application"] as const;
const LEAD_STATUSES = ["new", "contacted", "qualified", "closed"] as const;

interface AgentOption {
  id: string;
  full_name: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [agents, setAgents] = useState<AgentOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<LeadRow | null>(null);

  // Filters
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterAgent, setFilterAgent] = useState("");

  const fetchLeads = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filterType) params.set("type", filterType);
      if (filterStatus) params.set("status", filterStatus);
      params.set("limit", "200");

      const res = await fetch(`/api/leads?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setLeads(json.data ?? []);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, [filterType, filterStatus]);

  const fetchAgents = useCallback(async () => {
    try {
      const res = await fetch("/api/agents");
      if (res.ok) {
        const json = await res.json();
        const list = json.data ?? json;
        setAgents(
          Array.isArray(list)
            ? list.map((a: Record<string, unknown>) => ({
                id: a.id as string,
                full_name: a.full_name as string,
              }))
            : [],
        );
      }
    } catch {
      // Agents will be empty
    }
  }, []);

  useEffect(() => {
    fetchLeads();
    fetchAgents();
  }, [fetchLeads, fetchAgents]);

  // Refilter on type/status change
  useEffect(() => {
    setLoading(true);
    fetchLeads();
  }, [filterType, filterStatus, fetchLeads]);

  // Build agent name map
  const agentMap: Record<string, string> = {};
  for (const a of agents) {
    agentMap[a.id] = a.full_name;
  }

  // Client-side agent filter
  const filteredLeads = filterAgent
    ? leads.filter((l) => l.agent_id === filterAgent)
    : leads;

  const handleLeadUpdate = (updated: LeadRow) => {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    setSelectedLead(updated);
  };

  const selectClasses =
    "rounded-lg border border-white/10 bg-[#141425] px-3 py-2 text-sm text-off-white focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30";

  const SkeletonTable = () => (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#1E1E32]">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 border-b border-white/5 px-4 py-4"
        >
          <div className="flex-1 space-y-2">
            <div className="h-4 w-40 animate-pulse rounded bg-white/5" />
            <div className="h-3 w-28 animate-pulse rounded bg-white/5" />
          </div>
          <div className="h-6 w-16 animate-pulse rounded-full bg-white/5" />
          <div className="h-6 w-16 animate-pulse rounded-full bg-white/5" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-off-white lg:text-3xl">
            Lead Inbox
          </h1>
          {!loading && (
            <span className="inline-flex items-center rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold">
              {filteredLeads.length}
            </span>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className={selectClasses}
        >
          <option value="">All Types</option>
          {LEAD_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1).replace("-", " ")}
            </option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className={selectClasses}
        >
          <option value="">All Statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filterAgent}
          onChange={(e) => setFilterAgent(e.target.value)}
          className={selectClasses}
        >
          <option value="">All Agents</option>
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.full_name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <SkeletonTable />
      ) : filteredLeads.length === 0 && !filterType && !filterStatus && !filterAgent ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[#1E1E32] py-16">
          <Inbox className="mb-4 h-12 w-12 text-off-white/20" />
          <p className="mb-1 text-lg font-medium text-off-white/60">
            No leads yet
          </p>
          <p className="text-sm text-off-white/40">
            Leads submitted through your website will appear here.
          </p>
        </div>
      ) : (
        <LeadTable
          leads={filteredLeads}
          onSelectLead={setSelectedLead}
          agentMap={agentMap}
        />
      )}

      {/* Detail panel */}
      {selectedLead && (
        <LeadDetail
          lead={selectedLead}
          agents={agents}
          onClose={() => setSelectedLead(null)}
          onUpdate={handleLeadUpdate}
        />
      )}
    </div>
  );
}
