"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Video, Tag, Lock, Glasses, GitCompareArrows } from "lucide-react";
import { Property, formatPrice, getPropertyTags, formatDaysOnMarket } from "@/data/properties";
import ShareButton from "@/components/ShareButton";
import { useCompare } from "@/hooks/useCompare";
import { siteUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { BLUR_LANDSCAPE } from "@/lib/blur-placeholder";

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-600",
  New: "bg-gold text-near-black",
  "Open House": "bg-blue-600",
  Pending: "bg-orange-500",
  "Coming Soon": "bg-gradient-to-r from-purple-600 to-gold",
};

/* ------------------------------------------------------------------ */
/*  Lightweight image carousel for property cards                      */
/* ------------------------------------------------------------------ */

function ImageCarousel({
  images,
  alt,
  status,
  isComingSoon,
  isExclusive,
  isNewConstruction,
  videoTourUrl,
  virtualTourUrl,
}: {
  images: string[];
  alt: string;
  status: string;
  isComingSoon?: boolean;
  isExclusive?: boolean;
  isNewConstruction?: boolean;
  videoTourUrl?: string | null;
  virtualTourUrl?: string | null;
}) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const isSwiping = useRef(false);

  const go = useCallback(
    (dir: 1 | -1) => {
      setCurrent((prev) => (prev + dir + total) % total);
    },
    [total],
  );

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
      role="region"
      aria-label={`${alt} photo gallery`}
      aria-roledescription="carousel"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onClickCapture={onClickCapture}
    >
      {images.map((src, i) => {
        const isActive = i === current;
        const shouldRender =
          isActive ||
          i === (current - 1 + total) % total ||
          i === (current + 1) % total;

        if (!shouldRender) return null;

        return (
          <Image
            key={src}
            src={src}
            alt={`${alt} — photo ${i + 1}`}
            fill
            className={cn(
              "object-cover transition-all duration-500",
              isActive ? "opacity-100" : "opacity-0",
              "group-hover:scale-105",
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading={i === 0 ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL={BLUR_LANDSCAPE}
            draggable={false}
          />
        );
      })}

      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        <span
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white",
            statusStyles[status] ?? "bg-muted-foreground",
          )}
        >
          {status}
        </span>
        {isComingSoon && status !== "Coming Soon" && (
          <span className="rounded-md bg-gradient-to-r from-purple-600 to-gold px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Coming Soon
          </span>
        )}
        {isExclusive && (
          <span className="rounded-md bg-gradient-to-r from-amber-500 to-yellow-300 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-near-black">
            Exclusive
          </span>
        )}
        {isNewConstruction && (
          <span className="rounded-md bg-emerald-500 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            New Construction
          </span>
        )}
      </div>

      <div className="absolute right-3 bottom-3 z-10 flex items-center gap-1.5">
        {virtualTourUrl && (
          <span className="flex items-center gap-1 rounded-md bg-blue-600/90 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <Glasses className="h-3 w-3" />
            Virtual Tour
          </span>
        )}
        {videoTourUrl && (
          <span className="flex items-center gap-1 rounded-md bg-gold/90 px-2 py-1 text-xs font-semibold text-near-black backdrop-blur-sm">
            <Video className="h-3 w-3" aria-hidden="true" />
            Video Tour
          </span>
        )}
        <span className="rounded-md bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm" aria-label={`${total} photos`}>
          {total} photos
        </span>
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(-1); }}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/60 focus-visible:opacity-100 group-hover/carousel:opacity-100"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(1); }}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 hover:bg-black/60 focus-visible:opacity-100 group-hover/carousel:opacity-100"
          >
            <ChevronRight />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1" role="tablist" aria-label="Image slides">
            {images.map((_, i) => (
              <span
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Photo ${i + 1} of ${total}`}
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

function ChevronLeft() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  PropertyCard                                                       */
/* ------------------------------------------------------------------ */

export default function PropertyCard({ property }: { property: Property }) {
  const { toggle, isComparing, count } = useCompare();
  const comparing = isComparing(property.id);

  if (property.isComingSoon) {
    return (
      <Link
        href={`/properties/${property.slug}`}
        className="group depth-hover block overflow-hidden rounded-xl bg-white shadow-sm border border-border/50 transition-all hover:border-gold/40 hover:shadow-lg"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={property.images[0]}
            alt={property.address}
            fill
            className="object-cover blur-md scale-105 brightness-75"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={BLUR_LANDSCAPE}
          />
          <div className="absolute top-3 left-3 z-10">
            <span className="rounded-md bg-gradient-to-r from-purple-600 to-gold px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Coming Soon
            </span>
          </div>
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <span className="mt-3 rounded-lg bg-gradient-to-r from-purple-600 to-gold px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform group-hover:scale-105">
              Register for Access
            </span>
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <p className="mb-0.5 font-label text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {property.propertyType}
          </p>
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
        </div>
      </Link>
    );
  }

  const shareUrl = `${siteUrl}/properties/${property.slug}`;

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group depth-hover block overflow-hidden rounded-xl bg-white shadow-sm border border-border/50 transition-all hover:border-gold/40 hover:shadow-lg"
    >
      <ImageCarousel
        images={property.images}
        alt={property.address}
        status={property.status}
        isComingSoon={property.isComingSoon}
        isExclusive={property.isExclusive}
        isNewConstruction={property.isNewConstruction}
        videoTourUrl={property.videoTourUrl}
        virtualTourUrl={property.virtualTourUrl}
      />
      <div className="relative">
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            type="button"
            aria-label={comparing ? `Remove ${property.address} from comparison` : `Add ${property.address} to comparison`}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(property.id); }}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-colors",
              comparing
                ? "bg-gold text-near-black shadow-sm"
                : count >= 3
                  ? "cursor-not-allowed bg-black/40 text-white/50"
                  : "bg-black/40 text-white hover:bg-gold hover:text-near-black"
            )}
            disabled={!comparing && count >= 3}
          >
            <GitCompareArrows className="h-3.5 w-3.5" />
          </button>
          <ShareButton
            url={shareUrl}
            title={`${property.address} — ${formatPrice(property.price)}`}
            image={property.images[0]}
            compact
          />
        </div>
        <div className="p-3 sm:p-4">
          <p className="mb-0.5 font-label text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {property.propertyType}
          </p>
          <p className="font-heading text-lg font-bold text-foreground sm:text-xl">{formatPrice(property.price)}</p>
          <div className="mt-1 flex flex-wrap items-center gap-1.5 font-label text-xs tracking-wider text-muted-foreground sm:gap-2">
            <span><span className="sr-only">Bedrooms: </span>{property.beds} BD</span>
            <span className="text-gold/30" aria-hidden="true">|</span>
            <span><span className="sr-only">Bathrooms: </span>{property.baths} BA</span>
            <span className="text-gold/30" aria-hidden="true">|</span>
            <span><span className="sr-only">Square feet: </span>{property.sqft.toLocaleString()} SF</span>
          </div>
          <p className="mt-2 truncate font-medium text-foreground">
            {property.address}
          </p>
          <p className="truncate text-sm text-muted-foreground">
            {property.city}, {property.state} {property.zip}
          </p>
          {formatDaysOnMarket(property.listingDate) && (
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {formatDaysOnMarket(property.listingDate)}
            </p>
          )}
          {getPropertyTags(property).length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {getPropertyTags(property).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-0.5 rounded-full border border-gold/20 bg-gold/5 px-2 py-0.5 text-[10px] font-medium text-gold-dark"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
            </div>
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
      </div>
    </Link>
  );
}
