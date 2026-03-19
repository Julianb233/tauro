"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import HeroSearchBar from "@/components/HeroSearchBar";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) {
        gsap.set("[data-hero-anim]", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        "[data-hero-anim]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.18,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <Image
        src="https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=1920&q=80"
        alt="Philadelphia skyline"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <p
          data-hero-anim
          className="mb-4 font-label text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm"
          style={{ opacity: 0 }}
        >
          Premium Philadelphia Real Estate
        </p>
        <h1
          data-hero-anim
          className="font-heading text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ opacity: 0 }}
        >
          Find Your Place
          <br />
          <span className="text-gold">in Philadelphia</span>
        </h1>
        <p
          data-hero-anim
          className="mx-auto mt-4 max-w-2xl text-base text-white/70 sm:mt-6 sm:text-lg"
          style={{ opacity: 0 }}
        >
          Discover luxury homes and condos across Philadelphia&apos;s most
          coveted neighborhoods with Tauro&apos;s expert agents.
        </p>

        <div data-hero-anim style={{ opacity: 0 }}>
          <HeroSearchBar />
        </div>

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
