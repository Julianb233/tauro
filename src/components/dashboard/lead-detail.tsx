"use client";

import { useEffect, useState, useCallback } from "react";
import { X, Mail, Phone, Clock, ExternalLink, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeadRow } from "@/types/database";

const statusColors: Record<string, string> = { new: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", contacted: "bg-blue-500/20 text-blue-400 border-blue-500/30", qualified: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", closed: "bg-white/10 text-white/50 border-white/20" };
const typeColors: Record<string, string> = { contact: "bg-blue-500/20 text-blue-400", showing: "bg-emerald-500/20 text-emerald-400", seller: "bg-purple-500/20 text-purple-400", "agent-application": "bg-orange-500/20 text-orange-400", "agent-contact": "bg-cyan-500/20 text-cyan-400" };
const statuses = ["new", "contacted", "qualified", "closed"] as const;

function prettifyKey(key: string): string { return key.replace(/([A-Z])/g, " $1").replace(/[_-]/g, " ").replace(/^\w/, (c) => c.toUpperCase()).trim(); }
function formatDate(dateStr: string): string { return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }); }

interface LeadDetailProps { leadId: string | null; onClose: () => void; agents: { id: string; full_name: string }[]; onUpdate: () => void; }

export function LeadDetail({ leadId, onClose, agents, onUpdate }: LeadDetailProps) {
  const [lead, setLead] = useState<LeadRow | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const fetchLead = useCallback(async (id: string) => {
    setLoading(true);
    try { const res = await fetch(`/api/leads/${id}`); const { data } = await res.json(); setLead(data ?? null); }
    catch { setLead(null); } finally { setLoading(false); }
  }, []);

  useEffect(() => { if (leadId) fetchLead(leadId); else setLead(null); }, [leadId, fetchLead]);

  const handleStatusChange = async (newStatus: string) => {
    if (!lead || lead.status === newStatus || updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/leads/${lead.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status: newStatus }) });
      if (res.ok) { const { data } = await res.json(); setLead(data); onUpdate(); }
    } finally { setUpdating(false); }
  };

  const handleAgentChange = async (agentId: string) => {
    if (!lead || updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/leads/${lead.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ agent_id: agentId || null }) });
      if (res.ok) { const { data } = await res.json(); setLead(data); onUpdate(); }
    } finally { setUpdating(false); }
  };

  const isOpen = leadId !== null;

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} aria-hidden="true" />}
      <div className={cn("fixed top-0 right-0 z-50 flex h-full w-full flex-col border-l border-white/10 bg-[#141425] transition-transform duration-300 ease-in-out sm:w-[420px]", isOpen ? "translate-x-0" : "translate-x-full")}>
        {loading ? (
          <div className="flex-1 p-6">
            <div className="flex justify-end"><button onClick={onClose} className="rounded p-1 text-off-white/40 hover:text-off-white"><X className="h-5 w-5" /></button></div>
            <div className="mt-6 space-y-4">{Array.from({ length: 5 }).map((_, i) => (<div key={i} className="h-8 animate-pulse rounded bg-white/5" />))}</div>
          </div>
        ) : lead ? (
          <div className="flex-1 overflow-y-auto">
            <div className="flex items-start justify-between border-b border-white/5 p-5">
              <div><h2 className="text-lg font-bold text-off-white">{lead.first_name} {lead.last_name}</h2><span className={cn("mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium", typeColors[lead.type] ?? "bg-white/10 text-white/60")}>{lead.type}</span></div>
              <button onClick={onClose} className="rounded p-1 text-off-white/40 hover:text-off-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3 border-b border-white/5 p-5">
              <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-sm text-off-white/80 hover:text-gold transition-colors"><Mail className="h-4 w-4 text-off-white/40" />{lead.email}</a>
              <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-sm text-off-white/80 hover:text-gold transition-colors"><Phone className="h-4 w-4 text-off-white/40" />{lead.phone}</a>
              <div className="flex items-center gap-2 text-sm text-off-white/50"><Clock className="h-4 w-4 text-off-white/40" />{formatDate(lead.created_at)}</div>
            </div>
            <div className="border-b border-white/5 p-5">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-off-white/40">Status</label>
              <div className="flex gap-1.5">{statuses.map((s) => (<button key={s} onClick={() => handleStatusChange(s)} disabled={updating} className={cn("flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-all", lead.status === s ? "border-gold bg-gold/20 text-gold" : statusColors[s] ?? "border-white/10 bg-white/5 text-white/40", lead.status !== s && "hover:brightness-125", updating && "opacity-50")}>{lead.status === s && <Check className="h-3 w-3" />}{s}</button>))}</div>
            </div>
            <div className="border-b border-white/5 p-5">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-off-white/40">Assigned Agent</label>
              <select value={lead.agent_id ?? ""} onChange={(e) => handleAgentChange(e.target.value)} disabled={updating} className="w-full rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus:border-gold/50 disabled:opacity-50">
                <option value="">Unassigned</option>{agents.map((a) => (<option key={a.id} value={a.id}>{a.full_name}</option>))}
              </select>
            </div>
            {lead.message && (<div className="border-b border-white/5 p-5"><label className="mb-2 block text-xs font-medium uppercase tracking-wider text-off-white/40">Message</label><p className="text-sm leading-relaxed text-off-white/70">{lead.message}</p></div>)}
            {lead.metadata && Object.keys(lead.metadata).length > 0 && (<div className="border-b border-white/5 p-5"><label className="mb-2 block text-xs font-medium uppercase tracking-wider text-off-white/40">Details</label><dl className="space-y-2">{Object.entries(lead.metadata).map(([key, val]) => (<div key={key} className="flex justify-between gap-4"><dt className="text-xs text-off-white/40 shrink-0">{prettifyKey(key)}</dt><dd className="text-xs text-off-white/70 text-right">{String(val)}</dd></div>))}</dl></div>)}
            {lead.property_id && (<div className="border-b border-white/5 p-5"><a href="/dashboard/properties" className="flex items-center gap-1.5 text-sm text-gold hover:text-gold-light transition-colors"><ExternalLink className="h-3.5 w-3.5" />View linked property</a></div>)}
            <div className="p-5"><div className="flex items-center gap-2"><span className="text-xs text-off-white/40">GHL Sync:</span><span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", lead.ghl_synced ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/40")}>{lead.ghl_synced ? "Synced" : "Not synced"}</span></div></div>
          </div>
        ) : (<div className="flex flex-1 items-center justify-center"><p className="text-sm text-off-white/40">Lead not found</p></div>)}
      </div>
    </>
  );
}
