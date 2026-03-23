"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

export interface AgentFilterState {
  sort: string;
  neighborhood: string;
}

export const defaultAgentFilters: AgentFilterState = {
  sort: "",
  neighborhood: "",
};

export default function AgentFilters({
  filters,
  onChange,
  onClear,
  neighborhoods,
}: {
  filters: AgentFilterState;
  onChange: (key: keyof AgentFilterState, value: string) => void;
  onClear: () => void;
  neighborhoods: string[];
}) {
  const [open, setOpen] = useState(false);

  const activeCount = Object.entries(filters).filter(([, v]) => v !== "").length;

  const selectClasses =
    "w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold sm:py-2";

  return (
    <div className="border-b border-border bg-cream/80 backdrop-blur-sm mb-8">
      {/* Mobile toggle */}
      <div className="flex items-center justify-between px-4 py-3 lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters {activeCount > 0 && `(${activeCount})`}
        </button>
        <select
          value={filters.sort}
          onChange={(e) => onChange("sort", e.target.value)}
          className={selectClasses + " w-auto"}
        >
          <option value="">Default Order</option>
          <option value="az">Name: A→Z</option>
          <option value="za">Name: Z→A</option>
        </select>
      </div>

      {/* Filter bar */}
      <div
        className={`${open ? "block" : "hidden"} px-4 pb-4 lg:flex lg:items-end lg:gap-3 lg:px-6 lg:py-4`}
      >
        <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-wrap lg:items-end lg:gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Neighborhood
            </label>
            <select
              value={filters.neighborhood}
              onChange={(e) => onChange("neighborhood", e.target.value)}
              className={selectClasses}
            >
              <option value="">All Neighborhoods</option>
              {neighborhoods.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 lg:mt-0 lg:ml-auto">
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className="text-sm font-medium text-gold hover:text-gold-light"
            >
              Clear All
            </button>
          )}
          <div className="hidden lg:block">
            <select
              value={filters.sort}
              onChange={(e) => onChange("sort", e.target.value)}
              className={selectClasses + " w-auto"}
            >
              <option value="">Default Order</option>
              <option value="az">Name: A→Z</option>
              <option value="za">Name: Z→A</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
