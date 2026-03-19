import { Home, TrendingUp, Users, Shield } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";

const whyTauro = [
  {
    icon: Home,
    title: "Curated Portfolio",
    description:
      "We don't list everything — we list the right things. Every property is vetted for quality, value, and investment potential.",
  },
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    description:
      "Hyperlocal data across 15 Philadelphia neighborhoods. We know pricing trends before they hit the market.",
  },
  {
    icon: Users,
    title: "Concierge Service",
    description:
      "Dedicated agents who know your name, your goals, and your timeline. Not a call center — a partnership.",
  },
  {
    icon: Shield,
    title: "Proven Results",
    description:
      "98% client satisfaction, $2.1B in total volume, and a reputation built on delivering what we promise.",
  },
];

export default function WhyTauro() {
  return (
    <section className="bg-foreground py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            The Tauro Difference
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
            Why Philadelphia Trusts Tauro
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            We&apos;re not the biggest brokerage in Philadelphia. We&apos;re the most intentional.
            Every client, every listing, every deal — handled with precision.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyTauro.map((item) => (
            <TiltCard key={item.title} maxTilt={6}>
              <div className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-gold/30 hover:shadow-lg">
                <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10">
                  <item.icon className="size-6 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {item.description}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
