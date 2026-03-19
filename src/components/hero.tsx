"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import HeroSearchBar from "@/components/HeroSearchBar";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80",
    alt: "Luxury Philadelphia townhome with classic architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    alt: "Modern luxury home with expansive windows at dusk",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    alt: "Elegant estate with manicured landscaping",
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80",
    alt: "Contemporary luxury residence with pool at sunset",
  },
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
    alt: "Premium modern villa with dramatic evening lighting",
  },
];

const INTERVAL_MS = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(advance, INTERVAL_MS);
    return () => clearInterval(id);
  }, [advance, isPaused]);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Hero slideshow of luxury Philadelphia properties"
    >
      {/* ── Slide images with crossfade + ken-burns ── */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${
              i === current ? "animate-ken-burns" : ""
            }`}
          />
        </div>
      ))}

      {/* ── Gradient overlay for text readability ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-black/50 to-midnight/80" />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 text-center sm:px-6 lg:px-8">
        <p className="mb-4 font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">
          Premium Philadelphia Real Estate
        </p>
        <h1 className="font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Find Your Place
          <br />
          <span className="text-gold">in Philadelphia</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
          Discover luxury homes and condos across Philadelphia&apos;s most
          coveted neighborhoods with Tauro&apos;s expert agents.
        </p>

        {/* Search overlay */}
        <HeroSearchBar />

        {/* ── Slide indicators ── */}
        <div
          className="mt-12 flex items-center justify-center gap-2.5"
          role="tablist"
          aria-label="Slide controls"
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`group relative h-2 rounded-full transition-all duration-500 ${
                i === current
                  ? "w-8 bg-gold"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            >
              {/* Progress bar inside active dot */}
              {i === current && !isPaused && (
                <span className="absolute inset-0 origin-left animate-slide-progress rounded-full bg-white/40" />
              )}
            </button>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="mt-10 animate-bounce">
          <div className="mx-auto h-8 w-5 rounded-full border-2 border-white/30">
            <div className="mx-auto mt-1.5 h-2 w-1 rounded-full bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
