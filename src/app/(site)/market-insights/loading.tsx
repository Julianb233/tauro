import { Skeleton, MarketStatSkeleton } from "@/components/ui/skeleton";

export default function MarketInsightsLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="relative overflow-hidden bg-foreground pb-20 pt-32">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-28 bg-gold/10" />
          <Skeleton className="mt-3 h-12 w-96 max-w-full bg-gold/10" />
          <Skeleton className="mt-4 h-6 w-80 bg-gold/10" />
        </div>
      </section>

      {/* Summary stat cards skeleton */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Skeleton className="mx-auto h-4 w-20" />
            <Skeleton className="mx-auto mt-2 h-9 w-80 max-w-full" />
          </div>
          <div className="mt-12 grid gap-6 grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <MarketStatSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Trend chart skeleton */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Skeleton className="mx-auto h-4 w-24" />
            <Skeleton className="mx-auto mt-2 h-9 w-72" />
          </div>
          <div className="mt-12 rounded-xl border border-border/40 bg-cream p-6 sm:p-8">
            {/* Tab buttons */}
            <div className="mb-6 flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-28 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-72 w-full rounded-lg" />
          </div>
        </div>
      </section>

      {/* Neighborhood bar chart skeleton */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Skeleton className="mx-auto h-4 w-28" />
            <Skeleton className="mx-auto mt-2 h-9 w-64" />
          </div>
          <div className="mt-12 rounded-xl border border-border/40 bg-white p-6 sm:p-8">
            <Skeleton className="h-72 w-full rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  );
}
