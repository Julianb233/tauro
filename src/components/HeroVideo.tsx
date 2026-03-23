"use client";

import { useRef, useEffect, useState } from "react";

const VIDEO_SRC = "/hero-philly.mp4";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=1920&q=80";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setCanPlay(true);
    video.addEventListener("canplay", onCanPlay);

    // Attempt to play — browsers may block without user gesture
    video.play().catch(() => {
      // Autoplay blocked — keep showing fallback image
    });

    return () => video.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <>
      {/* Fallback image — shown until video loads (or forever on mobile/slow connections) */}
      <img
        src={FALLBACK_IMAGE}
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          canPlay ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Cinematic video background */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          canPlay ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={FALLBACK_IMAGE}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
    </>
  );
}
