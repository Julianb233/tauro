"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Video, Heart } from "lucide-react";
import { Property, formatPrice } from "@/data/properties";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-600",
  New: "bg-gold text-near-black",
  "Open House": "bg-blue-600",
  Pending: "bg-orange-500",
};

/* ------------------------------------------------------------------ */
/*  Lightweight image carousel for property cards                      */
/* ------------------------------------------------------------------ */

function ImageCarousel({
  images,
  alt,
  status,
  isComingSoon,
  videoTourUrl,
}: {
  images: string[];
  alt: string;
  status: string;
  isComingSoon?: boolean;
  videoTourUrl?: string | null;
}) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  /* --- touch / swipe state --- */
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isSwiping = useRef(false);

  const go = useCallback(
    (dir: 1 | -1) => {
      setCurrent((prev) => (prev + dir + total) % total);
    },
    [total],
  );

  /* ---------- touch handlers ---------- */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    isSwiping.current = false;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(touchDeltaX.current) > 10) {
      isSwiping.current = true;
    }
  };

  const onTouchEnd = () => {
    if (Math.abs(touchDeltaX.current) > 40) {
      go(touchDeltaX.current < 0 ? 1 : -1);
    }
  };

  /* Prevent Link navigation when the user was swiping */
  const onClickCapture = (e: React.MouseEvent) => {
    if (isSwiping.current) {
      e.preventDefault();
      e.stopPropagation();
      isSwiping.current = false;
    }
  };

  return (
    <div
      className="group/carousel relative aspect-[4/3] overflow-hidden bg-muted"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClickCapture={onClickCapture}
    >
      {/* ---- images (cross-fade) ---- */}
      {images.map((src, i) => {
        const isActive = i === current;
        /* Lazy-load: only render current, prev, and next images */
        const shouldRender =
          isActive ||
          i === (current - 1 + total) % total ||
          i === (current + 1) % total;

        if (!shouldRender) return null;

        return (
          <Image
            key={src}
            src={src}
            alt={`${alt} -- photo ${i + 1}`}
            fill
            className={cn(
              "object-cover transition-opacity duration-300",
              isActive ? "opacity-100" : "opacity-0",
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading={i === 0 ? "eager" : "lazy"}
            draggable={false}
          />
        );
      })}

      {/* ---- status & coming soon badges ---- */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        <span
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white",
            statusStyles[status] ?? "bg-muted-foreground",
          )}
        >
          {status}
        </span>
        {isComingSoon && (
          <span className="rounded-md bg-gradient-to-r from-purple-600 to-gold px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Coming Soon
          </span>
        )}
      </div>

      {/* ---- video tour & photo count ---- */}
      <div className="absolute right-3 bottom-3 z-10 flex items-center gap-1.5">
        {videoTourUrl && (
          <span className="flex items-center gap-1 rounded-md bg-gold/90 px-2 py-1 text-xs font-semibold text-near-black backdrop-blur-sm">
            <Video className="h-3 w-3" />
            Video Tour
          </span>
        )}
        <span className="rounded-md bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
          {total} photos
        </span>
      </div>

      {/* ---- navigation arrows (visible on hover / focus, hidden if single image) ---- */}
      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/60 focus-visible:opacity-100 group-hover/carousel:opacity-100"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/60 focus-visible:opacity-100 group-hover/carousel:opacity-100"
          >
            <ChevronRight />
          </button>

          {/* ---- dot indicators ---- */}
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "block h-1.5 w-1.5 rounded-full transition-colors duration-200",
                  i === current ? "bg-white" : "bg-white/50",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ---- tiny inline SVG icons (no external deps) ---- */

function ChevronLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Save / Heart Button (AI-3900)                                      */
/* ------------------------------------------------------------------ */

function SaveButton({ propertyId }: { propertyId: string }) {
  const [saved, setSaved] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const favs = JSON.parse(localStorage.getItem("tauro-favorites") || "[]");
      return favs.includes(propertyId);
    } catch {
      return false;
    }
  });

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved((prev: boolean) => {
      const next = !prev;
      try {
        const favs = JSON.parse(localStorage.getItem("tauro-favorites") || "[]") as string[];
        if (next) {
          favs.push(propertyId);
        } else {
          const idx = favs.indexOf(propertyId);
          if (idx > -1) favs.splice(idx, 1);
        }
        localStorage.setItem("tauro-favorites", JSON.stringify(favs));
      } catch { /* localStorage might be unavailable */ }
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={toggleSave}
      aria-label={saved ? "Remove from saved" : "Save property"}
      className="absolute right-3 top-3 z-20 flex size-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60"
    >
      <Heart
        className={cn("size-4 transition-all", saved ? "fill-red-500 text-red-500" : "")}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  PropertyCard                                                       */
/* ------------------------------------------------------------------ */

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="group relative">
      {/* AI-3900: Save/heart button overlay */}
      <SaveButton propertyId={property.id} />
      <Link
        href={`/properties/${property.slug}`}
        className="group depth-hover block overflow-hidden rounded-xl bg-white shadow-sm border border-border/50 transition-all hover:border-gold/40 hover:shadow-lg"
      >
        <ImageCarousel
          images={property.images}
          alt={property.address}
          status={property.status}
          isComingSoon={property.isComingSoon}
          videoTourUrl={property.videoTourUrl}
        />
        <div className="p-3 sm:p-4">
          <p className="font-heading text-lg font-bold text-foreground sm:text-xl">{formatPrice(property.price)}</p>
          <div className="mt-1 flex flex-wrap items-center gap-1.5 font-label text-xs tracking-wider text-muted-foreground sm:gap-2">
            <span>{property.beds} BD</span>
            <span className="text-gold/30">|</span>
            <span>{property.baths} BA</span>
            <span className="text-gold/30">|</span>
            <span>{property.sqft.toLocaleString()} SF</span>
          </div>
          <p className="mt-2 truncate font-medium text-foreground">
            {property.address}
          </p>
          <p className="truncate text-sm text-muted-foreground">
            {property.city}, {property.state} {property.zip}
          </p>
          {/* AI-3894: MLS number and data source attribution */}
          {property.mlsNumber && (
            <p className="mt-1.5 text-[10px] text-muted-foreground/60">
              MLS# {property.mlsNumber} &middot; Data courtesy of BRIGHT MLS
            </p>
          )}
          {property.openHouseEvent && (
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-gold/30 bg-gold/10 px-2 py-1">
              <Calendar className="h-3 w-3 text-gold" />
              <span className="text-xs font-semibold text-gold-dark">
                Open House: {property.openHouse}
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
