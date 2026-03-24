"use client";

import { useState, useMemo } from "react";
import type { Agent } from "@/data/agents";
import AgentCard from "@/components/AgentCard";
import AgentFilters, { AgentFilterState, defaultAgentFilters } from "@/components/AgentFilters";

export default function AgentsGrid({ agents }: { agents: Agent[] }) {
  const [filters, setFilters] = useState<AgentFilterState>(defaultAgentFilters);

  const allNeighborhoods = useMemo(() => {
    const set = new Set<string>();
    agents.forEach((a) => a.neighborhoods.forEach((n) => set.add(n)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [agents]);

  const allSpecialties = useMemo(() => {
    const set = new Set<string>();
    agents.forEach((a) => a.specialties.forEach((s) => set.add(s)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [agents]);

  const allLanguages = useMemo(() => {
    const set = new Set<string>();
    agents.forEach((a) => a.languages.forEach((l) => set.add(l)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [agents]);

  const filtered = useMemo(() => {
    let result = [...agents];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.fullName.toLowerCase().includes(q) ||
          a.firstName.toLowerCase().includes(q) ||
          a.lastName.toLowerCase().includes(q)
      );
    }

    if (filters.neighborhood) {
      result = result.filter((a) => a.neighborhoods.includes(filters.neighborhood));
    }

    if (filters.specialty) {
      result = result.filter((a) => a.specialties.includes(filters.specialty));
    }

    if (filters.language) {
      result = result.filter((a) => a.languages.includes(filters.language));
    }

    if (filters.sort === "az") {
      result.sort((a, b) => a.lastName.localeCompare(b.lastName));
    } else if (filters.sort === "za") {
      result.sort((a, b) => b.lastName.localeCompare(a.lastName));
    }

    return result;
  }, [agents, filters]);

  const handleChange = (key: keyof AgentFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClear = () => {
    setFilters(defaultAgentFilters);
  };

  return (
    <>
      <AgentFilters
        filters={filters}
        onChange={handleChange}
        onClear={handleClear}
        neighborhoods={allNeighborhoods}
        specialties={allSpecialties}
        languages={allLanguages}
      />

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">
            No agents match your search. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filtered.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      )}

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Showing {filtered.length} of {agents.length} agents
      </p>
    </>
  );
}
