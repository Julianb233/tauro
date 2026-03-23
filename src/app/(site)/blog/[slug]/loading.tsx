import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero image skeleton */}
      <div className="relative bg-foreground pt-24 pb-16">
        <Skeleton className="absolute inset-0 rounded-none bg-gold/5" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 pt-16 text-center sm:px-6">
          <Skeleton className="mx-auto h-3 w-20 bg-gold/10" />
          <Skeleton className="mx-auto mt-4 h-10 w-4/5 bg-gold/10" />
          <Skeleton className="mx-auto mt-3 h-5 w-3/5 bg-gold/10" />
          <div className="mt-6 flex items-center justify-center gap-4">
            <Skeleton className="size-10 rounded-full bg-gold/10" />
            <Skeleton className="h-4 w-28 bg-gold/10" />
            <Skeleton className="h-4 w-20 bg-gold/10" />
          </div>
        </div>
      </div>

      {/* Article body skeleton */}
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="space-y-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="mt-6 h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/5" />
          <Skeleton className="mt-6 h-64 w-full rounded-lg" />
          <Skeleton className="mt-6 h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </div>
      </article>
    </div>
  );
}
