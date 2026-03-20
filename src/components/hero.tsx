"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home, Key, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import HeroSearchBar from "@/components/HeroSearchBar";

const HERO_IMAGE = "/images/hero/hero-skyline.jpg";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4";

type SearchMode = "buy" | "rent" | "sell";

const searchModes: { key: SearchMode; label: string; icon: React.ElementType }[] = [
  { key: "buy", label: "Buy", icon: Home },
  { key: "rent", label: "Rent", icon: Key },
  { key: "sell", label: "Sell", icon: DollarSign },
];

export default function Hero() {
  const [videoFailed, setVideoFailed] = useState(false);
  const [mode, setMode] = useState<SearchMode>("buy");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Cinematic video background with image fallback (AI-3927: video hero) */}
      {!videoFailed && (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={HERO_IMAGE}
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      )}

      {/* Fallback image -- shown if video fails or while poster loads */}
      <Image
        src={HERO_IMAGE}
        alt="Philadelphia skyline"
        fill
        priority
        sizes="100vw"
        className={`object-cover ${!videoFailed ? "opacity-0" : ""}`}
        aria-hidden={!videoFailed}
      />

      {/* Lighter gradient overlay -- magazine cover feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <p className="mb-4 font-label text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
          Premium Philadelphia Real Estate
        </p>
        <h1 className="font-heading text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Find Your Place
          <br />
          <span className="text-shimmer">in Philadelphia</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:mt-6 sm:text-lg">
          Discover luxury homes and condos across Philadelphia&apos;s most
          coveted neighborhoods with Exit Benchmark Realty&apos;s expert agents.
        </p>

        {/* AI-3865: Tabbed search modes (Buy/Rent/Sell) */}
        <div className="mt-8 flex items-center justify-center">
          <div className="inline-flex rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-md">
            {searchModes.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-5 py-2.5 font-label text-sm font-semibold uppercase tracking-wider transition-all duration-300 sm:px-6",
                  mode === key
                    ? "bg-gold text-near-black shadow-lg shadow-gold/25"
                    : "text-white/70 hover:text-white"
                )}
              >
                <Icon className="size-4" strokeWidth={1.5} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Mode-specific CTAs (AI-3867: secondary Sell Your Home CTA) */}
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          {mode === "buy" && (
            <>
              <Link
                href="/homes-for-sale"
                className="shimmer-gold magnetic-btn inline-flex items-center gap-2 rounded-full border border-gold bg-gold/10 px-8 py-3 font-label text-sm font-semibold uppercase tracking-wider text-gold transition-all duration-300 hover:bg-gold hover:text-near-black"
              >
                Browse Properties
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </Link>
              <Link
                href="/home-value"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 font-label text-sm font-medium uppercase tracking-wider text-white/80 transition-all duration-300 hover:border-gold/50 hover:text-gold"
              >
                Sell Your Home
                <DollarSign className="size-4" strokeWidth={1.5} />
              </Link>
            </>
          )}
          {mode === "rent" && (
            <Link
              href="/properties?type=rent"
              className="shimmer-gold magnetic-btn inline-flex items-center gap-2 rounded-full border border-gold bg-gold/10 px-8 py-3 font-label text-sm font-semibold uppercase tracking-wider text-gold transition-all duration-300 hover:bg-gold hover:text-near-black"
            >
              Browse Rentals
              <ArrowRight className="size-4" strokeWidth={1.5} />
            </Link>
          )}
          {mode === "sell" && (
            <>
              <Link
                href="/home-value"
                className="shimmer-gold magnetic-btn inline-flex items-center gap-2 rounded-full border border-gold bg-gold/10 px-8 py-3 font-label text-sm font-semibold uppercase tracking-wider text-gold transition-all duration-300 hover:bg-gold hover:text-near-black"
              >
                Get Your Home Value
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </Link>
              <Link
                href="/sell"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 font-label text-sm font-medium uppercase tracking-wider text-white/80 transition-all duration-300 hover:border-gold/50 hover:text-gold"
              >
                Seller&apos;s Guide
                <ArrowRight className="size-4" strokeWidth={1.5} />
              </Link>
            </>
          )}
        </div>

        {/* Search overlay */}
        <HeroSearchBar />

        {/* Scroll hint */}
        <div className="mt-16 animate-bounce">
          <div className="mx-auto h-8 w-5 rounded-full border-2 border-white/30">
            <div className="mx-auto mt-1.5 h-2 w-1 rounded-full bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}
