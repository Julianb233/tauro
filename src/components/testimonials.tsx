import { Star, Quote } from "lucide-react";
import { loadTestimonials } from "@/lib/data";

export default async function Testimonials() {
  const testimonials = await loadTestimonials();
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">Client Stories</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">What Our Clients Say</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="depth-hover rounded-xl border border-border/50 bg-white p-6 shadow-sm transition-all hover:border-gold/30 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex gap-1">{Array.from({ length: testimonial.rating }).map((_, i) => (<Star key={i} className="size-4 fill-gold text-gold" />))}</div>
                <Quote className="size-5 text-gold/30" strokeWidth={1.5} />
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/80">&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <div className="gold-divider mt-4" />
              <div className="pt-4"><p className="text-sm font-semibold text-foreground">{testimonial.name}</p><p className="font-label text-xs tracking-wider text-muted-foreground">{testimonial.role}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
