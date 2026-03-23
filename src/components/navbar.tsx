"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { Menu, X, Phone, UserCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScrolled } from "@/hooks/use-scrolled";
import { AuthModal, getStoredUser, clearStoredUser, type StoredUser } from "@/components/AuthModal";

// Reactive auth state via useSyncExternalStore
const authListeners = new Set<() => void>();
function subscribeAuth(cb: () => void) {
  authListeners.add(cb);
  const handler = () => authListeners.forEach((l) => l());
  window.addEventListener("tauro-auth-change", handler);
  return () => {
    authListeners.delete(cb);
    window.removeEventListener("tauro-auth-change", handler);
  };
}
function getAuthSnapshot(): StoredUser | null {
  return getStoredUser();
}
function getAuthServerSnapshot(): StoredUser | null {
  return null;
}

const navLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/agents", label: "Agents" },
  { href: "/sell", label: "Sell" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const scrolled = useScrolled();
  const user = useSyncExternalStore(subscribeAuth, getAuthSnapshot, getAuthServerSnapshot);

  const handleSignOut = useCallback(() => {
    clearStoredUser();
    window.dispatchEvent(new Event("tauro-auth-change"));
  }, []);

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
            ? "border-b border-border/40 bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo size="sm" variant={scrolled ? "dark" : "light"} />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 font-label text-sm font-medium tracking-wide transition-all duration-300 hover:text-gold",
                    scrolled ? "text-foreground/70" : "text-white/80"
                  )}
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
              className={cn(
                "flex items-center gap-1.5 text-sm transition-all duration-300 hover:text-gold",
                scrolled ? "text-muted-foreground" : "text-white/70"
              )}
            >
              <Phone className="size-4" />
              <span>(215) 839-4172</span>
            </a>

            {user ? (
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-sm font-medium transition-all duration-300",
                    scrolled ? "text-foreground" : "text-white/90",
                  )}
                >
                  {user.name}
                </span>
                <button
                  onClick={handleSignOut}
                  className={cn(
                    "rounded-md p-1.5 transition-all duration-300 hover:text-gold",
                    scrolled ? "text-muted-foreground" : "text-white/70",
                  )}
                  aria-label="Sign out"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-gold",
                  scrolled ? "text-foreground/70" : "text-white/80",
                )}
              >
                <UserCircle className="size-4" />
                Sign In
              </button>
            )}

            <Link
              href="/contact"
              className={cn(
                "shimmer-gold inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-label uppercase tracking-wide transition-all duration-300",
                scrolled
                  ? "bg-foreground text-white hover:bg-gold hover:text-white"
                  : "bg-gold px-4 py-2 text-near-black hover:bg-gold-light"
              )}
            >
              Schedule a Showing
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className={cn(
              "rounded-md p-2.5 lg:hidden",
              scrolled ? "text-foreground" : "text-white"
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

      {/* Full-screen mobile overlay — kept dark for dramatic contrast */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-midnight/95 backdrop-blur-xl lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Overlay header with logo and close button */}
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <Logo size="sm" variant="light" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="rounded-md p-2 text-white/70 hover:text-white"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Centered navigation links */}
          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-heading text-3xl font-bold text-off-white transition-colors hover:text-gold"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bottom section with CTA, auth, and phone */}
          <div className="flex flex-col items-center gap-4 border-t border-white/10 px-4 py-8">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-white/90">
                  {user.name}
                </span>
                <button
                  onClick={() => { handleSignOut(); setMobileOpen(false); }}
                  className="text-sm text-white/60 hover:text-gold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                className="flex items-center gap-2 text-sm font-medium text-white/80 hover:text-gold"
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
              className="flex items-center gap-2 text-sm text-white/60 hover:text-gold"
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
