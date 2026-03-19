export default function PropertiesLoading() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Header area skeleton */}
      <div className="border-b border-gold/10 px-6 py-16 text-center">
        <div className="mx-auto mb-4 h-4 w-28 animate-pulse rounded bg-gold/10" />
        <div className="mx-auto mb-6 h-10 w-72 animate-pulse rounded bg-gold/10" />
        <div className="mx-auto h-5 w-96 max-w-full animate-pulse rounded bg-gold/10" />
      </div>

      {/* Filter bar skeleton */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-10 w-28 animate-pulse rounded-md bg-gold/10"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>

      {/* Property grid skeleton */}
      <div className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse overflow-hidden rounded-lg border border-gold/5 bg-near-black"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-gold/5" />
              {/* Content area */}
              <div className="space-y-3 p-5">
                <div className="h-5 w-3/4 rounded bg-gold/10" />
                <div className="h-4 w-1/2 rounded bg-gold/10" />
                <div className="flex gap-4 pt-2">
                  <div className="h-4 w-16 rounded bg-gold/10" />
                  <div className="h-4 w-16 rounded bg-gold/10" />
                  <div className="h-4 w-20 rounded bg-gold/10" />
                </div>
                <div className="h-6 w-32 rounded bg-gold/10 pt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
