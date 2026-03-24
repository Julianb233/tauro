import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import {
  blogPosts,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blog-posts";
import { siteUrl } from "@/lib/site-config";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BLUR_LANDSCAPE, BLUR_SQUARE } from "@/lib/blur-placeholder";
import {
  Q4PriceTrendChart,
  Q4NeighborhoodPriceChart,
  Q4NeighborhoodDomChart,
} from "@/components/charts/Q4MarketCharts";

/* ------------------------------------------------------------------ */
/*  Static params for SSG                                              */
/* ------------------------------------------------------------------ */
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/* ------------------------------------------------------------------ */
/*  SEO Metadata                                                       */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      url: `${siteUrl}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Simple Markdown-to-HTML renderer                                   */
/* ------------------------------------------------------------------ */
function renderMarkdown(md: string): string {
  let html = md
    // Headings
    .replace(/^### (.+)$/gm, '<h3 class="mt-10 mb-4 font-heading text-xl font-bold text-foreground">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="mt-14 mb-5 font-heading text-2xl font-bold text-foreground sm:text-3xl">$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Unordered list items
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2"><span class="mt-2 block size-1.5 shrink-0 rounded-full bg-gold"></span><span>$1</span></li>')
    // Wrap consecutive <li> elements in <ul>
    .replace(/((?:<li[^>]*>.*?<\/li>\n?)+)/g, '<ul class="my-6 space-y-2 text-muted-foreground">$1</ul>')
    // Em dashes
    .replace(/---/g, "\u2014")
    .replace(/--/g, "\u2013")
    // Paragraphs: wrap non-tag lines
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<")) return trimmed;
      return `<p class="mb-6 leading-[1.85] text-muted-foreground">${trimmed}</p>`;
    })
    .join("\n");

  return html;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  Chart-aware content renderer                                       */
/* ------------------------------------------------------------------ */

const chartComponents: Record<string, React.ComponentType> = {
  "price-trend": Q4PriceTrendChart,
  "neighborhood-prices": Q4NeighborhoodPriceChart,
  "neighborhood-dom": Q4NeighborhoodDomChart,
};

function renderContentWithCharts(html: string) {
  // Split on chart placeholder comments: <!--charts:key-->
  const parts = html.split(/<!--charts:(\w[\w-]*)-->/);
  // parts alternates: [html, chartKey, html, chartKey, html, ...]
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      const Chart = chartComponents[part];
      return Chart ? <Chart key={`chart-${part}`} /> : null;
    }
    if (!part.trim()) return null;
    return (
      <div key={`content-${i}`} dangerouslySetInnerHTML={{ __html: part }} />
    );
  });
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const contentHtml = renderMarkdown(post.content);

  return (
    <>
      <ReadingProgress />
      <Breadcrumbs items={[{ label: "Journal", href: "/blog" }, { label: post.title, href: `/blog/${post.slug}` }]} />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground pt-24 pb-16 lg:pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover opacity-30"
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={BLUR_LANDSCAPE}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-gold"
          >
            <ArrowLeft className="size-3.5" />
            Back to Journal
          </Link>

          <div className="mt-8">
            <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
              {post.category}
            </span>
          </div>

          <h1 className="mt-5 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
            {post.excerpt}
          </p>

          {/* Author byline */}
          <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
            <div className="relative size-12 overflow-hidden rounded-full ring-2 ring-gold/30">
              <Image
                src={post.authorImage}
                alt={post.author}
                fill
                className="object-cover"
                sizes="48px"
                placeholder="blur"
                blurDataURL={BLUR_SQUARE}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{post.author}</p>
              <div className="flex items-center gap-3 text-xs text-white/60">
                <span>{formatDate(post.publishedAt)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {post.readTime} min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article Content ───────────────────────────────────── */}
      <article className="bg-white py-16 lg:py-24">
        <div className="prose-tauro mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {renderContentWithCharts(contentHtml)}
        </div>
      </article>

      {/* ── Related Posts ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-cream py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                Continue Reading
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
                Related Articles
              </h2>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relPost) => (
                <Link
                  key={relPost.id}
                  href={`/blog/${relPost.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border/40 bg-white transition-all duration-300 hover:border-gold/30 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={relPost.coverImage}
                      alt={relPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      placeholder="blur"
                      blurDataURL={BLUR_LANDSCAPE}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur-sm">
                        {relPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-heading text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-gold">
                      {relPost.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {relPost.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{formatDate(relPost.publishedAt)}</span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="size-3" />
                        {relPost.readTime} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-foreground px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-foreground hover:text-white"
              >
                View All Articles
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
