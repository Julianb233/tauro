import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyDetailLoading() {
  return (
    <div className="min-h-screen pt-16">
      {/* Image gallery skeleton */}
      <div className="relative aspect-[16/7] w-full bg-near-black">
        <Skeleton className="absolute inset-0 rounded-none bg-gold/5" />
        {/* Thumbnail strip */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="size-16 rounded-md bg-gold/10 sm:h-20 sm:w-28" />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-2" />
          <Skeleton className="h-3 w-32" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Left column */}
          <div className="space-y-8">
            {/* Price + address */}
            <div>
              <Skeleton className="h-9 w-48" />
              <Skeleton className="mt-2 h-6 w-64" />
              <Skeleton className="mt-1 h-4 w-40" />
              {/* Beds/baths row */}
              <div className="mt-4 flex gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-16" />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/5" />
            </div>

            {/* Details table */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="space-y-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                ))}
              </div>
            </div>

            {/* Status timeline */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-36" />
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex justify-between gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex flex-1 flex-col items-center gap-2">
                      <Skeleton className="size-8 rounded-full" />
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-2 w-20" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Financial summary */}
            <div className="space-y-3">
              <Skeleton className="h-6 w-52" />
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="border-b border-border px-6 py-4">
                  <Skeleton className="h-4 w-48" />
                </div>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <Skeleton className="size-8 rounded-lg" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-5 w-20" />
                  </div>
                ))}
                <div className="px-6 py-4 bg-gold/5">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-7 w-24" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column sidebar */}
          <div className="space-y-6">
            {/* Agent card */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="size-16 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Agent other listings */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div>
                <Skeleton className="h-3 w-28" />
                <Skeleton className="mt-1 h-5 w-36" />
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="size-16 rounded-md shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule form */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
