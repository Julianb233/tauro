"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Logo } from "@/components/logo";
import { Loader2, Lock, Eye, EyeOff } from "lucide-react";
import type { Database } from "@/types/database";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      router.push("/dashboard");
      router.refresh();
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
          Set New Password
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="font-label text-xs font-medium tracking-wide text-[#A0A0A0] uppercase"
          >
            New Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(null); }}
              className="w-full rounded-lg border border-[#2A2A3E] bg-[#12121F] py-2.5 pl-9 pr-10 text-sm text-[#F8F6F1] placeholder-[#6B7280] outline-none transition focus-visible:border-[#C9A96E] focus-visible:ring-1 focus-visible:ring-[#C9A96E]"
              placeholder="Min. 6 characters"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#A0A0A0]"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="confirm-password"
            className="font-label text-xs font-medium tracking-wide text-[#A0A0A0] uppercase"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setError(null); }}
              className="w-full rounded-lg border border-[#2A2A3E] bg-[#12121F] py-2.5 pl-9 pr-3 text-sm text-[#F8F6F1] placeholder-[#6B7280] outline-none transition focus-visible:border-[#C9A96E] focus-visible:ring-1 focus-visible:ring-[#C9A96E]"
              placeholder="Confirm your password"
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
          className="gold-shimmer flex w-full items-center justify-center gap-2 rounded-lg bg-[#C9A96E] px-4 py-2.5 text-sm font-semibold text-[#1A1A2E] transition hover:bg-[#B08D4C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A2E] disabled:opacity-50"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
