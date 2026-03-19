"use client";
import { useEffect, useState, useCallback } from "react";
import { LeadTable } from "@/components/dashboard/lead-table";
import { LeadDetail } from "@/components/dashboard/lead-detail";
import type { LeadRow } from "@/types/database";
const leadTypes = [{value:"",label:"All Types"},{value:"contact",label:"Contact"},{value:"showing",label:"Showing"},{value:"seller",label:"Seller"},{value:"agent-application",label:"Agent Application"},{value:"agent-contact",label:"Agent Contact"}];
const leadStatuses = [{value:"",label:"All Statuses"},{value:"new",label:"New"},{value:"contacted",label:"Contacted"},{value:"qualified",label:"Qualified"},{value:"closed",label:"Closed"}];
const PAGE_SIZE = 25;
export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [agents, setAgents] = useState<{ id: string; full_name: string }[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [agentFilter, setAgentFilter] = useState("");
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const fetchLeads = useCallback(async (co: number) => {
    setLoading(true);
    try {
      const p = new URLSearchParams(); p.set("limit",String(PAGE_SIZE)); p.set("offset",String(co));
      if (typeFilter) p.set("type",typeFilter); if (statusFilter) p.set("status",statusFilter);
      const res = await fetch(`/api/leads?${p.toString()}`); const data = await res.json();
      let fl: LeadRow[] = data.data ?? [];
      if (agentFilter) fl = fl.filter((l: LeadRow) => l.agent_id === agentFilter);
      setLeads(fl); setTotalCount(data.count ?? 0);
    } catch { setLeads([]); setTotalCount(0); } finally { setLoading(false); }
  }, [typeFilter, statusFilter, agentFilter]);
  const fetchAgents = useCallback(async () => {
    try { const r = await fetch("/api/agents"); const d = await r.json(); setAgents((d.data??[]).map((a:Record<string,unknown>)=>({id:a.id as string,full_name:a.full_name as string}))); } catch { setAgents([]); }
  }, []);
  useEffect(() => { fetchAgents(); }, [fetchAgents]);
  useEffect(() => { setOffset(0); fetchLeads(0); }, [typeFilter, statusFilter, agentFilter, fetchLeads]);
  useEffect(() => { if (offset > 0) fetchLeads(offset); }, [offset, fetchLeads]);
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3"><h1 className="text-2xl font-bold text-off-white">Lead Inbox</h1><span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-semibold text-gold">{totalCount}</span></div>
      <div className="mt-4 flex flex-wrap gap-3">
        <select value={typeFilter} onChange={(e)=>setTypeFilter(e.target.value)} className="rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus-visible:border-gold/50">{leadTypes.map((t)=>(<option key={t.value} value={t.value}>{t.label}</option>))}</select>
        <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)} className="rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus-visible:border-gold/50">{leadStatuses.map((s)=>(<option key={s.value} value={s.value}>{s.label}</option>))}</select>
        <select value={agentFilter} onChange={(e)=>setAgentFilter(e.target.value)} className="rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus-visible:border-gold/50"><option value="">All Agents</option>{agents.map((a)=>(<option key={a.id} value={a.id}>{a.full_name}</option>))}</select>
      </div>
      <div className="mt-4">
        {loading ? (<div className="space-y-2">{Array.from({length:5}).map((_,i)=>(<div key={i} className="h-12 animate-pulse rounded-lg border border-white/10 bg-[#1E1E32]"/>))}</div>) : (<>
          <LeadTable leads={leads} agents={agents} onRowClick={(lead)=>setSelectedLeadId(lead.id)} selectedLeadId={selectedLeadId??undefined}/>
          {offset+PAGE_SIZE<totalCount&&(<div className="mt-4 text-center"><button onClick={()=>setOffset(p=>p+PAGE_SIZE)} className="rounded-lg border border-white/10 bg-[#1E1E32] px-6 py-2 text-sm font-medium text-off-white/70 hover:bg-white/5 hover:text-off-white transition-colors">Load more</button></div>)}
        </>)}
      </div>
      <LeadDetail leadId={selectedLeadId} onClose={()=>setSelectedLeadId(null)} agents={agents} onUpdate={()=>fetchLeads(offset)}/>
    </div>
  );
}
