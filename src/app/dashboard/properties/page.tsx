"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PropertyRow } from "@/types/database";

const propertyStatuses = ["Active", "Pending", "Sold", "Open House", "New"];
const propertyTypes = ["Single Family", "Condo", "Townhouse", "Multi-Family", "Land"];

const statusColors: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400",
  Pending: "bg-yellow-500/20 text-yellow-400",
  Sold: "bg-white/10 text-white/50",
  "Open House": "bg-purple-500/20 text-purple-400",
  New: "bg-blue-500/20 text-blue-400",
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);
}

interface PropertyFormData {
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  neighborhood: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lot_sqft: number;
  status: string;
  property_type: string;
  description: string;
  images: string[];
  featured: boolean;
}

const emptyForm: PropertyFormData = {
  slug: "", address: "", city: "Philadelphia", state: "PA", zip: "", neighborhood: "",
  price: 0, beds: 0, baths: 0, sqft: 0, lot_sqft: 0, status: "Active",
  property_type: "Single Family", description: "", images: [], featured: false,
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<PropertyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [form, setForm] = useState<PropertyFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "50", offset: "0" });
      if (statusFilter) params.set("status", statusFilter);
      const res = await fetch(`/api/properties?${params.toString()}`);
      const data = await res.json();
      setProperties(data.data ?? []);
      setTotalCount(data.count ?? 0);
    } catch { setProperties([]); } finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => { fetchProperties(); }, [fetchProperties]);

  const openAddForm = () => { setEditingSlug(null); setForm(emptyForm); setShowForm(true); };
  const openEditForm = (prop: PropertyRow) => {
    setEditingSlug(prop.slug);
    setForm({
      slug: prop.slug, address: prop.address, city: prop.city, state: prop.state,
      zip: prop.zip, neighborhood: prop.neighborhood, price: prop.price,
      beds: prop.beds, baths: prop.baths, sqft: prop.sqft, lot_sqft: prop.lot_sqft,
      status: prop.status, property_type: prop.property_type, description: prop.description,
      images: prop.images ?? [], featured: prop.featured,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingSlug) {
        await fetch(`/api/properties/${editingSlug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      } else {
        await fetch("/api/properties", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      }
      setShowForm(false);
      fetchProperties();
    } finally { setSaving(false); }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;
    setDeleting(slug);
    try { await fetch(`/api/properties/${slug}`, { method: "DELETE" }); fetchProperties(); } finally { setDeleting(null); }
  };

  const addImage = () => { if (imageUrl.trim()) { setForm((prev) => ({ ...prev, images: [...prev.images, imageUrl.trim()] })); setImageUrl(""); } };
  const removeImage = (idx: number) => { setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) })); };
  const updateField = <K extends keyof PropertyFormData>(key: K, value: PropertyFormData[K]) => { setForm((prev) => ({ ...prev, [key]: value })); };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-off-white">Properties</h1>
          <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-semibold text-gold">{totalCount}</span>
        </div>
        <button onClick={openAddForm} className="flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-near-black hover:bg-gold-light transition-colors">
          <Plus className="h-4 w-4" />Add Property
        </button>
      </div>
      <div className="mt-4">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus:border-gold/50">
          <option value="">All Statuses</option>
          {propertyStatuses.map((s) => (<option key={s} value={s}>{s}</option>))}
        </select>
      </div>
      <div className="mt-4">
        {loading ? (
          <div className="space-y-2">{Array.from({ length: 4 }).map((_, i) => (<div key={i} className="h-12 animate-pulse rounded-lg border border-white/10 bg-[#1E1E32]" />))}</div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-[#1E1E32] py-16"><p className="text-sm text-off-white/40">No properties found</p></div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-[#1E1E32]">
                    <th className="px-4 py-3 text-left font-medium text-off-white/60">Address</th>
                    <th className="px-4 py-3 text-left font-medium text-off-white/60 hidden sm:table-cell">Price</th>
                    <th className="px-4 py-3 text-left font-medium text-off-white/60 hidden md:table-cell">Type</th>
                    <th className="px-4 py-3 text-left font-medium text-off-white/60">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-off-white/60 hidden lg:table-cell">Beds/Baths</th>
                    <th className="px-4 py-3 text-right font-medium text-off-white/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((prop) => (
                    <tr key={prop.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors">
                      <td className="px-4 py-3"><div className="font-medium text-off-white">{prop.address}</div><div className="text-xs text-off-white/40">{prop.neighborhood}</div></td>
                      <td className="px-4 py-3 text-off-white/80 hidden sm:table-cell">{formatPrice(prop.price)}</td>
                      <td className="px-4 py-3 text-off-white/60 hidden md:table-cell">{prop.property_type}</td>
                      <td className="px-4 py-3"><span className={cn("inline-block rounded-full px-2 py-0.5 text-xs font-medium", statusColors[prop.status] ?? "bg-white/10 text-white/60")}>{prop.status}</span></td>
                      <td className="px-4 py-3 text-off-white/60 hidden lg:table-cell">{prop.beds} bd / {prop.baths} ba</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEditForm(prop)} className="rounded p-1.5 text-off-white/40 hover:bg-white/5 hover:text-off-white transition-colors" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                          <button onClick={() => handleDelete(prop.slug)} disabled={deleting === prop.slug} className="rounded p-1.5 text-red-400/60 hover:bg-red-500/10 hover:text-red-400 transition-colors disabled:opacity-50" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {showForm && (
        <>
          <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setShowForm(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto border-l border-white/10 bg-[#141425] sm:w-[520px]">
            <div className="flex items-center justify-between border-b border-white/5 p-5">
              <h2 className="text-lg font-bold text-off-white">{editingSlug ? "Edit Property" : "Add Property"}</h2>
              <button onClick={() => setShowForm(false)} className="rounded p-1 text-off-white/40 hover:text-off-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4 p-5">
              <div className="grid grid-cols-2 gap-4"><FormInput label="Slug" value={form.slug} onChange={(v) => updateField("slug", v)} /><FormInput label="Address" value={form.address} onChange={(v) => updateField("address", v)} /></div>
              <div className="grid grid-cols-3 gap-4"><FormInput label="City" value={form.city} onChange={(v) => updateField("city", v)} /><FormInput label="State" value={form.state} onChange={(v) => updateField("state", v)} /><FormInput label="ZIP" value={form.zip} onChange={(v) => updateField("zip", v)} /></div>
              <FormInput label="Neighborhood" value={form.neighborhood} onChange={(v) => updateField("neighborhood", v)} />
              <div className="grid grid-cols-2 gap-4"><FormInput label="Price" type="number" value={String(form.price)} onChange={(v) => updateField("price", Number(v))} /><FormInput label="Sqft" type="number" value={String(form.sqft)} onChange={(v) => updateField("sqft", Number(v))} /></div>
              <div className="grid grid-cols-3 gap-4"><FormInput label="Beds" type="number" value={String(form.beds)} onChange={(v) => updateField("beds", Number(v))} /><FormInput label="Baths" type="number" value={String(form.baths)} onChange={(v) => updateField("baths", Number(v))} /><FormInput label="Lot Sqft" type="number" value={String(form.lot_sqft)} onChange={(v) => updateField("lot_sqft", Number(v))} /></div>
              <div className="grid grid-cols-2 gap-4"><FormSelect label="Status" value={form.status} options={propertyStatuses} onChange={(v) => updateField("status", v)} /><FormSelect label="Type" value={form.property_type} options={propertyTypes} onChange={(v) => updateField("property_type", v)} /></div>
              <div><label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">Description</label><textarea value={form.description} onChange={(e) => updateField("description", e.target.value)} rows={3} className="w-full rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus:border-gold/50 resize-none" /></div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">Images</label>
                <div className="flex gap-2">
                  <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Paste image URL..." className="flex-1 rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus:border-gold/50" />
                  <button onClick={addImage} className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white/70 hover:bg-white/5 transition-colors"><Upload className="h-3.5 w-3.5" />Add</button>
                </div>
                {form.images.length > 0 && (<div className="mt-2 flex flex-wrap gap-2">{form.images.map((img, idx) => (<div key={idx} className="group relative h-16 w-16 overflow-hidden rounded-md border border-white/10"><img src={img} alt="" className="h-full w-full object-cover" /><button onClick={() => removeImage(idx)} className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-4 w-4 text-white" /></button></div>))}</div>)}
              </div>
              <label className="flex items-center gap-2 text-sm text-off-white/70"><input type="checkbox" checked={form.featured} onChange={(e) => updateField("featured", e.target.checked)} className="rounded border-white/20" />Featured property</label>
              <div className="flex gap-3 pt-2">
                <button onClick={handleSave} disabled={saving} className="flex-1 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-near-black hover:bg-gold-light transition-colors disabled:opacity-50">{saving ? "Saving..." : editingSlug ? "Update Property" : "Create Property"}</button>
                <button onClick={() => setShowForm(false)} className="rounded-lg border border-white/10 px-4 py-2.5 text-sm text-off-white/60 hover:bg-white/5 transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function FormInput({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (<div><label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">{label}</label><input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus:border-gold/50" /></div>);
}

function FormSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (<div><label className="mb-1 block text-xs font-medium uppercase tracking-wider text-off-white/40">{label}</label><select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-lg border border-white/10 bg-[#1E1E32] px-3 py-2 text-sm text-off-white outline-none focus:border-gold/50">{options.map((o) => (<option key={o} value={o}>{o}</option>))}</select></div>);
}
