"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Phone, UserCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScrolled } from "@/hooks/use-scrolled";
import { AuthModal } from "@/components/AuthModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/agents", label: "Agents" },
  { href: "/sell", label: "Sell" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const scrolled = useScrolled();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      setUser(u);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const displayName = user?.user_metadata?.full_name
    || user?.user_metadata?.name
    || user?.email?.split("@")[0]
    || "User";

  const handleSignOut = useCallback(async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  }, [router]);

  // Escape key closes overlay
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-white/10 bg-midnight/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.15)]"
            : "bg-transparent"
        )}
      >
        <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2">
            <Logo size="sm" variant="light" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link-underline rounded-md px-3 py-2 font-label text-sm font-medium tracking-wide text-white transition-all duration-300 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+12158394172"
              className="flex items-center gap-1.5 rounded-md text-sm text-white transition-all duration-300 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2"
            >
              <Phone className="size-4" />
              <span>(215) 839-4172</span>
            </a>

            <ThemeToggle className="text-white" />

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-white transition-all duration-300 hover:text-gold"
                >
                  {displayName}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="rounded-md p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white transition-all duration-300 hover:text-gold"
                  aria-label="Sign out"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-white transition-all duration-300 hover:text-gold"
              >
                <UserCircle className="size-4" />
                Sign In
              </button>
            )}

            <Link
              href="/contact"
              className="shimmer-gold inline-flex items-center justify-center rounded-lg bg-gold px-4 py-2 text-sm font-label uppercase tracking-wide text-near-black transition-all duration-300 hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2"
            >
              Schedule a Showing
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className={cn(
              "rounded-md p-2.5 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2",
              scrolled ? "text-white" : "text-white"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </nav>
      </header>

      {/* Full-screen mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-midnight/95 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <Logo size="sm" variant="light" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="rounded-md p-2 text-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
            >
              <X className="size-6" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md font-heading text-3xl font-bold text-off-white transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-center gap-4 border-t border-white/10 px-4 py-8">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-white hover:text-gold"
                  onClick={() => setMobileOpen(false)}
                >
                  {displayName}
                </Link>
                <button
                  onClick={() => { handleSignOut(); setMobileOpen(false); }}
                  className="text-sm text-white hover:text-gold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                className="flex items-center gap-2 text-sm font-medium text-white hover:text-gold"
              >
                <UserCircle className="size-5" />
                Sign In / Register
              </button>
            )}
            <Link
              href="/contact"
              className="shimmer-gold rounded-md bg-gold px-8 py-3 font-label text-lg font-semibold text-near-black transition-colors hover:bg-gold-light"
              onClick={() => setMobileOpen(false)}
            >
              Schedule a Showing
            </Link>
            <a
              href="tel:+12158394172"
              className="flex items-center gap-2 text-sm text-white hover:text-gold"
            >
              <Phone className="size-4" />
              (215) 839-4172
            </a>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
