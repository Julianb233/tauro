import { BlogCardSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero / Featured post skeleton */}
      <section className="relative bg-foreground pt-24 pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-32 bg-gold/10" />
          <Skeleton className="mt-3 h-12 w-80 bg-gold/10 md:w-[28rem]" />
          <Skeleton className="mt-4 h-6 w-64 bg-gold/10" />

          {/* Featured post card placeholder */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 lg:flex lg:gap-8 lg:p-8">
            <Skeleton className="aspect-[16/9] rounded-xl bg-gold/10 lg:aspect-auto lg:h-64 lg:w-1/2 lg:shrink-0" />
            <div className="mt-6 flex flex-1 flex-col justify-center space-y-4 lg:mt-0">
              <Skeleton className="h-3 w-20 bg-gold/10" />
              <Skeleton className="h-7 w-4/5 bg-gold/10" />
              <Skeleton className="h-4 w-full bg-gold/10" />
              <Skeleton className="h-4 w-3/4 bg-gold/10" />
              <div className="flex items-center gap-4 pt-2">
                <Skeleton className="size-8 rounded-full bg-gold/10" />
                <Skeleton className="h-3 w-24 bg-gold/10" />
                <Skeleton className="h-3 w-16 bg-gold/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts grid skeleton */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category filter skeleton */}
          <div className="mb-8 flex gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-9 w-24 rounded-full"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
