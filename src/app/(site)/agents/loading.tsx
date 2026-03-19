export default function AgentsLoading() {
  return (
    <div className="min-h-screen bg-midnight">
      {/* Header skeleton */}
      <div className="border-b border-gold/10 px-6 py-16 text-center">
        <div className="mx-auto mb-4 h-4 w-24 animate-pulse rounded bg-gold/10" />
        <div className="mx-auto mb-6 h-10 w-64 animate-pulse rounded bg-gold/10" />
        <div className="mx-auto h-5 w-80 max-w-full animate-pulse rounded bg-gold/10" />
      </div>

      {/* Agent grid skeleton */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse overflow-hidden rounded-lg border border-gold/5 bg-near-black"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Photo placeholder */}
              <div className="aspect-[3/4] bg-gold/5" />
              {/* Name and details */}
              <div className="space-y-3 p-5 text-center">
                <div className="mx-auto h-5 w-40 rounded bg-gold/10" />
                <div className="mx-auto h-4 w-28 rounded bg-gold/10" />
                <div className="mx-auto h-4 w-48 rounded bg-gold/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
