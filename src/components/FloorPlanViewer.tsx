"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

interface FloorPlan {
  src: string;
  label: string;
}

export default function FloorPlanViewer({ plans }: { plans: FloorPlan[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  if (plans.length === 0) return null;

  return (
    <div>
      <h2 className="font-heading text-xl font-bold">Floor Plans</h2>

      {/* Level tabs */}
      {plans.length > 1 && (
        <div className="mt-3 flex gap-2">
          {plans.map((plan, i) => (
            <button
              key={plan.label}
              onClick={() => setActiveIndex(i)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeIndex === i
                  ? "bg-gold text-near-black"
                  : "border border-border bg-white text-muted-foreground hover:border-gold/40 hover:text-foreground"
              }`}
            >
              {plan.label}
            </button>
          ))}
        </div>
      )}

      {/* Floor plan image */}
      <div className="relative mt-4 overflow-hidden rounded-xl border border-border bg-white">
        <button
          onClick={() => setOpen(true)}
          className="group relative block w-full cursor-zoom-in"
          aria-label={`View ${plans[activeIndex].label} full screen`}
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={plans[activeIndex].src}
              alt={plans[activeIndex].label}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/5">
            <span className="flex items-center gap-2 rounded-lg bg-white/90 px-4 py-2 text-sm font-medium text-foreground opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <Maximize2 className="h-4 w-4" />
              Click to zoom
            </span>
          </div>
        </button>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={activeIndex}
        slides={plans.map((p) => ({ src: p.src, alt: p.label }))}
        on={{ view: ({ index }) => setActiveIndex(index) }}
        plugins={[Counter, Fullscreen, Zoom]}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
        zoom={{ maxZoomPixelRatio: 3 }}
      />
    </div>
  );
}
