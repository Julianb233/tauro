"use client";

import { Trees, MapPin, Footprints, Flower2, Dog, Dumbbell, Sprout } from "lucide-react";
import type { ParksAndRec, ParkInfo } from "@/data/neighborhoods";

const typeIcons: Record<ParkInfo["type"], React.ElementType> = {
  Park: Trees,
  Trail: Footprints,
  "Recreation Center": Dumbbell,
  Playground: MapPin,
  "Dog Park": Dog,
  "Sports Complex": Dumbbell,
  Garden: Flower2,
};

const typeColors: Record<ParkInfo["type"], string> = {
  Park: "bg-emerald-600/20 text-emerald-400 border-emerald-600/30",
  Trail: "bg-blue-600/20 text-blue-400 border-blue-600/30",
  "Recreation Center": "bg-amber-600/20 text-amber-400 border-amber-600/30",
  Playground: "bg-purple-600/20 text-purple-400 border-purple-600/30",
  "Dog Park": "bg-orange-600/20 text-orange-400 border-orange-600/30",
  "Sports Complex": "bg-red-600/20 text-red-400 border-red-600/30",
  Garden: "bg-pink-600/20 text-pink-400 border-pink-600/30",
};

interface ParksAndRecSectionProps {
  data: ParksAndRec;
  neighborhoodName: string;
}

export function ParksAndRecSection({ data, neighborhoodName }: ParksAndRecSectionProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600/20">
            <Trees className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight">
              Parks & Recreation
            </h2>
            <p className="text-sm text-muted-foreground">
              Green spaces and outdoor activities in {neighborhoodName}
            </p>
          </div>
        </div>

        {/* Overview */}
        <p className="mb-8 max-w-3xl text-base leading-relaxed text-muted-foreground">
          {data.overview}
        </p>

        {/* Parks Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.parks.map((park) => {
            const Icon = typeIcons[park.type] || Trees;
            const colorClass = typeColors[park.type] || typeColors.Park;

            return (
              <div
                key={park.name}
                className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-emerald-600/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-base font-bold">
                      {park.name}
                    </h3>
                    <span
                      className={`mt-1 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${colorClass}`}
                    >
                      <Icon className="h-3 w-3" />
                      {park.type}
                    </span>
                  </div>
                  {park.acreage && (
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {park.acreage >= 100
                        ? `${Math.round(park.acreage).toLocaleString()} acres`
                        : `${park.acreage} acres`}
                    </span>
                  )}
                </div>
                <ul className="mt-3 space-y-1">
                  {park.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Sprout className="h-3 w-3 shrink-0 text-emerald-500" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Recreation Programs */}
        {data.recreationPrograms && data.recreationPrograms.length > 0 && (
          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-heading text-lg font-bold">
              Recreation Programs
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.recreationPrograms.map((program) => (
                <span
                  key={program}
                  className="rounded-full border border-emerald-600/20 bg-emerald-600/10 px-3 py-1.5 text-sm text-emerald-300"
                >
                  {program}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
