"use client";

import { useEffect, useState, useCallback } from "react";
import type { PropertyRow } from "@/types/database";
import { PropertyTable } from "@/components/dashboard/property-table";
import { PropertyForm } from "@/components/dashboard/property-form";
import { Building2, Plus } from "lucide-react";

interface AgentOption {
  id: string;
  full_name: string;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<PropertyRow[]>([]);
  const [agents, setAgents] = useState<AgentOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<PropertyRow | null>(null);

  const fetchProperties = useCallback(async () => {
    try {
      const res = await fetch("/api/properties?limit=200");
      if (res.ok) {
        const json = await res.json();
        setProperties(json.data ?? []);
      }
    } catch {
      // Silently fail -- properties will be empty
    } finally {
      setLoading(false);
    }
  }, []);

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
      // Agents dropdown will be empty
    }
  }, []);

  useEffect(() => {
    fetchProperties();
    fetchAgents();
  }, [fetchProperties, fetchAgents]);

  const handleEdit = (property: PropertyRow) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleDelete = async (slug: string) => {
    try {
      const res = await fetch(`/api/properties/${slug}`, { method: "DELETE" });
      if (res.ok || res.status === 204) {
        setProperties((prev) => prev.filter((p) => p.slug !== slug));
      }
    } catch {
      // Silently fail
    }
  };

  const handleStatusChange = async (slug: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/properties/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setProperties((prev) =>
          prev.map((p) => (p.slug === slug ? { ...p, status: newStatus } : p)),
        );
      }
    } catch {
      // Silently fail
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingProperty(null);
    setLoading(true);
    fetchProperties();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  const SkeletonTable = () => (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#1E1E32]">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 border-b border-white/5 px-4 py-4">
          <div className="h-12 w-12 animate-pulse rounded-md bg-white/5" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-48 animate-pulse rounded bg-white/5" />
            <div className="h-3 w-32 animate-pulse rounded bg-white/5" />
          </div>
          <div className="h-6 w-16 animate-pulse rounded-full bg-white/5" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-off-white lg:text-3xl">Property Manager</h1>
          {!loading && (
            <span className="inline-flex items-center rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-semibold text-gold">
              {properties.length}
            </span>
          )}
        </div>
        {!showForm && (
          <button
            onClick={() => { setEditingProperty(null); setShowForm(true); }}
            className="gold-shimmer inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-near-black transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Property
          </button>
        )}
      </div>

      {showForm ? (
        <PropertyForm
          property={editingProperty ?? undefined}
          agents={agents}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      ) : loading ? (
        <SkeletonTable />
      ) : properties.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[#1E1E32] py-16">
          <Building2 className="mb-4 h-12 w-12 text-off-white/20" />
          <p className="mb-1 text-lg font-medium text-off-white/60">No properties found</p>
          <p className="mb-6 text-sm text-off-white/40">Add your first listing to get started.</p>
          <button
            onClick={() => { setEditingProperty(null); setShowForm(true); }}
            className="gold-shimmer inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-near-black transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Add Property
          </button>
        </div>
      ) : (
        <PropertyTable
          properties={properties}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
