"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

interface ImageGalleryProps {
  images: string[];
  address: string;
}

export default function ImageGallery({ images, address }: ImageGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-[16/9] w-full items-center justify-center rounded-xl bg-white/20">
        <p className="text-sm text-gray-400">No images available</p>
      </div>
    );
  }

  const openLightbox = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const maxThumbnails = 4;
  const thumbnails = images.slice(1, maxThumbnails + 1);
  const extraCount = images.length - (maxThumbnails + 1);

  return (
    <div>
      {/* Hero image */}
      <button
        onClick={() => openLightbox(0)}
        className="relative aspect-[16/9] max-h-[500px] w-full cursor-pointer overflow-hidden rounded-xl lg:aspect-[21/9]"
        aria-label={`View gallery for ${address}`}
      >
        <Image
          src={images[0]}
          alt={`${address} - Main photo`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 66vw"
        />
      </button>

      {/* Thumbnail row */}
      {thumbnails.length > 0 && (
        <div className="mt-2 flex gap-2">
          {thumbnails.map((src, i) => {
            const thumbIndex = i + 1;
            const isLast = i === thumbnails.length - 1 && extraCount > 0;

            return (
              <button
                key={thumbIndex}
                onClick={() => openLightbox(thumbIndex)}
                className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 border-transparent opacity-60 transition-all hover:border-gold hover:opacity-100"
                aria-label={`View photo ${thumbIndex + 1}`}
              >
                <Image
                  src={src}
                  alt={`${address} - Photo ${thumbIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                {isLast && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <span className="text-sm font-bold text-white">
                      +{extraCount} more
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((src) => ({ src }))}
        plugins={[Counter, Fullscreen, Thumbnails, Zoom]}
        carousel={{ finite: true }}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.95)" } }}
      />
    </div>
  );
}
