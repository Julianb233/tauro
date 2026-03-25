"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import FadeInView from "@/components/animations/FadeInView";
import StaggerReveal from "@/components/animations/StaggerReveal";

const INSTAGRAM_URL = "https://instagram.com/taurorealty";

// Curated property & lifestyle images representing Tauro's feed aesthetic
const feedItems = [
  {
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    alt: "Luxury Philadelphia brownstone with classic architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    alt: "Modern Philadelphia home interior with open floor plan",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    alt: "Premium kitchen in Philadelphia luxury property",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    alt: "Philadelphia cityscape and skyline at golden hour",
  },
  {
    src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80",
    alt: "Rittenhouse Square neighborhood lifestyle",
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    alt: "Tauro luxury property exterior at dusk",
  },
];

function FeedTile({ src, alt }: { src: string; alt: string }) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square overflow-hidden rounded-lg bg-gray-100"
      aria-label={`View on Instagram — ${alt}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Gold hover overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#C9A96E]/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Instagram className="size-8 text-white drop-shadow-lg" strokeWidth={1.5} />
        <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-white">
          View Post
        </span>
      </div>
    </a>
  );
}

export default function InstagramFeed() {
  return (
    <section className="bg-midnight py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeInView>
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div>
              <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">
                Follow Along
              </p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                @taurorealty
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/60 sm:mx-0 sm:mt-2 sm:text-base">
                Luxury listings, neighborhood gems, and behind-the-scenes moments — live on Instagram.
              </p>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/10 sm:mt-0"
            >
              <Instagram className="size-4" strokeWidth={1.5} />
              Follow Us
            </a>
          </div>
        </FadeInView>

        {/* Grid */}
        <StaggerReveal className="mt-8 grid grid-cols-2 gap-2 sm:mt-12 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6 lg:gap-3">
          {feedItems.map((item, i) => (
            <FeedTile key={i} src={item.src} alt={item.alt} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
