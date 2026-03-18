"use client";

import { Property, formatPrice } from "@/data/properties";

export default function MapPlaceholder({ properties }: { properties: Property[] }) {
  return (
    <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-xl border border-border bg-midnight/30">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Simulated pins */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[80%] w-[80%]">
          {properties.map((p, i) => {
            const positions = [
              { top: "20%", left: "30%" },
              { top: "15%", left: "60%" },
              { top: "35%", left: "75%" },
              { top: "55%", left: "45%" },
              { top: "65%", left: "20%" },
              { top: "45%", left: "55%" },
            ];
            const pos = positions[i % positions.length];
            return (
              <div
                key={p.id}
                className="group absolute -translate-x-1/2 -translate-y-full cursor-pointer"
                style={{ top: pos.top, left: pos.left }}
              >
                <div className="rounded-full bg-midnight px-2 py-1 text-xs font-bold text-gold shadow-md transition-colors group-hover:bg-gold group-hover:text-near-black">
                  {formatPrice(p.price)}
                </div>
                <div className="mx-auto h-2 w-2 rotate-45 -translate-y-1 bg-midnight transition-colors group-hover:bg-gold" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Notice */}
      <div className="absolute right-3 bottom-3 rounded-md bg-card/90 px-3 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur-sm">
        Interactive map coming soon
      </div>
    </div>
  );
}
