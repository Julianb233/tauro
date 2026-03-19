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
    <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-2xl">
      <div className="glass-gold flex items-center rounded-xl p-1.5 shadow-2xl">
        <div className="flex flex-1 items-center gap-2 px-3 sm:px-4">
          <Search className="size-5 shrink-0 text-gold" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search neighborhood, address, ZIP..."
            className="w-full min-w-0 bg-transparent py-3 text-sm text-white placeholder:text-white/50 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="shimmer-gold shrink-0 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg sm:px-6"
        >
          Search
        </button>
      </div>
    </form>
  );
}
