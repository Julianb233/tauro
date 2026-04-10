"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=1920&q=80",
    alt: "Philadelphia skyline at sunset",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    alt: "Luxury home exterior with pool",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    alt: "Modern luxury living room interior",
  },
  {
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80",
    alt: "Contemporary home with manicured lawn",
  },
  {
    src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80",
    alt: "Philadelphia row homes at golden hour",
  },
];

const INTERVAL = 6000;

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, INTERVAL);
    return () => clearInterval(timer);
  }, [advance]);

  // After first paint, allow all slides to render for smooth transitions
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {SLIDES.map((slide, i) => {
        // Only render the first image on initial load, defer the rest
        if (!loaded && i > 0) return null;

        return (
          <Image
            key={slide.src}
            src={slide.src}
            alt={i === active ? slide.alt : ""}
            aria-hidden={i !== active}
            fill
            priority={i === 0}
            fetchPriority={i === 0 ? "high" : undefined}
            loading={i === 0 ? "eager" : "lazy"}
            sizes="100vw"
            quality={i === 0 ? 85 : 75}
            className={`object-cover transition-opacity duration-[1500ms] ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        );
      })}
    </>
  );
}
