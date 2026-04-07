"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { FilterState } from "@/components/PropertyFilters";
import { defaultFilters } from "@/components/PropertyFilters";

const STORAGE_KEY = "tauro_saved_searches";

export type AlertFrequency = "none" | "daily" | "weekly";

export interface SavedSearch {
  id: string;
  name: string;
  filters: FilterState;
  createdAt: string;
  alertFrequency: AlertFrequency;
  alertEmail?: string;
}

// ---------- shared external store so every component stays in sync ----------
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((l) => l());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

// Snapshot reference must be stable when data hasn't changed
let cachedSnapshot: SavedSearch[] = [];
const EMPTY: SavedSearch[] = [];

function getSnapshot(): SavedSearch[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const next: SavedSearch[] = raw ? (JSON.parse(raw) as SavedSearch[]) : [];
    if (
      next.length === cachedSnapshot.length &&
      next.every((s, i) => s.id === cachedSnapshot[i]?.id)
    ) {
      return cachedSnapshot;
    }
    cachedSnapshot = next;
    return cachedSnapshot;
  } catch {
    return cachedSnapshot;
  }
}

function getServerSnapshot(): SavedSearch[] {
  return EMPTY;
}

function persist(searches: SavedSearch[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
  emitChange();
}

// ---------- helpers ----------

/** Check if any real filter is active (ignoring sort) */
export function hasActiveFilters(filters: FilterState): boolean {
  return Object.entries(filters).some(
    ([k, v]) => k !== "sort" && v && v !== defaultFilters[k as keyof FilterState],
  );
}

/** Build a human-readable summary of active filters */
export function buildFilterSummary(filters: FilterState): string {
  const parts: string[] = [];

  if (filters.priceMin || filters.priceMax) {
    const min = filters.priceMin ? formatPrice(Number(filters.priceMin)) : "Any";
    const max = filters.priceMax ? formatPrice(Number(filters.priceMax)) : "Any";
    parts.push(`Price: ${min} - ${max}`);
  }
  if (filters.beds) parts.push(`${filters.beds}+ Beds`);
  if (filters.baths) parts.push(`${filters.baths}+ Baths`);
  if (filters.sqftMin || filters.sqftMax) {
    const min = filters.sqftMin ? `${Number(filters.sqftMin).toLocaleString()} SF` : "Any";
    const max = filters.sqftMax ? `${Number(filters.sqftMax).toLocaleString()} SF` : "Any";
    parts.push(`Sqft: ${min} - ${max}`);
  }
  /* AI-3870: Lot size filter summary */
  if (filters.lotSizeMin || filters.lotSizeMax) {
    const formatLot = (n: number) => n >= 43560 ? `${(n / 43560).toFixed(n % 43560 === 0 ? 0 : 1)} Acre${n >= 87120 ? "s" : ""}` : `${n.toLocaleString()} SF`;
    const min = filters.lotSizeMin ? formatLot(Number(filters.lotSizeMin)) : "Any";
    const max = filters.lotSizeMax ? formatLot(Number(filters.lotSizeMax)) : "Any";
    parts.push(`Lot: ${min} - ${max}`);
  }
  if (filters.area) parts.push(filters.area);
  if (filters.propertyType) parts.push(filters.propertyType);
  if (filters.status) parts.push(filters.status);
  if (filters.lifestyle) parts.push(`Lifestyle: ${filters.lifestyle}`);

  return parts.length > 0 ? parts.join(" | ") : "No filters";
}

/** Build URL search params from a FilterState */
export function buildSearchUrl(filters: FilterState): string {
  const params = new URLSearchParams();
  if (filters.priceMin) params.set("priceMin", filters.priceMin);
  if (filters.priceMax) params.set("priceMax", filters.priceMax);
  if (filters.beds) params.set("beds", filters.beds);
  if (filters.baths) params.set("baths", filters.baths);
  if (filters.sqftMin) params.set("sqftMin", filters.sqftMin);
  if (filters.sqftMax) params.set("sqftMax", filters.sqftMax);
  if (filters.lotSizeMin) params.set("lotSizeMin", filters.lotSizeMin);
  if (filters.lotSizeMax) params.set("lotSizeMax", filters.lotSizeMax);
  if (filters.area) params.set("area", filters.area);
  if (filters.propertyType) params.set("type", filters.propertyType);
  if (filters.status) params.set("status", filters.status);
  if (filters.sort && filters.sort !== "price-desc") params.set("sort", filters.sort);
  if (filters.openHouse) params.set("openHouse", filters.openHouse);
  if (filters.lifestyle) params.set("lifestyle", filters.lifestyle);
  const qs = params.toString();
  return `/properties${qs ? `?${qs}` : ""}`;
}

function formatPrice(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

// ---------- hook ----------
export function useSavedSearches() {
  const searches = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const save = useCallback(
    (
      filters: FilterState,
      name?: string,
      alertFrequency: AlertFrequency = "none",
      alertEmail?: string,
    ) => {
      const current = getSnapshot();
      const newSearch: SavedSearch = {
        id: crypto.randomUUID(),
        name: name || buildFilterSummary(filters),
        filters,
        createdAt: new Date().toISOString(),
        alertFrequency,
        alertEmail,
      };
      persist([newSearch, ...current]);
      return newSearch;
    },
    [],
  );

  const remove = useCallback((id: string) => {
    const current = getSnapshot();
    persist(current.filter((s) => s.id !== id));
  }, []);

  const updateAlert = useCallback(
    (id: string, alertFrequency: AlertFrequency, alertEmail?: string) => {
      const current = getSnapshot();
      persist(
        current.map((s) =>
          s.id === id ? { ...s, alertFrequency, alertEmail } : s,
        ),
      );
    },
    [],
  );

  const getAll = useCallback(() => searches, [searches]);

  return {
    searches,
    save,
    remove,
    updateAlert,
    getAll,
    count: searches.length,
  };
}
