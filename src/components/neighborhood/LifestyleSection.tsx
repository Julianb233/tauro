import { UtensilsCrossed, Moon, TreePine, Palette } from "lucide-react";
import type { LifestyleInfo } from "@/data/neighborhoods";

const lifestyleConfig = [
  { key: "dining" as const, label: "Dining", icon: UtensilsCrossed },
  { key: "nightlife" as const, label: "Nightlife", icon: Moon },
  { key: "parks" as const, label: "Parks & Outdoors", icon: TreePine },
  { key: "culture" as const, label: "Arts & Culture", icon: Palette },
];

export function LifestyleSection({
  lifestyleInfo,
  neighborhoodName,
}: {
  lifestyleInfo: LifestyleInfo;
  neighborhoodName: string;
}) {
  return (
    <section className="border-t border-border/40 bg-cream py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Lifestyle
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
          Living in {neighborhoodName}
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {lifestyleConfig.map(({ key, label, icon: Icon }) => (
            <div
              key={key}
              className="rounded-xl border border-border/40 bg-card p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-gold/10">
                  <Icon className="size-5 text-gold" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  {label}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {lifestyleInfo[key]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
