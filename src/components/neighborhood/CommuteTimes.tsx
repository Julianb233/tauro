import { Car, TrainFront, Bike, Clock } from "lucide-react";
import type { CommuteDestination } from "@/data/neighborhoods";

export function CommuteTimes({
  commuteTimes,
  neighborhoodName,
}: {
  commuteTimes: CommuteDestination[];
  neighborhoodName: string;
}) {
  return (
    <section className="border-t border-border/40 bg-cream py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Getting Around
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
          Commute Times from {neighborhoodName}
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Estimated travel times to key Philadelphia destinations during typical
          weekday conditions.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {commuteTimes
            .filter((d) => d.drive !== "—")
            .map((dest) => (
              <div
                key={dest.name}
                className="rounded-xl border border-border/40 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-gold/10">
                    <Clock className="size-5 text-gold" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {dest.name}
                  </h3>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Car className="size-4" /> Driving
                    </span>
                    <span className="font-heading text-sm font-semibold text-foreground">
                      {dest.drive}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrainFront className="size-4" /> Transit
                    </span>
                    <span className="font-heading text-sm font-semibold text-foreground">
                      {dest.transit}
                    </span>
                  </div>

                  {dest.bike && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Bike className="size-4" /> Biking
                      </span>
                      <span className="font-heading text-sm font-semibold text-foreground">
                        {dest.bike}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
