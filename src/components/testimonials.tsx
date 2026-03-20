import Link from "next/link";
import { Star, Quote } from "lucide-react";
import { loadTestimonials } from "@/lib/data";

export default async function Testimonials() {
  const testimonials = await loadTestimonials();
  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">Client Stories</p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">What Our Clients Say</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="depth-hover rounded-xl border border-border/50 bg-white p-5 shadow-sm transition-all hover:border-gold/30 hover:shadow-lg sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-1">{Array.from({ length: testimonial.rating }).map((_, i) => (<Star key={i} className="size-4 fill-gold text-gold" />))}</div>
                <Quote className="size-5 text-gold/30" strokeWidth={1.5} />
              </div>
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground/80 sm:mt-4">&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <div className="gold-divider mt-3 sm:mt-4" />
              <div className="flex items-center justify-between pt-3 sm:pt-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="font-label text-xs tracking-wider text-muted-foreground">{testimonial.role}</p>
                </div>
                {/* AI-3911: Link testimonials to specific agents */}
                {testimonial.agentSlug && (
                  <Link
                    href={`/agents/${testimonial.agentSlug}`}
                    className="text-xs text-gold transition-colors hover:text-gold-dark hover:underline"
                  >
                    View Agent
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
