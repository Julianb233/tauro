import { Star } from "lucide-react";
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
            <div key={testimonial.name} className="rounded-xl border border-border/50 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex gap-1">{Array.from({ length: testimonial.rating }).map((_, i) => (<Star key={i} className="size-4 fill-gold text-gold" />))}</div>
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground/80 sm:mt-4">&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <div className="mt-3 border-t border-border/50 pt-3 sm:mt-4 sm:pt-4"><p className="text-sm font-semibold text-foreground">{testimonial.name}</p><p className="text-xs text-muted-foreground">{testimonial.role}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
