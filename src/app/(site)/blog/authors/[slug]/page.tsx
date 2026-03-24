import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import {
  blogAuthors,
  getBlogAuthorBySlug,
  getPostsByAuthor,
} from "@/data/blog-authors";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BLUR_SQUARE, BLUR_LANDSCAPE } from "@/lib/blur-placeholder";

/* ------------------------------------------------------------------ */
/*  Static params for SSG                                              */
/* ------------------------------------------------------------------ */
export function generateStaticParams() {
  return blogAuthors.map((author) => ({ slug: author.slug }));
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
  const author = getBlogAuthorBySlug(slug);
  if (!author) return {};

  return {
    title: `${author.name} — Tauro Journal`,
    description: author.shortBio,
    openGraph: {
      title: `${author.name} — Tauro Journal`,
      description: author.shortBio,
      type: "profile",
      images: [{ url: author.photo, width: 400, height: 400 }],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default async function AuthorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getBlogAuthorBySlug(slug);
  if (!author) notFound();

  const posts = getPostsByAuthor(author.name);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Journal", href: "/blog" },
          { label: author.name, href: `/blog/authors/${author.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground pb-16 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:gap-8">
            {/* Photo */}
            <div className="relative size-28 shrink-0 overflow-hidden rounded-full ring-4 ring-gold/30 sm:size-32">
              <Image
                src={author.photo}
                alt={author.name}
                fill
                className="object-cover"
                sizes="128px"
                placeholder="blur"
                blurDataURL={BLUR_SQUARE}
                priority
              />
            </div>

            {/* Info */}
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
                {author.title}
              </p>
              <h1 className="mt-1 font-heading text-3xl font-bold text-white sm:text-4xl">
                {author.name}
              </h1>
              <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
                {author.specialties.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-gold/30 bg-gold/10 px-3 py-0.5 text-xs font-medium text-gold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio + Posts */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Bio */}
          <div className="rounded-2xl border border-border/40 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-lg font-bold text-foreground">
              About {author.name.split(" ")[0]}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {author.bio}
            </p>
          </div>

          {/* Posts */}
          <div className="mt-12">
            <div className="flex items-center gap-3">
              <BookOpen className="size-5 text-gold" />
              <h2 className="font-heading text-xl font-bold text-foreground">
                Articles by {author.name.split(" ")[0]}
              </h2>
              <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-xs font-semibold text-gold">
                {posts.length}
              </span>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-xl border border-border/40 bg-white shadow-sm transition-all hover:border-gold/40 hover:shadow-md"
                >
                  {/* Cover */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 640px) 50vw, 100vw"
                      placeholder="blur"
                      blurDataURL={BLUR_LANDSCAPE}
                    />
                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-foreground/80 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-heading text-base font-bold leading-snug text-foreground group-hover:text-gold">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3 border-t border-border/30 pt-3 text-xs text-muted-foreground">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {post.readTime} min read
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Back link */}
          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-colors hover:text-gold-light"
            >
              <ArrowLeft className="size-4" />
              Back to Journal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
