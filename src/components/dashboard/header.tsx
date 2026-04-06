"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, LogOut, ChevronDown } from "lucide-react";
import { signOut } from "@/lib/supabase/auth";
import type { UserRole } from "@/lib/supabase/auth";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  user: {
    fullName: string;
    email: string;
    role: UserRole;
    avatarUrl?: string | null;
  };
  onMenuToggle: () => void;
}

const roleBadgeColors: Record<UserRole, string> = {
  admin: "bg-gold/20 text-gold",
  agent: "bg-blue-500/20 text-blue-400",
  viewer: "bg-white/10 text-white/80",
  buyer: "bg-emerald-500/20 text-emerald-400",
  seller: "bg-purple-500/20 text-purple-400",
};

export function DashboardHeader({ user, onMenuToggle }: DashboardHeaderProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initials = user.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = useCallback(async () => {
    await signOut();
    router.push("/login");
  }, [router]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  return (
    <header className="flex h-14 items-center justify-between border-b border-gold/10 px-4 lg:px-6">
      {/* Left: hamburger (mobile) + page title area */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="rounded p-1.5 text-off-white/60 hover:bg-white/5 hover:text-off-white lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-label text-xs tracking-wider uppercase text-off-white/40 hidden sm:inline">
          Dashboard
        </span>
      </div>

      {/* Right: user dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/5 transition-colors"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              className="h-8 w-8 rounded-full border-2 border-gold object-cover"
            />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gold bg-gold/10 text-xs font-bold text-gold">
              {initials}
            </span>
          )}
          <span className="hidden text-sm font-medium text-off-white sm:inline">
            {user.fullName}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-off-white/40 transition-transform",
              dropdownOpen && "rotate-180",
            )}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-1 w-56 rounded-lg border border-white/10 bg-[#1A1A2E] p-2 shadow-xl z-50">
            <div className="px-3 py-2">
              <p className="text-sm font-semibold text-off-white">{user.fullName}</p>
              <p className="text-xs text-off-white/50">{user.email}</p>
              <span
                className={cn(
                  "mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                  roleBadgeColors[user.role],
                )}
              >
                {user.role}
              </span>
            </div>
            <div className="my-1 h-px bg-white/10" />
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
