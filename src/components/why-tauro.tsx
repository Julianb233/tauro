import { Building2, LineChart, HeartHandshake, Award } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import FadeInView from "@/components/animations/FadeInView";
import StaggerReveal from "@/components/animations/StaggerReveal";

const whyTauro = [
  {
    icon: Building2,
    title: "Curated Portfolio",
    description:
      "We don't list everything — we list the right things. Every property is vetted for quality, value, and investment potential.",
  },
  {
    icon: LineChart,
    title: "Market Intelligence",
    description:
      "Hyperlocal data across 15 Philadelphia neighborhoods. We know pricing trends before they hit the market.",
  },
  {
    icon: HeartHandshake,
    title: "Concierge Service",
    description:
      "Dedicated agents who know your name, your goals, and your timeline. Not a call center — a partnership.",
  },
  {
    icon: Award,
    title: "Proven Results",
    description:
      "98% client satisfaction, $2.1B in total volume, and a reputation built on delivering what we promise.",
  },
];

export default function WhyTauro() {
  return (
    <section className="bg-foreground py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInView direction="up">
          <div className="text-center">
            <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">
              The Tauro Difference
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Why Philadelphia Trusts Tauro
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/60 sm:mt-4 sm:text-base">
              We&apos;re not the biggest brokerage in Philadelphia. We&apos;re the most intentional.
              Every client, every listing, every deal — handled with precision.
            </p>
          </div>
        </FadeInView>

        {/* Asymmetric editorial grid: first card spans 2 cols for visual hierarchy */}
        <StaggerReveal className="mt-8 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8" stagger={0.12}>
          {whyTauro.map((item, i) => (
            <TiltCard key={item.title} maxTilt={6} className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
              <div className={`group glass-card rounded-xl ${i === 0 ? "p-8 lg:flex lg:items-center lg:gap-8" : "p-6"}`}>
                <div className={`flex items-center justify-center rounded-lg bg-gold/10 transition-all duration-300 group-hover:bg-gold/20 group-hover:scale-110 ${i === 0 ? "size-16 shrink-0" : "size-12"}`}>
                  <item.icon className={`text-gold transition-transform duration-300 group-hover:scale-105 ${i === 0 ? "size-8" : "size-6"}`} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className={`font-heading font-bold text-white ${i === 0 ? "mt-4 lg:mt-0 text-xl lg:text-2xl" : "mt-4 text-lg"}`}>
                    {item.title}
                  </h3>
                  <p className={`leading-relaxed text-white/60 ${i === 0 ? "mt-2 text-base" : "mt-2 text-sm"}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
