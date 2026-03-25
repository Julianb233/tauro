"use client";

import { Mail } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";

interface NewsletterCTAProps {
  /** Variant determines the visual style */
  variant?: "homepage" | "inline" | "banner";
  /** Tracking source */
  source?: string;
}

/**
 * Newsletter CTA section for homepage, blog posts, and content pages.
 * Matches the Tauro brand: midnight/gold/cream palette.
 */
export function NewsletterCTA({ variant = "homepage", source }: NewsletterCTAProps) {
  if (variant === "inline") {
    return (
      <div className="my-8 rounded-xl border border-gold/20 bg-midnight p-6 sm:p-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gold/10">
            <Mail className="size-6 text-gold" />
          </div>
          <div className="flex-1">
            <h3 className="mb-1 font-heading text-lg font-semibold text-off-white">
              Get Philadelphia Real Estate Insights
            </h3>
            <p className="text-sm text-white/90">
              New listings, market reports, and neighborhood guides. Delivered monthly.
            </p>
          </div>
        </div>
        <div className="mt-4">
          <NewsletterForm
            source={source || "inline-cta"}
            showName
            showInterests
            compact
          />
        </div>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className="border-y border-gold/20 bg-midnight/50 py-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:text-left">
          <div className="flex-1">
            <h3 className="font-heading text-lg font-semibold text-off-white">
              Never miss a listing
            </h3>
            <p className="text-sm text-white/90">
              Subscribe for monthly Philadelphia real estate updates.
            </p>
          </div>
          <div className="w-full sm:w-auto sm:min-w-[320px]">
            <NewsletterForm source={source || "banner-cta"} compact />
          </div>
        </div>
      </div>
    );
  }

  // Homepage variant - full-width section
  return (
    <section className="relative overflow-hidden bg-midnight py-16 sm:py-20">
      {/* Decorative gold gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent" />
      <div className="absolute -right-32 -top-32 size-64 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute -left-32 bottom-0 size-48 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative mx-auto max-w-2xl px-4 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
          <Mail className="size-7 text-gold" />
        </div>

        <h2 className="mb-3 font-heading text-2xl font-bold text-off-white sm:text-3xl">
          Stay in the Know
        </h2>
        <p className="mb-8 text-white/90 sm:text-lg">
          Get curated Philadelphia real estate insights delivered to your inbox. New listings, market reports, and neighborhood guides -- once a month, no spam.
        </p>

        <div className="mx-auto max-w-md">
          <NewsletterForm
            source={source || "homepage-cta"}
            showName
            showInterests
          />
        </div>

        <p className="mt-4 text-xs text-white/80">
          Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
