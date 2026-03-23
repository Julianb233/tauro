"use client";

import { Play } from "lucide-react";
import { useState } from "react";

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export function VideoTour({
  videoUrl,
  neighborhoodName,
}: {
  videoUrl: string;
  neighborhoodName: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoId = extractYouTubeId(videoUrl);

  if (!videoId) return null;

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className="border-t border-border/40 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Video Tour
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
          Explore {neighborhoodName}
        </h2>

        <div className="mt-8 overflow-hidden rounded-xl shadow-lg">
          {playing ? (
            <div className="relative aspect-video w-full">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                title={`${neighborhoodName} neighborhood video tour`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="group relative aspect-video w-full"
              aria-label={`Play ${neighborhoodName} video tour`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailUrl}
                alt={`${neighborhoodName} video tour thumbnail`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex size-20 items-center justify-center rounded-full bg-gold shadow-xl transition-transform group-hover:scale-110">
                  <Play className="ml-1 size-8 text-near-black" fill="currentColor" />
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
