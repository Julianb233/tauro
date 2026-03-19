import { cn } from "@/lib/utils";

/**
 * Skeleton placeholder with a gold-tinted shimmer animation.
 * Uses the brand's gold color for a subtle, on-brand loading indicator.
 */
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-skeleton-shimmer rounded-md bg-muted",
        "bg-[length:200%_100%]",
        "bg-[linear-gradient(90deg,var(--color-muted)_0%,var(--color-gold-light)_50%,var(--color-muted)_100%)]",
        className
      )}
      {...props}
    />
  );
}

/** A skeleton that mirrors the PropertyCard layout. */
export function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border/50 bg-white shadow-sm">
      {/* Image placeholder */}
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      {/* Text area */}
      <div className="space-y-3 p-4">
        <Skeleton className="h-6 w-2/5" />
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

/** Grid of 6 property card skeletons — used as Suspense fallback. */
export function PropertiesGridSkeleton() {
  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="mb-8 space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-64" />
        </div>
        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
