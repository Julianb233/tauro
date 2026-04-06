"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

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
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

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
        <h1 className="font-heading text-xl text-[#F8F6F1]">Reset Password</h1>
        <p className="text-center text-sm text-[#A0A0A0]">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      {success ? (
        <div className="space-y-4">
          <div className="rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
            Check your email for a password reset link.
          </div>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm text-[#C9A96E] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="font-label text-xs font-medium tracking-wide text-[#A0A0A0] uppercase"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                className="w-full rounded-lg border border-[#2A2A3E] bg-[#12121F] py-2.5 pl-9 pr-4 text-sm text-[#F8F6F1] placeholder-[#6B7280] outline-none transition focus-visible:border-[#C9A96E] focus-visible:ring-1 focus-visible:ring-[#C9A96E]"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="gold-shimmer flex w-full items-center justify-center gap-2 rounded-lg bg-[#C9A96E] px-4 py-2.5 text-sm font-semibold text-[#1A1A2E] transition hover:bg-[#B08D4C] disabled:opacity-50"
          >
            {loading && <Loader2 className="size-4 animate-spin" />}
            Send Reset Link
          </button>

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm text-[#C9A96E] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </form>
      )}
    </div>
  );
}
