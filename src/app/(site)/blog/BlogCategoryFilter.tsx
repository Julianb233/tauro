"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Mail, ArrowRight } from "lucide-react";
import type { BlogPost, BlogCategory } from "@/data/blog-posts";

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border/40 bg-white transition-all duration-300 hover:border-gold/30 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur-sm">
            {post.category}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-gold">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-3 border-t border-border/30 pt-4">
          <div className="relative size-8 overflow-hidden rounded-full">
            <Image
              src={post.authorImage}
              alt={post.author}
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <div className="flex flex-1 flex-col gap-0.5">
            <span className="text-xs font-medium text-foreground">
              {post.author}
            </span>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span>{formatDate(post.publishedAt)}</span>
              <span className="flex items-center gap-0.5">
                <Clock className="size-3" />
                {post.readTime} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

const CTA_POSITION = 2; // Insert after 2nd post (0-indexed)

function NewsletterCta() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-gold/30 bg-gradient-to-br from-foreground to-foreground/90 p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-gold/20">
        <Mail className="size-5 text-gold" />
      </div>
      <h3 className="mt-4 font-heading text-lg font-bold text-white">
        Get Market Insights Delivered
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/60">
        Expert analysis, neighborhood guides, and exclusive reports from the
        Tauro team — straight to your inbox.
      </p>
      <Link
        href="/contact"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
      >
        Subscribe
        <ArrowRight className="size-3.5" />
      </Link>
    </div>
  );
}

export function BlogCategoryFilter({
  categories,
  posts,
}: {
  categories: readonly BlogCategory[];
  posts: BlogPost[];
}) {
  const [active, setActive] = useState<BlogCategory | "All">("All");

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {/* Category pills */}
      <div className="mb-12 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActive("All")}
          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
            active === "All"
              ? "bg-foreground text-white"
              : "bg-white text-muted-foreground hover:bg-foreground/5"
          }`}
        >
          All Posts
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
              active === cat
                ? "bg-foreground text-white"
                : "bg-white text-muted-foreground hover:bg-foreground/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <Fragment key={post.id}>
              {i === CTA_POSITION && <NewsletterCta />}
              <PostCard post={post} />
            </Fragment>
          ))}
          {filtered.length <= CTA_POSITION && <NewsletterCta />}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">
            No posts in this category yet. Check back soon.
          </p>
        </div>
      )}
    </>
  );
}
