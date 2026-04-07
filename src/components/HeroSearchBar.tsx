"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, User, Building2, Hash, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface AutocompleteResult {
  type: "neighborhood" | "address" | "agent" | "city" | "zip";
  label: string;
  sublabel?: string;
  href: string;
  count?: number;
}

type Tab = "buy" | "rent" | "sell";

const RECENT_KEY = "tauro-recent-searches";
const MAX_RECENT = 5;

const POPULAR_SEARCHES = [
  { label: "Rittenhouse Square", href: "/properties?area=Rittenhouse" },
  { label: "Center City Condos", href: "/properties?area=Center+City&type=Condo" },
  { label: "Homes under $500K", href: "/properties?priceMax=500000" },
  { label: "New Construction", href: "/properties?newConstruction=yes" },
];

function getRecentSearches(): { label: string; href: string }[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRecentSearch(label: string, href: string) {
  const recent = getRecentSearches().filter((r) => r.label !== label);
  recent.unshift({ label, href });
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

const TYPE_ICONS: Record<AutocompleteResult["type"], typeof MapPin> = {
  neighborhood: MapPin,
  address: Building2,
  agent: User,
  city: MapPin,
  zip: Hash,
};

export default function HeroSearchBar() {
  const [activeTab, setActiveTab] = useState<Tab>("buy");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AutocompleteResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<{ label: string; href: string }[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Load recent searches on mount
  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Debounced autocomplete fetch
  const fetchResults = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search/autocomplete?q=${encodeURIComponent(q.trim())}`);
        const data = await res.json();
        setResults(data.results || []);
        setActiveIndex(-1);
      } catch {
        setResults([]);
      }
    }, 300);
  }, []);

  function handleInputChange(value: string) {
    setQuery(value);
    fetchResults(value);
    setShowDropdown(true);
  }

  function navigateTo(label: string, href: string) {
    saveRecentSearch(label, href);
    setRecentSearches(getRecentSearches());
    setShowDropdown(false);
    setQuery("");
    router.push(href);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (activeIndex >= 0 && activeIndex < results.length) {
      const r = results[activeIndex];
      navigateTo(r.label, r.href);
      return;
    }
    const trimmed = query.trim();
    const href = trimmed ? `/properties?search=${encodeURIComponent(trimmed)}` : "/properties";
    if (trimmed) saveRecentSearch(trimmed, href);
    setShowDropdown(false);
    setQuery("");
    router.push(href);
  }

  function handleTabClick(tab: Tab) {
    if (tab === "sell") {
      router.push("/home-value");
      return;
    }
    setActiveTab(tab);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showDropdown) return;
    const total = results.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1));
    } else if (e.key === "Escape") {
      setShowDropdown(false);
      setActiveIndex(-1);
    }
  }

  const showEmpty = showDropdown && query.trim().length < 2;
  const showResults = showDropdown && results.length > 0 && query.trim().length >= 2;

  return (
    <div ref={dropdownRef} className="relative mx-auto mt-10 max-w-2xl">
      {/* Tabs */}
      <div className="mb-2 flex justify-center gap-1">
        {(["buy", "rent", "sell"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabClick(tab)}
            className={cn(
              "rounded-t-lg px-6 py-2 text-sm font-semibold uppercase tracking-wider transition-all",
              activeTab === tab && tab !== "sell"
                ? "bg-white/15 text-gold backdrop-blur-sm"
                : "text-white/60 hover:text-white/90"
            )}
          >
            {tab === "rent" ? "Rent" : tab === "sell" ? "Sell" : "Buy"}
          </button>
        ))}
      </div>

      {/* Search input */}
      <form onSubmit={handleSubmit} role="search" aria-label="Property search">
        <div className="glass-gold flex items-center rounded-xl p-1.5 shadow-2xl">
          <div className="flex flex-1 items-center gap-2 px-3 sm:px-4">
            <Search className="size-5 shrink-0 text-gold" aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={handleKeyDown}
              placeholder={
                activeTab === "rent"
                  ? "Rental search coming soon..."
                  : "Search neighborhood, address, ZIP..."
              }
              disabled={activeTab === "rent"}
              className="w-full min-w-0 bg-transparent py-3 text-sm text-white placeholder:text-white/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Search by neighborhood, address, or ZIP code"
              aria-expanded={showResults || showEmpty}
              aria-controls="search-dropdown"
              aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={activeTab === "rent"}
            className="shimmer-gold shrink-0 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg disabled:opacity-50 sm:px-6"
          >
            Search
          </button>
        </div>
      </form>

      {/* Rent coming soon overlay */}
      {activeTab === "rent" && (
        <div className="mt-2 text-center text-sm text-white/60">
          Rental listings coming soon. Contact us for rental inquiries.
        </div>
      )}

      {/* Autocomplete dropdown */}
      {(showResults || showEmpty) && activeTab === "buy" && (
        <div
          id="search-dropdown"
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-near-black/95 shadow-2xl backdrop-blur-xl"
        >
          {/* Results */}
          {showResults && (
            <div className="py-2">
              {results.map((r, i) => {
                const Icon = TYPE_ICONS[r.type];
                return (
                  <button
                    key={`${r.type}-${r.label}`}
                    id={`search-result-${i}`}
                    role="option"
                    aria-selected={i === activeIndex}
                    type="button"
                    onClick={() => navigateTo(r.label, r.href)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                      i === activeIndex ? "bg-gold/10" : "hover:bg-white/5"
                    )}
                  >
                    <Icon className="size-4 shrink-0 text-gold" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-white">{r.label}</div>
                      {r.sublabel && (
                        <div className="truncate text-xs text-white/50">{r.sublabel}</div>
                      )}
                    </div>
                    <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/40">
                      {r.type}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Empty state: Recent + Popular */}
          {showEmpty && (
            <div className="py-3">
              {recentSearches.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-2 px-4 py-1">
                    <Clock className="size-3 text-white/30" />
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
                      Recent Searches
                    </span>
                  </div>
                  {recentSearches.map((r) => (
                    <button
                      key={r.label}
                      type="button"
                      onClick={() => navigateTo(r.label, r.href)}
                      className="flex w-full items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-white/5"
                    >
                      <Clock className="size-3.5 text-white/30" />
                      <span className="truncate text-sm text-white/70">{r.label}</span>
                    </button>
                  ))}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 px-4 py-1">
                  <TrendingUp className="size-3 text-gold/50" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gold/50">
                    Popular Searches
                  </span>
                </div>
                {POPULAR_SEARCHES.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => navigateTo(s.label, s.href)}
                    className="flex w-full items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-white/5"
                  >
                    <TrendingUp className="size-3.5 text-gold/40" />
                    <span className="truncate text-sm text-white/70">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
