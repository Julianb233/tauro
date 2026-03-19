"use client";

import { Menu, Bell, LogOut } from "lucide-react";
import type { UserRole } from "@/lib/supabase/auth";

interface DashboardHeaderProps {
  user: {
    fullName: string;
    email: string;
    role: UserRole;
    avatarUrl?: string | null;
  };
  onMenuToggle: () => void;
}

export function DashboardHeader({ user, onMenuToggle }: DashboardHeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-white/5 bg-[#111111] px-4 lg:px-8">
      <button
        onClick={onMenuToggle}
        className="rounded p-1.5 text-off-white/40 hover:text-off-white lg:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-4">
        <button
          className="rounded-lg p-2 text-off-white/40 hover:bg-white/5 hover:text-off-white transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="h-8 w-8 rounded-full object-cover ring-2 ring-gold/20"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
              {user.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
          )}
          <div className="hidden md:block">
            <p className="text-sm font-medium text-off-white">
              {user.fullName}
            </p>
            <p className="text-[10px] uppercase tracking-wider text-off-white/40">
              {user.role}
            </p>
          </div>
        </div>

        <a
          href="/api/auth/signout"
          className="rounded-lg p-2 text-off-white/40 hover:bg-white/5 hover:text-off-white transition-colors"
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}
