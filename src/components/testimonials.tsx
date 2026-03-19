import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="border-t border-border/40 bg-midnight py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Client Stories
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
            What Our Clients Say
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-xl border border-border/40 bg-near-black p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-gold text-gold"
                  />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-white/80">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-4 border-t border-border/40 pt-4">
                <p className="text-sm font-semibold text-white">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
