import { PageHeroSkeleton, AgentsGridSkeleton } from "@/components/ui/skeleton";

export default function AgentsLoading() {
  return (
    <>
      <PageHeroSkeleton showStats />
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="mb-3 h-px w-12 bg-gold/60" />
            <div className="h-7 w-48 animate-skeleton-shimmer rounded-md bg-muted bg-[length:200%_100%] bg-[linear-gradient(90deg,var(--color-muted)_0%,var(--color-gold-light)_50%,var(--color-muted)_100%)]" />
          </div>
          <AgentsGridSkeleton />
        </div>
      </section>
    </>
  );
}
