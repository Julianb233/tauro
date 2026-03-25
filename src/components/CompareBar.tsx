"use client";

import Image from "next/image";
import Link from "next/link";
import { useCompare } from "@/hooks/useCompare";
import { properties } from "@/data/properties";
import { BLUR_LANDSCAPE } from "@/lib/blur-placeholder";

export function CompareBar() {
  const { ids, count, remove, clear } = useCompare();

  if (count < 2) return null;

  const selected = ids
    .map((id) => properties.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div role="region" aria-label={`Property comparison: ${count} properties selected`} className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/30 bg-near-black/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,.35)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        {/* Thumbnails */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {selected.map((p) =>
            p ? (
              <div key={p.id} className="relative flex-shrink-0">
                <div className="relative h-14 w-20 overflow-hidden rounded-md border border-gold/40">
                  <Image
                    src={p.images[0]}
                    alt={p.address}
                    fill
                    className="object-cover"
                    sizes="80px"
                    placeholder="blur"
                    blurDataURL={BLUR_LANDSCAPE}
                  />
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${p.address}`}
                  onClick={() => remove(p.id)}
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow transition hover:bg-red-500"
                >
                  X
                </button>
                <p className="mt-0.5 max-w-[80px] truncate text-[10px] text-white/90">
                  {p.address}
                </p>
              </div>
            ) : null
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clear}
            className="text-xs text-white/80 underline underline-offset-2 transition hover:text-white"
          >
            Clear All
          </button>
          <Link
            href="/compare"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-near-black shadow transition hover:bg-gold-light"
          >
            Compare Now
            <span aria-hidden="true" className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-near-black/20 text-xs font-bold">
              {count}
            </span>
            <span className="sr-only">{count} properties</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
