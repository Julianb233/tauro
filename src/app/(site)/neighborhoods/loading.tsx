import { NeighborhoodCardSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function NeighborhoodsLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="relative bg-foreground pt-32 pb-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Skeleton className="mx-auto h-4 w-36 bg-gold/10" />
          <Skeleton className="mx-auto mt-3 h-12 w-96 max-w-full bg-gold/10" />
          <Skeleton className="mx-auto mt-4 h-6 w-[32rem] max-w-full bg-gold/10" />
        </div>
      </section>

      {/* Neighborhoods grid skeleton */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <NeighborhoodCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
