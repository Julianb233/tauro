"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Neighborhood } from "@/data/neighborhoods";

gsap.registerPlugin(ScrollTrigger);

export function AreaHero({ neighborhood }: { neighborhood: Neighborhood }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      // Parallax on background image
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade in content
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.2, ease: "power3.out" }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative min-h-[50vh] overflow-hidden pt-16">
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <Image
          src={neighborhood.image}
          alt={neighborhood.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-[50vh] max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8"
        style={{ opacity: 0 }}
      >
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link
            href="/neighborhoods"
            className="transition-colors hover:text-gold"
          >
            Neighborhoods
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-gold">{neighborhood.name}</span>
        </nav>

        <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          {neighborhood.name}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-white/70">
          {neighborhood.tagline}
        </p>
      </div>
    </section>
  );
}
