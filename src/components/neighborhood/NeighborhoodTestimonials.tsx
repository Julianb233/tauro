import { Star, Quote } from "lucide-react";
import { loadTestimonials } from "@/lib/data";

interface NeighborhoodTestimonialsProps {
  neighborhoodName: string;
}

export async function NeighborhoodTestimonials({ neighborhoodName }: NeighborhoodTestimonialsProps) {
  const allTestimonials = await loadTestimonials();

  // Filter testimonials that mention this neighborhood in their role
  const matched = allTestimonials.filter((t) =>
    t.role.toLowerCase().includes(neighborhoodName.toLowerCase())
  );

  // If no neighborhood-specific testimonials, show nothing
  if (matched.length === 0) return null;

  return (
    <section className="border-t border-border/40 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Client Stories
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
          What Clients Say About {neighborhoodName}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {matched.map((t) => (
            <div
              key={t.name}
              className="relative rounded-2xl border border-border/40 bg-cream p-8 shadow-sm"
            >
              <Quote className="absolute right-6 top-6 size-8 text-gold/15" aria-hidden="true" />
              <div
                className="mb-4 flex gap-0.5"
                role="img"
                aria-label={`Rating: ${t.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${i < t.rating ? "fill-gold text-gold" : "fill-gray-200 text-gray-200"}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground/80">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-5">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
