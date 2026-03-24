"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HeroSearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/properties?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/properties");
    }
  }

  return (
    <form onSubmit={handleSubmit} role="search" aria-label="Property search" className="mx-auto mt-10 max-w-2xl">
      <div className="glass-gold flex items-center rounded-xl p-1.5 shadow-2xl shadow-gold/10">
        <div className="flex flex-1 items-center gap-3 px-3 sm:px-4">
          <span className="flex size-8 items-center justify-center rounded-lg border border-gold/20 bg-gold/10">
            <Search className="size-4 shrink-0 text-gold" aria-hidden="true" />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search neighborhood, address, ZIP..."
            className="w-full min-w-0 bg-transparent py-3 text-sm text-white placeholder:text-white/50 focus-visible:outline-none"
            aria-label="Search by neighborhood, address, or ZIP code"
          />
        </div>
        <button
          type="submit"
          className="shimmer-gold shrink-0 rounded-lg bg-gold px-5 py-3 text-sm font-bold uppercase tracking-wide text-near-black shadow-md shadow-gold/20 transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/30 sm:px-7"
        >
          Search
        </button>
      </div>
    </form>
  );
}
