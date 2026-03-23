import { Skeleton, MarketStatSkeleton } from "@/components/ui/skeleton";

export default function NeighborhoodDetailLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="relative bg-foreground pt-32 pb-20">
        <Skeleton className="absolute inset-0 rounded-none bg-gold/5" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-28 bg-gold/10" />
          <Skeleton className="mt-3 h-12 w-80 bg-gold/10" />
          <Skeleton className="mt-4 h-6 w-96 max-w-full bg-gold/10" />
        </div>
      </section>

      {/* Market data skeleton */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="mx-auto mb-8 h-8 w-48" />
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <MarketStatSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Chart skeleton */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="mx-auto mb-8 h-8 w-56" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </section>

      {/* Score gauges skeleton */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="mx-auto mb-8 h-8 w-40" />
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3 rounded-xl border border-border/40 bg-white p-6">
                <Skeleton className="size-20 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listings skeleton */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="mx-auto mb-8 h-8 w-52" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-xl border border-border/50 bg-white shadow-sm">
                <Skeleton className="aspect-[4/3] w-full rounded-none" />
                <div className="space-y-3 p-4">
                  <Skeleton className="h-6 w-2/5" />
                  <Skeleton className="h-4 w-3/5" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
