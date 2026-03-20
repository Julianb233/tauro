"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Agent } from "@/data/agents";
import AgentCard from "@/components/AgentCard";
import { cn } from "@/lib/utils";

interface AgentDirectoryClientProps {
  agents: Agent[];
}

export default function AgentDirectoryClient({ agents }: AgentDirectoryClientProps) {
  const [query, setQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  // Collect all unique specialties and neighborhoods
  const specialties = useMemo(() => {
    const set = new Set<string>();
    agents.forEach((a) => a.specialties.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [agents]);

  const neighborhoods = useMemo(() => {
    const set = new Set<string>();
    agents.forEach((a) => a.neighborhoods.forEach((n) => set.add(n)));
    return Array.from(set).sort();
  }, [agents]);

  const filtered = useMemo(() => {
    return agents.filter((agent) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        agent.fullName.toLowerCase().includes(q) ||
        agent.title.toLowerCase().includes(q) ||
        agent.specialties.some((s) => s.toLowerCase().includes(q)) ||
        agent.neighborhoods.some((n) => n.toLowerCase().includes(q));

      const matchesSpecialty =
        !selectedSpecialty || agent.specialties.includes(selectedSpecialty);

      const matchesNeighborhood =
        !selectedNeighborhood || agent.neighborhoods.includes(selectedNeighborhood);

      return matchesQuery && matchesSpecialty && matchesNeighborhood;
    });
  }, [agents, query, selectedSpecialty, selectedNeighborhood]);

  const hasFilters = !!query || !!selectedSpecialty || !!selectedNeighborhood;

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search agents by name, specialty, or neighborhood..."
              className="w-full rounded-lg border border-border/40 bg-white py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
              showFilters || hasFilters
                ? "border-gold/40 bg-gold/5 text-gold"
                : "border-border/40 text-muted-foreground hover:border-gold/40 hover:text-gold"
            )}
          >
            <SlidersHorizontal className="size-4" />
            Filters
          </button>
        </div>

        {/* Filter dropdowns */}
        {showFilters && (
          <div className="flex flex-wrap gap-3 rounded-lg border border-border/40 bg-white/50 p-4">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Specialty
              </label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="rounded-lg border border-border/40 bg-white px-3 py-2 text-sm text-foreground focus:border-gold/60 focus:outline-none"
              >
                <option value="">All Specialties</option>
                {specialties.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Neighborhood
              </label>
              <select
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
                className="rounded-lg border border-border/40 bg-white px-3 py-2 text-sm text-foreground focus:border-gold/60 focus:outline-none"
              >
                <option value="">All Neighborhoods</option>
                {neighborhoods.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSelectedSpecialty("");
                  setSelectedNeighborhood("");
                }}
                className="self-end rounded-lg px-3 py-2 text-sm text-gold hover:underline"
              >
                Clear All
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results count */}
      {hasFilters && (
        <p className="mb-4 text-sm text-muted-foreground">
          Showing {filtered.length} of {agents.length} agents
        </p>
      )}

      {/* Agent grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filtered.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-lg font-semibold text-foreground">No agents found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}
