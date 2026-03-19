"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, X, Mail, Phone } from "lucide-react";
import type { AgentRow } from "@/types/database";

interface AgentFormData {
  slug: string; first_name: string; last_name: string; title: string;
  email: string; phone: string; photo: string; bio: string; short_bio: string;
  specialties: string[]; neighborhoods: string[]; languages: string[]; license_number: string;
}

const emptyForm: AgentFormData = {
  slug: "", first_name: "", last_name: "", title: "", email: "", phone: "",
  photo: "", bio: "", short_bio: "", specialties: [], neighborhoods: [], languages: [], license_number: "",
};

export default function AgentsPage() {
  const [agents, setAgents] = useState<AgentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AgentFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [specialtyInput, setSpecialtyInput] = useState("");
  const [neighborhoodInput, setNeighborhoodInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  const fetchAgents = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch("/api/agents"); const data = await res.json(); setAgents(data.data ?? []); }
    catch { setAgents([]); } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAgents(); }, [fetchAgents]);

  const openAddForm = () => { setEditingId(null); setForm(emptyForm); setShowForm(true); };
  const openEditForm = (agent: AgentRow) => {
    setEditingId(agent.id);
    setForm({
      slug: agent.slug, first_name: agent.first_name, last_name: agent.last_name,
      title: agent.title, email: agent.email, phone: agent.phone,
      photo: agent.photo ?? "", bio: agent.bio ?? "", short_bio: agent.short_bio ?? "",
      specialties: agent.specialties ?? [], neighborhoods: agent.neighborhoods ?? [],
      languages: agent.languages ?? [], license_number: agent.license_number ?? "",
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/agents", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      setShowForm(false); fetchAgents();
    } finally { setSaving(false); }
  };

  const updateField = <K extends keyof AgentFormData>(key: K, value: AgentFormData[K]) => { setForm((prev) => ({ ...prev, [key]: value })); };
  const addTag = (field: "specialties" | "neighborhoods" | "languages", value: string) => { const t = value.trim(); if (t && !form[field].includes(t)) setForm((prev) => ({ ...prev, [field]: [...prev[field], t] })); };
  const removeTag = (field: "specialties" | "neighborhoods" | "languages", idx: number) => { setForm((prev) => ({ ...prev, [field]: prev[field].filter((_, i) => i !== idx) })); };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-off-white">Agents</h1>
          <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-semibold text-gold">{agents.length}</span>
        </div>
        <button onClick={openAddForm} className="flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-near-black hover:bg-gold-light transition-colors"><Plus className="h-4 w-4" />Add Agent</button>
      </div>
      <div className="mt-6">
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 3 }).map((_, i) => (<div key={i} className="h-48 animate-pulse rounded-xl border border-white/10 bg-[#1E1E32]" />))}</div>
        ) : agents.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-[#1E1E32] py-16"><p className="text-sm text-off-white/40">No agents found</p></div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {agents.map((agent) => (
              <div key={agent.id} className="rounded-xl border border-white/10 bg-[#1E1E32] p-5 transition-all hover:border-gold/20">
                <div className="flex items-start gap-4">
                  {agent.photo ? (
                    <img src={agent.photo} alt={agent.full_name} className="h-14 w-14 shrink-0 rounded-full border-2 border-gold/30 object-cover" />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-gold/30 bg-gold/10 text-lg font-bold text-gold">{agent.first_name[0]}{agent.last_name[0]}</div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-off-white truncate">{agent.full_name}</h3>
                    <p className="text-sm text-gold/80">{agent.title}</p>
                  </div>
                  <button onClick={() => openEditForm(agent)} className="rounded p-1.5 text-off-white/40 hover:bg-white/5 hover:text-off-white transition-colors shrink-0" aria-label="Edit"><Pencil className="h-3.5 w-3.5" /></button>
                </div>
                <div className="mt-4 space-y-1.5">
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-xs text-off-white/50 hover:text-gold transition-colors"><Mail className="h-3 w-3" />{agent.email}</a>
                  <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-xs text-off-white/50 hover:text-gold transition-colors"><Phone className="h-3 w-3" />{agent.phone}</a>
                </div>
                {agent.specialties.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {agent.specialties.slice(0, 3).map((s) => (<span key={s} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-off-white/40">{s}</span>))}
                    {agent.specialties.length > 3 && (<span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-off-white/30">+{agent.specialties.length - 3}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {showForm && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setShowForm(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto border-l border-white/10 bg-[#141425] sm:w-[520px]">
            <div className="flex items-center justify-between border-b border-white/5 p-5">
              <h2 className="text-lg font-bold text-off-white">{editingId ? "Edit Agent" : "Add Agent"}</h2>
              <button onClick={() => setShowForm(false)} className="rounded p-1 text-off-white/40 hover:text-off-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4 p-5">
              <div className="grid grid-cols-2 gap-4"><FormInput label="First Name" value={form.first_name} onChange={(v) => updateField("first_name", v)} /><FormInput label="Last Name" value={form.last_name} onChange={(v) => updateField("last_name", v)} /></div>
              <div className="grid grid-cols-2 gap-4"><FormInput label="Slug" value={form.slug} onChange={(v) => updateField("slug", v)} /><FormInput label="Title" value={form.title} onChange={(v) => updateField("title", v)} /></div>
              <div className="grid grid-cols-2 gap-4"><FormInput label="Email" value={form.email} onChange={(v) => updateField("email", v)} /><FormInput label="Phone" value={form.phone} onChange={(v) => updateField("phone", v)} /></div>
              <FormInput label="Photo URL" value={form.photo} onChange={(v) => updateField("photo", v)} />
              <FormInput label="License Number" value={form.license_number} onChange={(v) => updateField("license_number", v)} />
              <div><label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">Short Bio</label><textarea value={form.short_bio} onChange={(e) => updateField("short_bio", e.target.value)} rows={2} className="w-full rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus:border-gold/50 resize-none" /></div>
              <div><label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">Bio</label><textarea value={form.bio} onChange={(e) => updateField("bio", e.target.value)} rows={4} className="w-full rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus:border-gold/50 resize-none" /></div>
              <TagInput label="Specialties" tags={form.specialties} inputValue={specialtyInput} onInputChange={setSpecialtyInput} onAdd={() => { addTag("specialties", specialtyInput); setSpecialtyInput(""); }} onRemove={(i) => removeTag("specialties", i)} />
              <TagInput label="Neighborhoods" tags={form.neighborhoods} inputValue={neighborhoodInput} onInputChange={setNeighborhoodInput} onAdd={() => { addTag("neighborhoods", neighborhoodInput); setNeighborhoodInput(""); }} onRemove={(i) => removeTag("neighborhoods", i)} />
              <TagInput label="Languages" tags={form.languages} inputValue={languageInput} onInputChange={setLanguageInput} onAdd={() => { addTag("languages", languageInput); setLanguageInput(""); }} onRemove={(i) => removeTag("languages", i)} />
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={saving} className="flex-1 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-near-black hover:bg-gold-light transition-colors disabled:opacity-50">{saving ? "Saving..." : editingId ? "Update Agent" : "Create Agent"}</button>
                <button onClick={() => setShowForm(false)} className="rounded-lg border border-white/10 px-4 py-2.5 text-sm text-off-white/60 hover:bg-white/5 transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function FormInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (<div><label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">{label}</label><input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus:border-gold/50" /></div>);
}

function TagInput({ label, tags, inputValue, onInputChange, onAdd, onRemove }: { label: string; tags: string[]; inputValue: string; onInputChange: (v: string) => void; onAdd: () => void; onRemove: (i: number) => void }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">{label}</label>
      <div className="flex gap-2">
        <input type="text" value={inputValue} onChange={(e) => onInputChange(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onAdd(); } }} placeholder={`Add ${label.toLowerCase()}...`} className="flex-1 rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus:border-gold/50" />
        <button type="button" onClick={onAdd} className="rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white/70 hover:bg-white/5 transition-colors">Add</button>
      </div>
      {tags.length > 0 && (<div className="mt-2 flex flex-wrap gap-1.5">{tags.map((tag, i) => (<span key={i} className="flex items-center gap-1 rounded-full bg-gold/10 px-2.5 py-0.5 text-xs text-gold">{tag}<button onClick={() => onRemove(i)} className="text-gold/50 hover:text-gold"><X className="h-3 w-3" /></button></span>))}</div>)}
    </div>
  );
}
