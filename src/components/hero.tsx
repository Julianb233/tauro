"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import HeroSearchBar from "@/components/HeroSearchBar";

const PHRASES = [
  "Find Your Place",
  "Discover Luxury",
  "Live Extraordinary",
  "Invest Wisely",
];

const TYPE_SPEED = 80; // ms per character typing
const DELETE_SPEED = 50; // ms per character deleting
const PAUSE_AFTER_TYPE = 2000; // 2s pause after full phrase
const PAUSE_AFTER_DELETE = 400; // brief pause before next phrase

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentPhrase = PHRASES[phraseIndex];

  const tick = useCallback(() => {
    if (!isDeleting) {
      // Typing forward
      if (displayText.length < currentPhrase.length) {
        return {
          next: currentPhrase.slice(0, displayText.length + 1),
          delay: TYPE_SPEED,
          deleting: false,
          phrase: phraseIndex,
        };
      }
      // Finished typing — pause then start deleting
      return {
        next: displayText,
        delay: PAUSE_AFTER_TYPE,
        deleting: true,
        phrase: phraseIndex,
      };
    }
    // Deleting
    if (displayText.length > 0) {
      return {
        next: displayText.slice(0, -1),
        delay: DELETE_SPEED,
        deleting: true,
        phrase: phraseIndex,
      };
    }
    // Finished deleting — move to next phrase
    return {
      next: "",
      delay: PAUSE_AFTER_DELETE,
      deleting: false,
      phrase: (phraseIndex + 1) % PHRASES.length,
    };
  }, [displayText, isDeleting, phraseIndex, currentPhrase]);

  useEffect(() => {
    const { next, delay, deleting, phrase } = tick();
    const timer = setTimeout(() => {
      setDisplayText(next);
      setIsDeleting(deleting);
      setPhraseIndex(phrase);
    }, delay);
    return () => clearTimeout(timer);
  }, [tick]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Swap to <video> for cinematic reel later */}
      <Image
        src="https://images.unsplash.com/photo-1506636489208-f1d6c865744e?w=1920&q=80"
        alt="Philadelphia skyline"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Lighter gradient overlay — magazine cover feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <p className="mb-4 font-label text-xs font-semibold uppercase tracking-[0.25em] text-gold sm:text-sm">
          Premium Philadelphia Real Estate
        </p>
        <h1 className="font-heading text-3xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="inline-block min-h-[1.2em]">
            {displayText}
            <span
              className="typewriter-cursor ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.1em] bg-gold align-middle"
              aria-hidden="true"
            />
          </span>
          <br />
          <span className="text-gold">in Philadelphia</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/80 sm:mt-6 sm:text-lg">
          Discover luxury homes and condos across Philadelphia&apos;s most
          coveted neighborhoods with Tauro&apos;s expert agents.
        </p>

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
