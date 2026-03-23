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

/**
 * Skeleton that mirrors the AgentCard layout.
 * Matches the 3/4 portrait aspect ratio with overlay-style bottom info area.
 */
export function AgentCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border/50 bg-white shadow-sm">
      {/* Portrait image placeholder with bottom overlay area */}
      <div className="relative aspect-[3/4] bg-muted">
        <Skeleton className="absolute inset-0 rounded-none" />
        {/* Title badge top-right */}
        <div className="absolute right-3 top-3 z-10">
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        {/* Bottom info overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-5 pb-5 pt-12">
          <Skeleton className="h-6 w-40 bg-white/20" />
          <div className="my-2 h-px w-12 bg-white/20" />
          <div className="flex gap-1.5">
            <Skeleton className="h-5 w-20 rounded-full bg-white/15" />
            <Skeleton className="h-5 w-24 rounded-full bg-white/15" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Full agents page loading skeleton with filter bar, count, and card grid.
 * Used as the Suspense fallback or in loading.tsx for the agents route.
 */
export function AgentsGridSkeleton() {
  return (
    <div>
      {/* Filter bar skeleton */}
      <div className="mb-8 border-b border-border bg-cream/80 backdrop-blur-sm">
        {/* Search input */}
        <div className="px-4 pt-4 lg:px-6 lg:pt-4">
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        {/* Desktop filter dropdowns */}
        <div className="hidden px-6 py-4 lg:flex lg:items-end lg:gap-3">
          <Skeleton className="h-10 w-44 rounded-lg" />
          <Skeleton className="h-10 w-44 rounded-lg" />
          <div className="ml-auto">
            <Skeleton className="h-10 w-36 rounded-lg" />
          </div>
        </div>
        {/* Mobile filter toggle */}
        <div className="flex items-center justify-between px-4 py-3 lg:hidden">
          <Skeleton className="h-11 w-28 rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>
      </div>

      {/* Agent card grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <AgentCardSkeleton key={i} />
        ))}
      </div>

      {/* Count line */}
      <div className="mt-4 flex justify-center">
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  );
}

/**
 * Generic hero section skeleton.
 * Dark background with centered title, subtitle, and optional stats row.
 */
export function PageHeroSkeleton({ showStats = true }: { showStats?: boolean }) {
  return (
    <section className="relative overflow-hidden bg-foreground pb-20 pt-32">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Gold accent line */}
        <Skeleton className="mb-4 h-px w-16 bg-gold/30" />
        {/* Tag line */}
        <Skeleton className="h-4 w-24 bg-white/10" />
        {/* Title */}
        <Skeleton className="mt-3 h-12 w-3/4 bg-white/10 sm:h-14 lg:h-16" />
        {/* Subtitle */}
        <Skeleton className="mt-4 h-5 w-full max-w-xl bg-white/10" />
        <Skeleton className="mt-2 h-5 w-2/3 max-w-xl bg-white/10" />

        {showStats && (
          <div className="mt-8 flex gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-7 w-16 bg-gold/20" />
                <Skeleton className="mt-1 h-3 w-24 bg-white/10" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Generic content section skeleton with title and paragraph lines.
 * Flexible for various page sections.
 */
export function SectionSkeleton({
  lines = 4,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("py-16", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section accent + title */}
        <div className="mb-8">
          <Skeleton className="mb-3 h-px w-12" />
          <Skeleton className="h-7 w-64" />
        </div>
        {/* Paragraph lines */}
        <div className="space-y-3 max-w-3xl">
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
              key={i}
              className={cn("h-4", i === lines - 1 ? "w-3/5" : "w-full")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
