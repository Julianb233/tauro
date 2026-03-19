"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { LeadRow } from "@/types/database";
import { cn } from "@/lib/utils";

const STATUS_PIPELINE = ["new", "contacted", "qualified", "closed"] as const;

const statusColors: Record<string, string> = {
  new: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  contacted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  qualified: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  closed: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusActiveColors: Record<string, string> = {
  new: "bg-yellow-500 text-near-black",
  contacted: "bg-blue-500 text-white",
  qualified: "bg-emerald-500 text-white",
  closed: "bg-red-500 text-white",
};

interface AgentOption {
  id: string;
  full_name: string;
}

interface LeadDetailProps {
  lead: LeadRow;
  agents: AgentOption[];
  onClose: () => void;
  onUpdate: (updated: LeadRow) => void;
}

export function LeadDetail({ lead, agents, onClose, onUpdate }: LeadDetailProps) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updateLead(updates: { status?: string; agent_id?: string | null }) {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to update lead");
      }
      const json = await res.json();
      onUpdate(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-white/10 bg-[#0F0F1A] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h2 className="text-lg font-bold text-off-white">Lead Details</h2>
          <button
            onClick={onClose}
            className="rounded p-1.5 text-off-white/40 hover:bg-white/5 hover:text-off-white"
            aria-label="Close panel"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-6 p-6">
          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Name & contact */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-off-white">
              {lead.first_name} {lead.last_name}
            </h3>
            <div className="space-y-1.5 text-sm text-off-white/60">
              <p>
                <span className="text-off-white/40">Email: </span>
                <a href={`mailto:${lead.email}`} className="text-gold hover:underline">
                  {lead.email}
                </a>
              </p>
              <p>
                <span className="text-off-white/40">Phone: </span>
                <a href={`tel:${lead.phone}`} className="text-gold hover:underline">
                  {lead.phone}
                </a>
              </p>
              <p>
                <span className="text-off-white/40">Type: </span>
                <span className="capitalize">{lead.type}</span>
              </p>
            </div>
          </div>

          {/* Message */}
          {lead.message && (
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-off-white/40">
                Message
              </label>
              <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-off-white/70">
                {lead.message}
              </div>
            </div>
          )}

          {/* Property */}
          {lead.property_id && (
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-off-white/40">
                Property ID
              </label>
              <p className="text-sm text-off-white/60">{lead.property_id}</p>
            </div>
          )}

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-off-white/40">
                Created
              </label>
              <p className="text-sm text-off-white/60">
                {new Date(lead.created_at).toLocaleString()}
              </p>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-off-white/40">
                Updated
              </label>
              <p className="text-sm text-off-white/60">
                {new Date(lead.updated_at).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Status pipeline */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-off-white/40">
              Status Pipeline
            </label>
            <div className="flex gap-2">
              {STATUS_PIPELINE.map((s) => {
                const isActive = lead.status === s;
                return (
                  <button
                    key={s}
                    onClick={() => {
                      if (!isActive) updateLead({ status: s });
                    }}
                    disabled={saving || isActive}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                      isActive
                        ? statusActiveColors[s]
                        : cn(statusColors[s], "hover:opacity-80"),
                      saving && "opacity-50",
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Agent assignment */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-off-white/40">
              Assign Agent
            </label>
            <select
              value={lead.agent_id ?? ""}
              onChange={(e) =>
                updateLead({
                  agent_id: e.target.value || null,
                })
              }
              disabled={saving}
              className="w-full rounded-lg border border-white/10 bg-[#141425] px-3 py-2 text-sm text-off-white focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 disabled:opacity-50"
            >
              <option value="">Unassigned</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.full_name}
                </option>
              ))}
            </select>
          </div>

          {/* Metadata */}
          {lead.metadata && Object.keys(lead.metadata).length > 0 && (
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-off-white/40">
                Additional Info
              </label>
              <div className="space-y-1.5">
                {Object.entries(lead.metadata).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="capitalize text-off-white/40">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-off-white/60">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
