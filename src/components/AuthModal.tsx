"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { X, Mail, Loader2, User, Lock, Eye, EyeOff, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { signIn, signUp } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/client";
import type { UserRole } from "@/types/database";

type AuthMode = "login" | "register" | "magic-link" | "forgot-password";
type SignupRole = Extract<UserRole, "buyer" | "seller" | "agent">;

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const roleOptions: { value: SignupRole; label: string; description: string }[] = [
  { value: "buyer", label: "Buyer", description: "Looking to purchase a home" },
  { value: "seller", label: "Seller", description: "Looking to sell a property" },
  { value: "agent", label: "Agent", description: "I'm a real estate agent" },
];

export function AuthModal({ open, onClose }: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<SignupRole>("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Reset on open/close
  useEffect(() => {
    if (open) {
      setError(null);
      setSuccess(null);
      setEmail("");
      setPassword("");
      setName("");
      setRole("buyer");
      setShowPassword(false);
      setMode("login");
    }
  }, [open]);

  // Escape key closes
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  function validate(): boolean {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if ((mode === "login" || mode === "register") && (!password || password.length < 6)) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (mode === "register" && !name.trim()) {
      setError("Please enter your name");
      return false;
    }
    return true;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!validate()) return;

    setLoading(true);
    try {
      if (mode === "login") {
        const { error: authError } = await signIn(email, password);
        if (authError) {
          setError(authError.message);
          return;
        }
        onClose();
        router.refresh();
      } else if (mode === "register") {
        const { user, error: authError } = await signUp(email, password, name, role);
        if (authError) {
          setError(authError.message);
          return;
        }
        if (user?.identities?.length === 0) {
          setError("An account with this email already exists");
          return;
        }
        setSuccess("Check your email for a confirmation link to complete registration.");
      } else if (mode === "magic-link") {
        const supabase = createClient();
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (otpError) {
          setError(otpError.message);
          return;
        }
        setSuccess("Check your email for a magic link to sign in.");
      } else if (mode === "forgot-password") {
        const supabase = createClient();
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (resetError) {
          setError(resetError.message);
          return;
        }
        setSuccess("Check your email for a password reset link.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleAuth() {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (oauthError) {
        setError(oauthError.message);
        setLoading(false);
      }
    } catch {
      setError("Failed to start Google sign-in");
      setLoading(false);
    }
  }

  const showPasswordField = mode === "login" || mode === "register";
  const showNameField = mode === "register";
  const showRoleField = mode === "register";

  const submitLabel = {
    login: "Sign In",
    register: "Create Account",
    "magic-link": "Send Magic Link",
    "forgot-password": "Send Reset Link",
  }[mode];

  const headerTitle = {
    login: "Welcome Back",
    register: "Create Account",
    "magic-link": "Passwordless Sign In",
    "forgot-password": "Reset Password",
  }[mode];

  const headerSubtitle = {
    login: "Sign in to sync your favorites and saved searches",
    register: "Join Tauro to save properties and get alerts",
    "magic-link": "We'll send a sign-in link to your email",
    "forgot-password": "Enter your email to receive a reset link",
  }[mode];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-white p-8 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-cream hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            {headerTitle}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {headerSubtitle}
          </p>
        </div>

        {/* Success message */}
        {success && (
          <div className="mb-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        )}

        {/* Google OAuth — show on login and register */}
        {(mode === "login" || mode === "register") && !success && (
          <>
            <button
              onClick={handleGoogleAuth}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-cream disabled:opacity-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </>
        )}

        {/* Form */}
        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name field — register only */}
            {showNameField && (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(null); }}
                    placeholder="John Smith"
                    className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
              </div>
            )}

            {/* Email field — all modes */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
              </div>
            </div>

            {/* Password field — login and register only */}
            {showPasswordField && (
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground">
                    Password
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => { setMode("forgot-password"); setError(null); setSuccess(null); }}
                      className="text-xs font-medium text-gold hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(null); }}
                    placeholder="Min. 6 characters"
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    className="w-full rounded-lg border border-border bg-white py-2.5 pl-9 pr-10 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                  </button>
                </div>
              </div>
            )}

            {/* Role selection — register only */}
            {showRoleField && (
              <div>
                <label className="mb-2 block text-xs font-medium text-muted-foreground">
                  I am a...
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {roleOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setRole(opt.value)}
                      className={cn(
                        "flex flex-col items-center gap-1 rounded-lg border px-3 py-3 text-center transition-all",
                        role === opt.value
                          ? "border-gold bg-gold/5 text-foreground ring-1 ring-gold"
                          : "border-border text-muted-foreground hover:border-gold/50 hover:bg-cream",
                      )}
                    >
                      <span className="text-sm font-semibold">{opt.label}</span>
                      <span className="text-[10px] leading-tight">{opt.description}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Remember me — login only */}
            {mode === "login" && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-gold focus:ring-gold accent-[#C9A96E]"
                />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
            )}

            {/* Error */}
            {error && (
              <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="shimmer-gold flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {submitLabel}
            </button>
          </form>
        )}

        {/* Magic link shortcut — login mode */}
        {mode === "login" && !success && (
          <button
            onClick={() => { setMode("magic-link"); setError(null); setSuccess(null); }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-cream hover:text-foreground"
          >
            <Wand2 className="h-4 w-4" />
            Sign in with magic link
          </button>
        )}

        {/* Mode switching */}
        <div className="mt-5 space-y-2 text-center text-sm text-muted-foreground">
          {mode === "login" && (
            <p>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => { setMode("register"); setError(null); setSuccess(null); }}
                className="font-medium text-gold hover:underline"
              >
                Sign up
              </button>
            </p>
          )}
          {mode === "register" && (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => { setMode("login"); setError(null); setSuccess(null); }}
                className="font-medium text-gold hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
          {(mode === "magic-link" || mode === "forgot-password") && (
            <p>
              <button
                onClick={() => { setMode("login"); setError(null); setSuccess(null); }}
                className="font-medium text-gold hover:underline"
              >
                Back to sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
