"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Pencil,
  Trash2,
  X,
  Save,
  Plus,
  Phone,
  Mail,
  Building2,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Agent {
  id: string;
  slug: string;
  first_name: string;
  last_name: string;
  full_name: string;
  title: string;
  email: string;
  phone: string;
  photo: string | null;
  bio: string | null;
  short_bio: string | null;
  specialties: string[];
  neighborhoods: string[];
  listings_count?: number;
}

interface EditForm {
  first_name: string;
  last_name: string;
  title: string;
  email: string;
  phone: string;
  bio: string;
  specialties: string;
  neighborhoods: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AgentManager() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditForm | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAgents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/agents");
      if (!res.ok) throw new Error("Failed to fetch agents");
      const json = await res.json();

      const agentList: Agent[] = (json.data ?? []).map(
        (a: Record<string, unknown>) => ({
          ...a,
          listings_count: 0,
          specialties: a.specialties ?? [],
          neighborhoods: a.neighborhoods ?? [],
        }),
      );

      setAgents(agentList);
    } catch (err) {
      console.error("Failed to load agents:", err);
      setError("Failed to load agents");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  function startEdit(agent: Agent) {
    setEditingId(agent.id);
    setEditForm({
      first_name: agent.first_name,
      last_name: agent.last_name,
      title: agent.title || "",
      email: agent.email,
      phone: agent.phone || "",
      bio: agent.bio || "",
      specialties: (agent.specialties ?? []).join(", "),
      neighborhoods: (agent.neighborhoods ?? []).join(", "),
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditForm(null);
  }

  async function saveEdit(agentId: string) {
    if (!editForm) return;
    setSaving(true);

    try {
      const body: Record<string, unknown> = {
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        title: editForm.title,
        email: editForm.email,
        phone: editForm.phone,
        bio: editForm.bio,
        specialties: editForm.specialties
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        neighborhoods: editForm.neighborhoods
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const res = await fetch(`/api/agents/${agentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to save");
      }

      cancelEdit();
      await fetchAgents();
    } catch (err) {
      console.error("Save failed:", err);
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function deleteAgent(agentId: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/agents/${agentId}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to delete");
      }
      setDeleteConfirmId(null);
      await fetchAgents();
    } catch (err) {
      console.error("Delete failed:", err);
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleting(false);
    }
  }

  // Loading
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-white/5" />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-xl bg-white/5"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-off-white lg:text-3xl">
            Agent Manager
          </h1>
          <p className="mt-1 text-sm text-off-white/50">
            Manage your team of agents
          </p>
        </div>
        <a
          href="/api/agents"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-near-black hover:bg-gold-light transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Agent
        </a>
      </div>

      {/* Error banner */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-3 text-red-400/60 hover:text-red-400"
          >
            dismiss
          </button>
        </div>
      )}

      {/* Agents table */}
      {agents.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#1E1E32] px-6 py-12 text-center">
          <p className="text-off-white/40">
            No agents found. Add your first agent to get started.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-[#1E1E32] overflow-hidden">
          {/* Table header */}
          <div className="hidden border-b border-white/5 px-5 py-3 md:grid md:grid-cols-[auto_1fr_1fr_1fr_120px_100px]">
            <span className="w-14 text-xs font-semibold uppercase tracking-wider text-off-white/40" />
            <span className="text-xs font-semibold uppercase tracking-wider text-off-white/40">
              Name
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-off-white/40">
              Email
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-off-white/40">
              Phone
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-off-white/40">
              Listings
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-off-white/40 text-right">
              Actions
            </span>
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/5">
            {agents.map((agent) => (
              <div key={agent.id}>
                {/* Display row */}
                {editingId !== agent.id && (
                  <div className="flex flex-col gap-3 px-5 py-4 md:grid md:grid-cols-[auto_1fr_1fr_1fr_120px_100px] md:items-center">
                    {/* Avatar */}
                    <div className="flex items-center md:w-14">
                      {agent.photo ? (
                        <img
                          src={agent.photo}
                          alt={agent.full_name}
                          className="h-10 w-10 rounded-full object-cover ring-2 ring-gold/20"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-sm font-bold text-gold">
                          {agent.first_name?.[0]}
                          {agent.last_name?.[0]}
                        </div>
                      )}
                    </div>

                    {/* Name & title */}
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-off-white">
                        {agent.full_name}
                      </p>
                      <p className="truncate text-xs text-off-white/40">
                        {agent.title || "Agent"}
                      </p>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-1.5 text-sm text-off-white/60">
                      <Mail className="h-3.5 w-3.5 shrink-0 text-off-white/30" />
                      <span className="truncate">{agent.email}</span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-1.5 text-sm text-off-white/60">
                      <Phone className="h-3.5 w-3.5 shrink-0 text-off-white/30" />
                      <span className="truncate">
                        {agent.phone || "N/A"}
                      </span>
                    </div>

                    {/* Listings */}
                    <div className="flex items-center gap-1.5 text-sm text-off-white/60">
                      <Building2 className="h-3.5 w-3.5 shrink-0 text-off-white/30" />
                      <span>{agent.listings_count ?? 0} listings</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => startEdit(agent)}
                        className="rounded-lg p-2 text-gold/60 hover:bg-gold/10 hover:text-gold transition-colors"
                        title="Edit agent"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(agent.id)}
                        className="rounded-lg p-2 text-red-400/60 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                        title="Delete agent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Edit form */}
                {editingId === agent.id && editForm && (
                  <div className="border-l-2 border-gold bg-gold/5 px-5 py-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold text-gold">
                        Editing: {agent.full_name}
                      </h3>
                      <button
                        onClick={cancelEdit}
                        className="rounded p-1 text-off-white/40 hover:text-off-white"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {/* First Name */}
                      <div>
                        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={editForm.first_name}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              first_name: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-white/10 bg-[#141425] px-3 py-2 text-sm text-off-white placeholder:text-off-white/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
                        />
                      </div>

                      {/* Last Name */}
                      <div>
                        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={editForm.last_name}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              last_name: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-white/10 bg-[#141425] px-3 py-2 text-sm text-off-white placeholder:text-off-white/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
                        />
                      </div>

                      {/* Title */}
                      <div>
                        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">
                          Title
                        </label>
                        <input
                          type="text"
                          value={editForm.title}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              title: e.target.value,
                            })
                          }
                          placeholder="e.g. Senior Agent"
                          className="w-full rounded-lg border border-white/10 bg-[#141425] px-3 py-2 text-sm text-off-white placeholder:text-off-white/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">
                          Email
                        </label>
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              email: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-white/10 bg-[#141425] px-3 py-2 text-sm text-off-white placeholder:text-off-white/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              phone: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-white/10 bg-[#141425] px-3 py-2 text-sm text-off-white placeholder:text-off-white/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
                        />
                      </div>

                      {/* Specialties */}
                      <div>
                        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">
                          Specialties (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={editForm.specialties}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              specialties: e.target.value,
                            })
                          }
                          placeholder="Luxury, Residential, Commercial"
                          className="w-full rounded-lg border border-white/10 bg-[#141425] px-3 py-2 text-sm text-off-white placeholder:text-off-white/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
                        />
                      </div>

                      {/* Neighborhoods */}
                      <div className="md:col-span-2">
                        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">
                          Neighborhoods (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={editForm.neighborhoods}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              neighborhoods: e.target.value,
                            })
                          }
                          placeholder="Downtown, Westside, East Hills"
                          className="w-full rounded-lg border border-white/10 bg-[#141425] px-3 py-2 text-sm text-off-white placeholder:text-off-white/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30"
                        />
                      </div>

                      {/* Bio */}
                      <div className="md:col-span-2 lg:col-span-3">
                        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">
                          Bio
                        </label>
                        <textarea
                          value={editForm.bio}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              bio: e.target.value,
                            })
                          }
                          rows={3}
                          className="w-full rounded-lg border border-white/10 bg-[#141425] px-3 py-2 text-sm text-off-white placeholder:text-off-white/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 resize-none"
                        />
                      </div>
                    </div>

                    {/* Save / Cancel */}
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => saveEdit(agent.id)}
                        disabled={saving}
                        className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-near-black hover:bg-gold-light transition-colors disabled:opacity-50"
                      >
                        <Save className="h-4 w-4" />
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="rounded-lg border border-white/10 px-4 py-2 text-sm text-off-white/60 hover:bg-white/5 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Delete confirmation */}
                {deleteConfirmId === agent.id && (
                  <div className="border-l-2 border-red-500 bg-red-500/5 px-5 py-4">
                    <p className="text-sm text-red-400">
                      Are you sure you want to delete{" "}
                      <strong>{agent.full_name}</strong>? This action cannot be
                      undone.
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => deleteAgent(agent.id)}
                        disabled={deleting}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        {deleting ? "Deleting..." : "Yes, Delete"}
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="rounded-lg border border-white/10 px-4 py-2 text-sm text-off-white/60 hover:bg-white/5 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
