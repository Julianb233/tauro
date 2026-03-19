"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

const AUTO_ADVANCE_MS = 6000;
const TRANSITION_MS = 500;

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  const total = testimonials.length;
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(((index % total) + total) % total);
        setIsTransitioning(false);
      }, TRANSITION_MS / 2);
    },
    [total, isTransitioning],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }
    timerRef.current = setInterval(next, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, next]);

  // Determine visible testimonials: 1 on mobile, 3 on md+
  // We compute a window of 3 starting at `current`
  const visibleIndices = [0, 1, 2].map((offset) => (current + offset) % total);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Cards */}
      <div
        className={`grid gap-4 sm:gap-6 md:grid-cols-3 transition-opacity duration-500 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {visibleIndices.map((idx, pos) => {
          const t = testimonials[idx];
          return (
            <div
              key={`${idx}-${pos}`}
              className={`rounded-xl border border-border/50 bg-white p-5 shadow-sm sm:p-6 ${
                pos === 0 ? "" : "hidden md:block"
              }`}
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground sm:mt-4">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-3 border-t border-border/50 pt-3 sm:mt-4 sm:pt-4">
                <p className="text-sm font-semibold text-foreground">
                  {t.name}
                </p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous testimonial"
        className="absolute -left-3 top-1/2 -translate-y-1/2 rounded-full border border-border/50 bg-white p-2 shadow-md transition-colors hover:bg-muted sm:-left-5"
      >
        <ChevronLeft className="size-5 text-foreground" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next testimonial"
        className="absolute -right-3 top-1/2 -translate-y-1/2 rounded-full border border-border/50 bg-white p-2 shadow-md transition-colors hover:bg-muted sm:-right-5"
      >
        <ChevronRight className="size-5 text-foreground" />
      </button>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => goTo(idx)}
            aria-label={`Go to testimonial ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current
                ? "w-6 bg-gold"
                : "w-2 bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
