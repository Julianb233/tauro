"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { BLUR_LANDSCAPE } from "@/lib/blur-placeholder";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export function PhotoGallery({
  images,
  neighborhoodName,
}: {
  images: string[];
  neighborhoodName: string;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const slides = images.map((src) => ({ src }));

  return (
    <section className="border-t border-border/40 bg-cream py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Gallery
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
          {neighborhoodName} in Photos
        </h2>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl"
            >
              <Image
                src={src}
                alt={`${neighborhoodName} photo ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                placeholder="blur"
                blurDataURL={BLUR_LANDSCAPE}
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <Camera className="size-8 text-white drop-shadow-lg" />
              </div>
            </button>
          ))}
        </div>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
          plugins={[Fullscreen, Thumbnails, Counter]}
          counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        />
      </div>
    </section>
  );
}
