export default function SiteLoading() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Hero skeleton */}
      <div className="relative flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          {/* Label skeleton */}
          <div className="h-4 w-32 animate-pulse rounded bg-gold/10" />
          {/* Heading skeleton */}
          <div className="h-12 w-80 animate-pulse rounded bg-gold/10 md:w-[28rem]" />
          {/* Subheading skeleton */}
          <div className="h-6 w-64 animate-pulse rounded bg-gold/10" />
          {/* CTA skeleton */}
          <div className="mt-4 h-12 w-48 animate-pulse rounded-md bg-gold/10" />
        </div>
      </div>

      {/* Content section skeleton */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 h-8 w-48 animate-pulse rounded bg-gold/10" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-lg bg-gold/5"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
