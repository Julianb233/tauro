"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type PointerEvent as ReactPointerEvent,
} from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STEPS = [
  0, 250_000, 500_000, 750_000, 1_000_000, 1_500_000, 2_000_000, 2_500_000,
  3_000_000, 4_000_000, 5_000_000, 7_500_000, 10_000_000,
];

const MIN_IDX = 0;
const MAX_IDX = STEPS.length - 1;

function formatPrice(v: number): string {
  if (v === 0) return "$0";
  if (v >= 1_000_000) {
    const m = v / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  return `$${(v / 1_000).toFixed(0)}K`;
}

/** Snap a raw dollar value to the nearest step index. */
function valueToIdx(value: number): number {
  if (value <= STEPS[0]) return 0;
  if (value >= STEPS[MAX_IDX]) return MAX_IDX;
  let best = 0;
  let bestDiff = Math.abs(STEPS[0] - value);
  for (let i = 1; i < STEPS.length; i++) {
    const diff = Math.abs(STEPS[i] - value);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return best;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PriceRangeSlider({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: {
  minValue: string;
  maxValue: string;
  onMinChange: (v: string) => void;
  onMaxChange: (v: string) => void;
}) {
  /* --- derived state from URL params -------------------------------- */
  const [minIdx, setMinIdx] = useState(() =>
    minValue ? valueToIdx(Number(minValue)) : MIN_IDX
  );
  const [maxIdx, setMaxIdx] = useState(() =>
    maxValue ? valueToIdx(Number(maxValue)) : MAX_IDX
  );

  /* Sync external filter changes (e.g. clear-all) back to slider */
  useEffect(() => {
    setMinIdx(minValue ? valueToIdx(Number(minValue)) : MIN_IDX);
  }, [minValue]);
  useEffect(() => {
    setMaxIdx(maxValue ? valueToIdx(Number(maxValue)) : MAX_IDX);
  }, [maxValue]);

  /* --- manual input fallback ---------------------------------------- */
  const [showInputs, setShowInputs] = useState(false);
  const [rawMin, setRawMin] = useState(minValue);
  const [rawMax, setRawMax] = useState(maxValue);
  useEffect(() => setRawMin(minValue), [minValue]);
  useEffect(() => setRawMax(maxValue), [maxValue]);

  /* --- dragging ----------------------------------------------------- */
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"min" | "max" | null>(null);
  /* AI-3869: Track active drag for tooltip display */
  const [activeDrag, setActiveDrag] = useState<"min" | "max" | null>(null);

  const pctOf = (idx: number) => (idx / MAX_IDX) * 100;

  const idxFromPointer = useCallback((clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(pct * MAX_IDX);
  }, []);

  const commitMin = useCallback(
    (idx: number) => {
      const clamped = Math.min(idx, maxIdx);
      setMinIdx(clamped);
      onMinChange(clamped === MIN_IDX ? "" : String(STEPS[clamped]));
    },
    [maxIdx, onMinChange]
  );

  const commitMax = useCallback(
    (idx: number) => {
      const clamped = Math.max(idx, minIdx);
      setMaxIdx(clamped);
      onMaxChange(clamped === MAX_IDX ? "" : String(STEPS[clamped]));
    },
    [minIdx, onMaxChange]
  );

  const onPointerDown = useCallback(
    (thumb: "min" | "max") => (e: ReactPointerEvent) => {
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragging.current = thumb;
      setActiveDrag(thumb);
    },
    []
  );

  const onPointerMove = useCallback(
    (e: ReactPointerEvent) => {
      if (!dragging.current) return;
      const idx = idxFromPointer(e.clientX);
      if (dragging.current === "min") {
        const clamped = Math.min(idx, maxIdx);
        setMinIdx(clamped);
      } else {
        const clamped = Math.max(idx, minIdx);
        setMaxIdx(clamped);
      }
    },
    [idxFromPointer, maxIdx, minIdx]
  );

  const onPointerUp = useCallback(
    (e: ReactPointerEvent) => {
      if (!dragging.current) return;
      const idx = idxFromPointer(e.clientX);
      if (dragging.current === "min") commitMin(idx);
      else commitMax(idx);
      dragging.current = null;
      setActiveDrag(null);
    },
    [idxFromPointer, commitMin, commitMax]
  );

  /* --- tap on track ------------------------------------------------- */
  const onTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (dragging.current) return;
      const idx = idxFromPointer(e.clientX);
      const distMin = Math.abs(idx - minIdx);
      const distMax = Math.abs(idx - maxIdx);
      if (distMin <= distMax) commitMin(idx);
      else commitMax(idx);
    },
    [idxFromPointer, minIdx, maxIdx, commitMin, commitMax]
  );

  /* --- manual input handlers ---------------------------------------- */
  const applyManualMin = () => {
    const n = Number(rawMin);
    if (!rawMin || isNaN(n)) {
      onMinChange("");
      return;
    }
    onMinChange(String(n));
  };
  const applyManualMax = () => {
    const n = Number(rawMax);
    if (!rawMax || isNaN(n)) {
      onMaxChange("");
      return;
    }
    onMaxChange(String(n));
  };

  /* ------------------------------------------------------------------ */
  /*  Render                                                            */
  /* ------------------------------------------------------------------ */

  const leftPct = pctOf(minIdx);
  const rightPct = pctOf(maxIdx);

  return (
    <div className="col-span-2 lg:min-w-[240px] lg:max-w-[280px]">
      <div className="mb-1 flex items-center justify-between">
        <label className="block text-xs font-medium text-muted-foreground">
          Price Range
        </label>
        <button
          type="button"
          onClick={() => setShowInputs(!showInputs)}
          className="text-[10px] font-medium text-gold hover:text-gold-light"
        >
          {showInputs ? "Use slider" : "Enter exact"}
        </button>
      </div>

      {showInputs ? (
        /* ---- Manual input fallback ---- */
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Min"
            value={rawMin}
            onChange={(e) => setRawMin(e.target.value.replace(/[^0-9]/g, ""))}
            onBlur={applyManualMin}
            onKeyDown={(e) => e.key === "Enter" && applyManualMin()}
            className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold sm:py-2"
          />
          <input
            type="text"
            inputMode="numeric"
            placeholder="Max"
            value={rawMax}
            onChange={(e) => setRawMax(e.target.value.replace(/[^0-9]/g, ""))}
            onBlur={applyManualMax}
            onKeyDown={(e) => e.key === "Enter" && applyManualMax()}
            className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold sm:py-2"
          />
        </div>
      ) : (
        /* ---- Dual-handle slider ---- */
        <div className="px-1 pt-1 pb-2">
          {/* Price labels */}
          <div className="mb-2 flex items-center justify-between text-xs font-medium text-foreground">
            <span>{minIdx === MIN_IDX ? "No Min" : formatPrice(STEPS[minIdx])}</span>
            <span className="text-muted-foreground">-</span>
            <span>{maxIdx === MAX_IDX ? "No Max" : formatPrice(STEPS[maxIdx])}</span>
          </div>

          {/* Track + thumbs */}
          <div
            ref={trackRef}
            className="relative h-6 cursor-pointer select-none touch-none"
            onClick={onTrackClick}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            {/* Background track */}
            <div className="absolute top-1/2 left-0 h-1.5 w-full -translate-y-1/2 rounded-full bg-border" />

            {/* AI-3869: Active track with gradient fill */}
            <div
              className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-gold/80 via-gold to-gold-light"
              style={{
                left: `${leftPct}%`,
                width: `${rightPct - leftPct}%`,
              }}
            />

            {/* Min thumb */}
            <div
              role="slider"
              aria-label="Minimum price"
              aria-valuemin={0}
              aria-valuemax={10000000}
              aria-valuenow={minIdx === MIN_IDX ? 0 : STEPS[minIdx]}
              aria-valuetext={minIdx === MIN_IDX ? "No minimum" : formatPrice(STEPS[minIdx])}
              tabIndex={0}
              className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${leftPct}%` }}
              onPointerDown={onPointerDown("min")}
            >
              {/* AI-3869: Tooltip on drag */}
              {activeDrag === "min" && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-near-black px-2 py-0.5 text-[10px] font-semibold text-gold shadow-lg">
                  {minIdx === MIN_IDX ? "No Min" : formatPrice(STEPS[minIdx])}
                </div>
              )}
              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gold bg-white shadow-md transition-transform hover:scale-110 active:scale-95">
                <div className="h-1.5 w-1.5 rounded-full bg-gold" />
              </div>
            </div>

            {/* Max thumb */}
            <div
              role="slider"
              aria-label="Maximum price"
              aria-valuemin={0}
              aria-valuemax={10000000}
              aria-valuenow={maxIdx === MAX_IDX ? 10000000 : STEPS[maxIdx]}
              aria-valuetext={maxIdx === MAX_IDX ? "No maximum" : formatPrice(STEPS[maxIdx])}
              tabIndex={0}
              className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${rightPct}%` }}
              onPointerDown={onPointerDown("max")}
            >
              {/* AI-3869: Tooltip on drag */}
              {activeDrag === "max" && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-near-black px-2 py-0.5 text-[10px] font-semibold text-gold shadow-lg">
                  {maxIdx === MAX_IDX ? "No Max" : formatPrice(STEPS[maxIdx])}
                </div>
              )}
              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gold bg-white shadow-md transition-transform hover:scale-110 active:scale-95">
                <div className="h-1.5 w-1.5 rounded-full bg-gold" />
              </div>
            </div>
          </div>

          {/* Tick marks */}
          <div className="mt-0 flex justify-between px-0 text-[9px] text-muted-foreground">
            <span>$0</span>
            <span>$2.5M</span>
            <span>$5M</span>
            <span>$10M</span>
          </div>
        </div>
      )}
    </div>
  );
}
