import { loadTestimonials } from "@/lib/data";
import FadeInView from "@/components/animations/FadeInView";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default async function Testimonials() {
  const testimonials = await loadTestimonials();
  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInView direction="up">
          <div className="text-center">
            <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">
              Client Stories
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
              What Our Clients Say
            </h2>
          </div>
        </FadeInView>
        <div className="mt-8 sm:mt-12">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
