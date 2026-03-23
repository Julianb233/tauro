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

  const filtered = useMemo(() => {
    let result = [...agents];

    if (filters.neighborhood) {
      result = result.filter((a) => a.neighborhoods.includes(filters.neighborhood));
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
      />

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">
            No agents found for this neighborhood. Try clearing your filters.
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
