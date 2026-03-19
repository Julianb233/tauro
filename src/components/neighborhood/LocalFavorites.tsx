import {
  UtensilsCrossed,
  Coffee,
  Beer,
  ShoppingBag,
  TreePine,
  Palette,
  Store,
} from "lucide-react";
import type { LocalSpot } from "@/data/neighborhoods";

const spotIcons: Record<LocalSpot["type"], typeof UtensilsCrossed> = {
  Restaurant: UtensilsCrossed,
  Cafe: Coffee,
  Bar: Beer,
  Shop: ShoppingBag,
  Park: TreePine,
  Gallery: Palette,
  Brewery: Beer,
  Market: Store,
};

export function LocalFavorites({
  localSpots,
  neighborhoodName,
}: {
  localSpots: LocalSpot[];
  neighborhoodName: string;
}) {
  return (
    <section className="border-t border-border/40 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Local Favorites
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
          {neighborhoodName} Highlights
        </h2>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {localSpots.map((spot) => {
            const Icon = spotIcons[spot.type] ?? Store;
            return (
              <div
                key={spot.name}
                className="group rounded-xl border border-border/40 bg-card p-6 transition-all duration-300 hover:border-gold/30 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
                    <Icon className="size-5 text-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-lg font-bold text-foreground">
                        {spot.name}
                      </h3>
                      <span className="rounded-full bg-foreground/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {spot.type}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {spot.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
