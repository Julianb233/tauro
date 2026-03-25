import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts, blogCategories } from "@/data/blog-posts";
import { BlogCategoryFilter } from "./BlogCategoryFilter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BLUR_LANDSCAPE, BLUR_SQUARE } from "@/lib/blur-placeholder";

export const metadata: Metadata = {
  title: "Journal | Insights on Philadelphia Real Estate",
  description:
    "Expert insights, market analysis, and neighborhood guides from the Tauro team. Stay informed about Philadelphia real estate trends, buying strategies, and lifestyle.",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  // Next.js 16 makes searchParams a promise, but for static rendering
  // we handle it synchronously via the URL search params on the client side.
  // The filtering is handled client-side via BlogCategoryFilter.
  const featured = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <>
      <Breadcrumbs items={[{ label: "Journal", href: "/blog" }]} />
      {/* ── Hero: Featured Post ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground pt-24 pb-16 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        {featured && (
          <Image
            src={featured.coverImage}
            alt={featured.title}
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR_LANDSCAPE}
          />
        )}
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            The Tauro Journal
          </p>
          <h1 className="mt-3 max-w-4xl font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Insights on Philadelphia Real Estate
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">
            Market analysis, neighborhood guides, and expert perspectives from
            our team.
          </p>

          {/* Featured post card */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group mt-12 block rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:bg-white/10 lg:flex lg:gap-8 lg:p-8"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl lg:aspect-auto lg:w-1/2 lg:shrink-0">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={BLUR_LANDSCAPE}
                />
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-near-black">
                    Featured
                  </span>
                </div>
              </div>
              <div className="mt-6 flex flex-col justify-center lg:mt-0">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {featured.category}
                </span>
                <h2 className="mt-2 font-heading text-2xl font-bold text-white transition-colors group-hover:text-gold sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/90">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4 text-xs text-white/80">
                  <div className="flex items-center gap-2">
                    <div className="relative size-8 overflow-hidden rounded-full">
                      <Image
                        src={featured.authorImage}
                        alt={featured.author}
                        fill
                        className="object-cover"
                        sizes="32px"
                        placeholder="blur"
                        blurDataURL={BLUR_SQUARE}
                      />
                    </div>
                    <span className="text-white/90">{featured.author}</span>
                  </div>
                  <span>{formatDate(featured.publishedAt)}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {featured.readTime} min read
                  </span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* ── Posts Grid ────────────────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BlogCategoryFilter
            categories={blogCategories}
            posts={remainingPosts}
          />
        </div>
      </section>

      {/* ── Newsletter CTA ───────────────────────────────────── */}
      <section className="bg-foreground py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Stay Informed
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">
            Get Market Insights Delivered
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/90">
            Join our mailing list for exclusive market reports, neighborhood
            spotlights, and expert analysis from the Tauro team.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Get in Touch
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
