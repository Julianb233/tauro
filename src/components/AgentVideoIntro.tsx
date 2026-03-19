"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

interface AgentVideoIntroProps {
  videoId: string;
  agentName: string;
  agentPhoto: string;
}

export default function AgentVideoIntro({
  videoId,
  agentName,
  agentPhoto,
}: AgentVideoIntroProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsPlaying(false);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!isPlaying) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsPlaying(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPlaying]);

  return (
    <section className="bg-foreground py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <Play className="size-5 text-gold" />
          <h2 className="font-heading text-2xl font-bold text-white">
            Video Introduction
          </h2>
        </div>

        {/* Thumbnail / Player container */}
        <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-black/40 backdrop-blur-md">
          {!isPlaying ? (
            /* Thumbnail state */
            <button
              type="button"
              onClick={handlePlay}
              className="group relative block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
              aria-label={`Play video introduction for ${agentName}`}
            >
              <div className="relative aspect-video overflow-hidden">
                {/* Agent photo as background */}
                <Image
                  src={agentPhoto}
                  alt=""
                  fill
                  className="object-cover brightness-[0.45] transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
                />

                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

                {/* Play button - gold circle with white triangle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex size-20 items-center justify-center rounded-full border-2 border-gold/80 bg-gold/90 shadow-lg shadow-gold/25 transition-all duration-300 group-hover:scale-110 group-hover:bg-gold group-hover:shadow-gold/40 sm:size-24">
                    <svg
                      viewBox="0 0 24 24"
                      fill="white"
                      className="ml-1 size-8 sm:size-10"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* "Meet [Agent Name]" text overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="font-label text-xs uppercase tracking-[0.25em] text-gold/80">
                    Watch Video
                  </p>
                  <p className="mt-1 font-heading text-2xl font-bold text-white sm:text-3xl">
                    Meet {agentName}
                  </p>
                </div>
              </div>
            </button>
          ) : (
            /* Expanded player state */
            <div className="relative animate-in fade-in zoom-in-95 duration-300">
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                  title={`${agentName} video introduction`}
                />
              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 backdrop-blur-sm transition-all hover:border-gold/40 hover:bg-black/80 hover:text-gold"
                aria-label="Close video"
              >
                <X className="size-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
