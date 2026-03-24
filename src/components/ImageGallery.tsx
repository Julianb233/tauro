"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, GalleryHorizontalEnd, LayoutGrid } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { BLUR_LANDSCAPE } from "@/lib/blur-placeholder";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { cn } from "@/lib/utils";
import { useSwipe } from "@/hooks/useSwipe";

interface ImageGalleryProps {
  images: string[];
  address: string;
}

export default function ImageGallery({ images, address }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isFirstRender = useRef(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 0);
    setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  // Scroll active thumbnail into view when activeIndex changes (skip on initial mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const thumb = thumbRefs.current[activeIndex];
    if (thumb) {
      thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [activeIndex]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[16/9] w-full items-center justify-center rounded-xl bg-white/20">
        <p className="text-sm text-gray-400">No images available</p>
      </div>
    );
  }

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const swipeHandlers = useSwipe(goNext, goPrev);

  const openLightbox = (i: number) => {
    setActiveIndex(i);
    setOpen(true);
  };

  return (
    <div>
      {/* View mode toggle */}
      {images.length > 1 && (
        <div className="mb-2 flex items-center justify-end gap-1">
          <button
            onClick={() => setViewMode("carousel")}
            className={cn(
              "rounded-lg p-2 transition-colors",
              viewMode === "carousel"
                ? "bg-gold/20 text-gold"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-label="Carousel view"
          >
            <GalleryHorizontalEnd className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "rounded-lg p-2 transition-colors",
              viewMode === "grid"
                ? "bg-gold/20 text-gold"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      )}

      {viewMode === "grid" ? (
        /* Grid view — all photos in a responsive grid */
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveIndex(i);
                setOpen(true);
              }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg"
              aria-label={`View photo ${i + 1} of ${images.length}`}
            >
              <Image
                src={src}
                alt={`${address} - Photo ${i + 1}`}
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                placeholder="blur"
                blurDataURL={BLUR_LANDSCAPE}
              />
            </button>
          ))}
        </div>
      ) : (
      <>
      {/* Hero image — shows images[activeIndex] */}
      <div
        className="relative aspect-[16/9] max-h-[600px] w-full cursor-pointer overflow-hidden touch-pan-y lg:aspect-[21/9]"
        {...swipeHandlers}
        onClick={() => openLightbox(activeIndex)}
        role="button"
        tabIndex={0}
        aria-label={`View gallery for ${address} — swipe to browse`}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
          else if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
          else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(activeIndex); }
        }}
      >
        <Image
          src={images[activeIndex]}
          alt={`${address} - Photo ${activeIndex + 1}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 66vw"
          placeholder="blur"
          blurDataURL={BLUR_LANDSCAPE}
        />
      </div>

      {/* Thumbnail strip — scrollable, all images */}
      {images.length > 1 && (
        <div className="relative mt-2 px-4 sm:px-6 lg:px-8">
          {/* Left scroll arrow */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-opacity hover:bg-black/80"
              aria-label="Scroll thumbnails left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Scrollable thumbnail container */}
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide"
          >
            {images.map((src, i) => (
              <button
                key={i}
                ref={(el) => { thumbRefs.current[i] = el; }}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                  i === activeIndex
                    ? "border-gold opacity-100"
                    : "border-transparent opacity-60 hover:border-gold/50 hover:opacity-80"
                )}
                aria-label={`View photo ${i + 1}`}
                aria-current={i === activeIndex ? "true" : undefined}
              >
                <Image
                  src={src}
                  alt={`${address} - Photo ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {/* Right scroll arrow */}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white transition-opacity hover:bg-black/80"
              aria-label="Scroll thumbnails right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
      </>
      )}
      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={activeIndex}
        slides={images.map((src) => ({ src }))}
        plugins={[Counter, Fullscreen, Thumbnails, Zoom]}
        carousel={{ finite: true }}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
        on={{ view: ({ index }) => setActiveIndex(index) }}
      />
    </div>
  );
}
