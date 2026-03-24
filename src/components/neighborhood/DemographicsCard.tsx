"use client";

import { Users, DollarSign, Home, UserCheck, Calendar } from "lucide-react";
import CountUp from "@/components/animations/CountUp";
import type { DemographicData } from "@/data/neighborhoods";

const metrics = [
  { key: "population" as const, label: "Population", icon: Users },
  { key: "medianHouseholdIncome" as const, label: "Median Income", icon: DollarSign },
  { key: "ownerOccupied" as const, label: "Owner-Occupied", icon: Home },
  { key: "renterOccupied" as const, label: "Renter-Occupied", icon: UserCheck },
  { key: "medianAge" as const, label: "Median Age", icon: Calendar },
];

function formatValue(key: string, data: DemographicData): string {
  switch (key) {
    case "population":
      return data.population.toLocaleString();
    case "medianHouseholdIncome":
      return data.medianHouseholdIncome;
    case "ownerOccupied":
      return `${data.ownerOccupied}%`;
    case "renterOccupied":
      return `${data.renterOccupied}%`;
    case "medianAge":
      return String(data.medianAge);
    default:
      return "";
  }
}

export function DemographicsCard({
  demographics,
  neighborhoodName,
}: {
  demographics: DemographicData;
  neighborhoodName: string;
}) {
  return (
    <section className="border-t border-border/40 bg-cream py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Demographics
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
          Who Lives in {neighborhoodName}
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map(({ key, label, icon: Icon }) => {
            const displayValue = formatValue(key, demographics);

            return (
              <div
                key={key}
                className="rounded-xl border border-border/40 bg-white p-6 text-center transition-transform duration-300 hover:scale-[1.03] hover:shadow-md"
              >
                <Icon className="mx-auto size-6 text-gold/70" strokeWidth={1.5} />
                <div className="mt-3">
                  <CountUp
                    value={displayValue}
                    className="font-heading text-2xl font-bold text-foreground"
                  />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            );
          })}
        </div>

        {/* Owner vs Renter bar */}
        <div className="mt-8 mx-auto max-w-md">
          <p className="mb-2 text-center text-sm font-medium text-muted-foreground">
            Ownership Ratio
          </p>
          <div className="flex h-4 overflow-hidden rounded-full">
            <div
              className="bg-gold transition-all duration-700"
              style={{ width: `${demographics.ownerOccupied}%` }}
              title={`Owner-occupied: ${demographics.ownerOccupied}%`}
            />
            <div
              className="bg-foreground/20 transition-all duration-700"
              style={{ width: `${demographics.renterOccupied}%` }}
              title={`Renter-occupied: ${demographics.renterOccupied}%`}
            />
          </div>
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>Owner {demographics.ownerOccupied}%</span>
            <span>Renter {demographics.renterOccupied}%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
