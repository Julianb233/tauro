"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import HeroSearchBar from "@/components/HeroSearchBar";
import HeroVideo from "@/components/HeroVideo";

// Philadelphia skyline — golden hour over Center City
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=1920&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
];

export default function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imgRef.current) return;
      const scrollY = window.scrollY;
      // Move image at 40% the scroll speed for a natural parallax feel
      imgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
<section className="relative flex min-h-screen items-center justify-center overflow-hidden">
{/* Cinematic video background with image fallback */}
      <HeroVideo />
{/* Parallax image container — oversized vertically so parallax shift stays in frame */}
      <div
        ref={imgRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: "-20%", bottom: "-20%" }}
      >
        <Image
          src={HERO_IMAGES[0]}
          alt="Philadelphia skyline at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Gradient overlay — magazine cover feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <p className="mb-4 font-label text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
          Premium Philadelphia Real Estate
        </p>
        <h1 className="font-heading text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Find Your Place
          <br />
          <span className="text-gold">in Philadelphia</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:mt-6 sm:text-lg">
          Discover luxury homes and condos across Philadelphia&apos;s most
          coveted neighborhoods with Tauro&apos;s expert agents.
        </p>

        {/* AI-3866: Explicit primary CTA */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-10 py-4 font-label text-base font-bold uppercase tracking-wider text-near-black shadow-lg shadow-gold/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/40 active:scale-[0.98]"
          >
            Search All Properties
            <ArrowRight className="size-5" strokeWidth={2} />
          </Link>
          <Link
            href="/home-value"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-4 font-label text-sm font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:text-gold"
          >
            Get Your Home Value
          </Link>
        </div>

        {/* Search overlay */}
        <HeroSearchBar />

        {/* Scroll hint */}
        <div className="mt-16 animate-bounce" aria-hidden="true">
          <div className="mx-auto h-8 w-5 rounded-full border-2 border-white/30">
            <div className="mx-auto mt-1.5 h-2 w-1 rounded-full bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
