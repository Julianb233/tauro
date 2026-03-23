"use client";

import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { Play, X, Video } from "lucide-react";
import { cn } from "@/lib/utils";

type VideoProvider = "youtube" | "vimeo";

interface PropertyVideoTourProps {
  videoUrl: string;
  address: string;
  thumbnailUrl?: string;
  agent?: {
    name: string;
    photo: string;
  };
}

/** Parse a video URL or ID and return provider + embed URL + thumbnail */
function parseVideo(input: string): {
  provider: VideoProvider;
  embedUrl: string;
  thumbnail: string;
} {
  // Vimeo URLs: vimeo.com/123456789 or player.vimeo.com/video/123456789
  const vimeoMatch = input.match(
    /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/
  );
  if (vimeoMatch) {
    const id = vimeoMatch[1];
    return {
      provider: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`,
      thumbnail: `https://vumbnail.com/${id}.jpg`,
    };
  }

  // YouTube URLs: various formats
  const ytMatch = input.match(
    /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (ytMatch) {
    const id = ytMatch[1];
    return {
      provider: "youtube",
      embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
      thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    };
  }

  // Bare YouTube ID (11 chars, alphanumeric + _ -)
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
    return {
      provider: "youtube",
      embedUrl: `https://www.youtube.com/embed/${input}?autoplay=1&rel=0`,
      thumbnail: `https://img.youtube.com/vi/${input}/maxresdefault.jpg`,
    };
  }

  // Bare Vimeo ID (all digits)
  if (/^\d+$/.test(input)) {
    return {
      provider: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${input}?autoplay=1&title=0&byline=0&portrait=0`,
      thumbnail: `https://vumbnail.com/${input}.jpg`,
    };
  }

  // Fallback: treat as YouTube ID
  return {
    provider: "youtube",
    embedUrl: `https://www.youtube.com/embed/${input}?autoplay=1&rel=0`,
    thumbnail: `https://img.youtube.com/vi/${input}/maxresdefault.jpg`,
  };
}

export default function PropertyVideoTour({
  videoUrl,
  address,
  thumbnailUrl,
  agent,
}: PropertyVideoTourProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const video = useMemo(() => parseVideo(videoUrl), [videoUrl]);
  const thumbnail = thumbnailUrl ?? video.thumbnail;

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return (
    <section aria-label="Video tour">
      {/* Section header — Sotheby's style */}
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold">
          <Video className="mr-2 inline-block h-5 w-5 text-gold" />
          Video Tour
        </h2>
        {agent && (
          <div className="flex items-center gap-2">
            <Image
              src={agent.photo}
              alt={agent.name}
              width={28}
              height={28}
              className="rounded-full border border-gold/50 object-cover"
              sizes="28px"
            />
            <span className="text-xs text-muted-foreground">
              Narrated by <span className="font-semibold text-foreground">{agent.name}</span>
            </span>
          </div>
        )}
      </div>

      {/* Video container */}
      <div className="relative mt-4 overflow-hidden rounded-xl border border-border shadow-sm">
        {/* Thumbnail / play state */}
        <div
          className={cn(
            "relative aspect-video cursor-pointer overflow-hidden bg-near-black transition-all duration-500 ease-in-out",
            isPlaying && "pointer-events-none h-0 opacity-0"
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
            className="object-cover opacity-80 transition-all duration-500 hover:scale-105 hover:opacity-60"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Play button — centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="flex h-18 w-18 items-center justify-center rounded-full border-2 border-white/80 bg-gold/90 shadow-xl transition-transform duration-300 hover:scale-110 sm:h-20 sm:w-20">
              <Play className="h-8 w-8 fill-near-black text-near-black sm:h-9 sm:w-9" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-white drop-shadow-md sm:text-base">
              Watch Agent Tour
            </span>
          </div>

          {/* Bottom bar — agent narration badge */}
          {agent && (
            <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-gradient-to-t from-black/90 to-transparent px-4 pb-4 pt-10">
              <Image
                src={agent.photo}
                alt={agent.name}
                width={36}
                height={36}
                className="rounded-full border-2 border-gold object-cover shadow-lg"
                sizes="36px"
              />
              <div>
                <p className="text-xs font-semibold text-white">{agent.name}</p>
                <p className="text-[11px] text-gold/90">Agent-Narrated Tour</p>
              </div>
            </div>
          )}
        </div>

        {/* Expanded iframe state */}
        <div
          className={cn(
            "relative transition-all duration-500 ease-in-out",
            isPlaying
              ? "aspect-video opacity-100"
              : "h-0 overflow-hidden opacity-0"
          )}
        >
          {isPlaying && (
            <>
              <iframe
                src={video.embedUrl}
                title={`Video tour of ${address}`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
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
    </section>
  );
}
