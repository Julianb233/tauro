"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

function ConfirmContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const token = searchParams.get("token");

  // If there's a token but no status, redirect to the API to process confirmation
  if (token && !status) {
    if (typeof window !== "undefined") {
      window.location.href = `/api/newsletter/confirm?token=${token}`;
    }
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          <p className="text-white/90">Confirming your subscription...</p>
        </div>
      </div>
    );
  }

  const states = {
    success: {
      icon: <CheckCircle className="size-16 text-green-400" />,
      title: "Subscription Confirmed!",
      description:
        "You're all set! You'll receive our monthly Philadelphia real estate newsletter with new listings, market reports, and neighborhood guides.",
      cta: "Browse Properties",
      ctaHref: "/properties",
    },
    "already-confirmed": {
      icon: <AlertCircle className="size-16 text-gold" />,
      title: "Already Confirmed",
      description:
        "Your email is already confirmed. You're already receiving our newsletter.",
      cta: "Browse Properties",
      ctaHref: "/properties",
    },
    invalid: {
      icon: <XCircle className="size-16 text-red-400" />,
      title: "Invalid or Expired Link",
      description:
        "This confirmation link is invalid or has expired. Please try subscribing again.",
      cta: "Go Home",
      ctaHref: "/",
    },
    error: {
      icon: <XCircle className="size-16 text-red-400" />,
      title: "Something Went Wrong",
      description:
        "We couldn't confirm your subscription. Please try again or contact us for help.",
      cta: "Contact Us",
      ctaHref: "/contact",
    },
  };

  const state = states[status as keyof typeof states] || states.invalid;

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="mb-6 flex justify-center">{state.icon}</div>
        <h1 className="mb-4 font-heading text-3xl font-bold text-near-black">
          {state.title}
        </h1>
        <p className="mb-8 text-muted-foreground">{state.description}</p>
        <Link
          href={state.ctaHref}
          className="inline-flex items-center rounded-md bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
        >
          {state.cta}
        </Link>
      </div>
    </div>
  );
}

export default function NewsletterConfirmPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      }
    >
      <ConfirmContent />
    </Suspense>
  );
}
