"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import Link from "next/link";
import { CheckCircle, XCircle, AlertCircle, RotateCcw } from "lucide-react";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const token = searchParams.get("token");
  const [resubStatus, setResubStatus] = useState<"idle" | "loading" | "done">("idle");

  // If there's a token but no status, redirect to the API
  if (token && !status) {
    if (typeof window !== "undefined") {
      window.location.href = `/api/newsletter/unsubscribe?token=${token}`;
    }
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 size-12 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          <p className="text-white/70">Processing your request...</p>
        </div>
      </div>
    );
  }

  async function handleResubscribe() {
    if (!token || resubStatus !== "idle") return;
    setResubStatus("loading");
    try {
      await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      setResubStatus("done");
    } catch {
      setResubStatus("done");
    }
  }

  if (resubStatus === "done") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="size-16 text-green-400" />
          </div>
          <h1 className="mb-4 font-heading text-3xl font-bold text-near-black">
            Welcome Back!
          </h1>
          <p className="mb-8 text-muted-foreground">
            You've been resubscribed to the Tauro Realty newsletter.
          </p>
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const states = {
    success: {
      icon: <CheckCircle className="size-16 text-green-400" />,
      title: "Unsubscribed",
      description:
        "You've been removed from our newsletter. You won't receive any more emails from us.",
      showResubscribe: true,
    },
    already: {
      icon: <AlertCircle className="size-16 text-gold" />,
      title: "Already Unsubscribed",
      description: "You're already unsubscribed from our newsletter.",
      showResubscribe: true,
    },
    invalid: {
      icon: <XCircle className="size-16 text-red-400" />,
      title: "Invalid Link",
      description:
        "This unsubscribe link is invalid. If you need to unsubscribe, please contact us.",
      showResubscribe: false,
    },
    error: {
      icon: <XCircle className="size-16 text-red-400" />,
      title: "Something Went Wrong",
      description: "We couldn't process your request. Please try again or contact us.",
      showResubscribe: false,
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
        <div className="flex flex-col items-center gap-3">
          {state.showResubscribe && token && (
            <button
              onClick={handleResubscribe}
              disabled={resubStatus === "loading"}
              className="inline-flex items-center gap-2 rounded-md border border-gold/30 px-6 py-3 text-sm font-semibold text-near-black transition-colors hover:bg-gold/10 disabled:opacity-50"
            >
              <RotateCcw className="size-4" />
              {resubStatus === "loading" ? "Resubscribing..." : "Resubscribe"}
            </button>
          )}
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function NewsletterUnsubscribePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}
