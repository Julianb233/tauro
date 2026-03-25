import { PropertyCardSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function PropertiesLoading() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Header area skeleton */}
      <div className="border-b border-gold/10 px-6 py-16 text-center">
        <Skeleton className="mx-auto mb-4 h-4 w-28 bg-gold/10" />
        <Skeleton className="mx-auto mb-4 h-10 w-72 bg-gold/10" />
        <Skeleton className="mx-auto h-5 w-96 max-w-full bg-gold/10" />
      </div>

      {/* Filter bar skeleton */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-10 w-28 bg-gold/10"
            style={{ animationDelay: `${i * 80}ms` }}
          />
        ))}
        <div className="ml-auto">
          <Skeleton className="h-10 w-36 bg-gold/10" />
        </div>
      </div>

      {/* Property grid skeleton */}
      <div className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-5 w-32 bg-gold/10" />
          <Skeleton className="h-5 w-24 bg-gold/10" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ animationDelay: `${i * 80}ms` }}>
              <PropertyCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
