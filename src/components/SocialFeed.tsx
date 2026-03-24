import Image from "next/image";
import { Instagram } from "lucide-react";
import { BLUR_LANDSCAPE } from "@/lib/blur-placeholder";

const INSTAGRAM_URL = "https://instagram.com/taurorealty";

const posts = [
  {
    src: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&q=80",
    alt: "Luxury Philadelphia row home with brick facade",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    alt: "Modern kitchen with marble countertops",
  },
  {
    src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
    alt: "Charming Fishtown townhouse exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    alt: "Rittenhouse Square luxury condo living room",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    alt: "Center City penthouse with skyline views",
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    alt: "Premium listing by Tauro Realty",
  },
];

export default function SocialFeed() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Follow Us
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            @taurorealty
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            See our latest listings, sold properties, and behind-the-scenes on Instagram.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6 lg:gap-4">
          {posts.map((post) => (
            <a
              key={post.src}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_LANDSCAPE}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gold/0 transition-colors duration-300 group-hover:bg-gold/60">
                <Instagram
                  className="size-6 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 sm:size-8"
                  strokeWidth={1.5}
                />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
          >
            <Instagram className="size-4" />
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
