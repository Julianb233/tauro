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
    src: "https://images.unsplash.com/photo-1582407947092-45ae4dedf6ff?w=1920&q=80",
    alt: "Philadelphia row homes at golden hour",
  },
];

const INTERVAL = 6000;

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, INTERVAL);
    return () => clearInterval(timer);
  }, [advance]);

  return (
    <>
      {SLIDES.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          aria-hidden={i !== active}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-[1500ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* Ken Burns zoom effect on active slide */}
      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
      `}</style>
    </>
  );
}
