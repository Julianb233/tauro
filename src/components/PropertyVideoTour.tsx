"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyVideoTourProps {
  videoId: string;
  address: string;
  thumbnailUrl?: string;
}

export default function PropertyVideoTour({
  videoId,
  address,
  thumbnailUrl,
}: PropertyVideoTourProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const thumbnail =
    thumbnailUrl ?? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handlePlay = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsExpanded(false);
  }, []);

  return (
    <div>
      <h2 className="font-heading text-xl font-bold">
        <Play className="mr-2 inline-block h-5 w-5 text-gold" />
        Video Tour
      </h2>

      <div className="relative mt-4 overflow-hidden rounded-xl border border-border">
        {/* Thumbnail state */}
        <div
          className={cn(
            "relative aspect-video cursor-pointer overflow-hidden bg-near-black transition-all duration-500 ease-in-out",
            isExpanded && "pointer-events-none h-0 opacity-0"
          )}
          onClick={handlePlay}
          role="button"
          tabIndex={0}
          aria-label={`Play video tour of ${address}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handlePlay();
            }
          }}
        >
          <Image
            src={thumbnail}
            alt={`Video tour thumbnail for ${address}`}
            fill
            className="object-cover opacity-70 transition-opacity duration-300 hover:opacity-50"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

          {/* Play button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80 bg-gold/90 shadow-lg transition-transform duration-300 hover:scale-110 sm:h-20 sm:w-20">
              <Play className="h-7 w-7 fill-near-black text-near-black sm:h-8 sm:w-8" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-white sm:text-base">
              Watch Video Tour
            </span>
          </div>
        </div>

        {/* Expanded iframe state */}
        <div
          className={cn(
            "relative transition-all duration-500 ease-in-out",
            isExpanded
              ? "aspect-video opacity-100"
              : "h-0 overflow-hidden opacity-0"
          )}
        >
          {isExpanded && (
            <>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title={`Video tour of ${address}`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                aria-label="Close video tour"
              >
                <X className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
