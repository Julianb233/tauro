"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Logo } from "@/components/logo";
import { Loader2 } from "lucide-react";
import type { Database } from "@/types/database";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      );

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
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
          Tauro Agent Portal
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Email */}
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
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className="w-full rounded-lg border border-[#2A2A3E] bg-[#12121F] px-4 py-2.5 text-sm text-[#F8F6F1] placeholder-[#6B7280] outline-none transition focus-visible:border-[#C9A96E] focus-visible:ring-1 focus-visible:ring-[#C9A96E]"
            placeholder="agent@tauro.com"
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-400">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="font-label text-xs font-medium tracking-wide text-[#A0A0A0] uppercase"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setFieldErrors((prev) => ({ ...prev, password: undefined }));
            }}
            className="w-full rounded-lg border border-[#2A2A3E] bg-[#12121F] px-4 py-2.5 text-sm text-[#F8F6F1] placeholder-[#6B7280] outline-none transition focus-visible:border-[#C9A96E] focus-visible:ring-1 focus-visible:ring-[#C9A96E]"
            placeholder="Enter your password"
          />
          {fieldErrors.password && (
            <p className="text-xs text-red-400">{fieldErrors.password}</p>
          )}
        </div>

        {/* Server error */}
        {error && (
          <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="gold-shimmer flex w-full items-center justify-center gap-2 rounded-lg bg-[#C9A96E] px-4 py-2.5 text-sm font-semibold text-[#1A1A2E] transition hover:bg-[#B08D4C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A2E] disabled:opacity-50"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
