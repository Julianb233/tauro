"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { Logo } from "@/components/logo";
import { Loader2, ArrowLeft, Mail } from "lucide-react";
import type { Database } from "@/types/database";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        { redirectTo: `${window.location.origin}/auth/callback?next=/reset-password` },
      );

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSuccess(true);
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-[#2A2A3E] bg-[#1A1A2E] p-8 shadow-2xl">
      <div className="mb-6 flex flex-col items-center gap-3">
        <Logo size="md" variant="light" />
        <h1 className="font-heading text-xl text-[#F8F6F1]">
          Reset Password
        </h1>
      </div>

      {success ? (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
            <Mail className="h-6 w-6 text-green-400" />
          </div>
          <p className="text-sm text-[#A0A0A0]">
            If an account exists for <strong className="text-[#F8F6F1]">{email}</strong>,
            you&apos;ll receive a password reset link shortly.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#C9A96E] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-5 text-center text-sm text-[#A0A0A0]">
            Enter your email and we&apos;ll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="font-label text-xs font-medium tracking-wide text-[#A0A0A0] uppercase"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                className="w-full rounded-lg border border-[#2A2A3E] bg-[#12121F] px-4 py-2.5 text-sm text-[#F8F6F1] placeholder-[#6B7280] outline-none transition focus-visible:border-[#C9A96E] focus-visible:ring-1 focus-visible:ring-[#C9A96E]"
                placeholder="agent@tauro.com"
              />
            </div>

            {error && (
              <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="gold-shimmer flex w-full items-center justify-center gap-2 rounded-lg bg-[#C9A96E] px-4 py-2.5 text-sm font-semibold text-[#1A1A2E] transition hover:bg-[#B08D4C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A2E] disabled:opacity-50"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="mt-5 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#C9A96E] hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
