"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Inbox,
  Building2,
  Users,
  Calendar,
  ExternalLink,
  X,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/lib/supabase/auth";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/dashboard/leads", icon: Inbox },
  { label: "Properties", href: "/dashboard/properties", icon: Building2 },
  { label: "Agents", href: "/dashboard/agents", icon: Users, adminOnly: true },
  { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
];

interface SidebarProps {
  currentPath: string;
  userRole: UserRole;
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ currentPath, userRole, open, onClose }: SidebarProps) {
  const isActive = (href: string) => {
    if (href === "/dashboard") return currentPath === "/dashboard";
    return currentPath.startsWith(href);
  };

  const filteredItems = navItems.filter(
    (item) => !item.adminOnly || userRole === "admin",
  );

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-60 flex-col border-r border-white/5 bg-[#111111] transition-transform duration-200 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-5 pt-6 pb-2">
          <Link href="/" className="flex flex-col gap-1">
            <Logo size="sm" variant="light" />
            <span className="font-label text-[10px] tracking-widest uppercase text-gold">
              Agent Portal
            </span>
          </Link>
          <button
            onClick={onClose}
            className="rounded p-1 text-off-white/40 hover:text-off-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1 space-y-1 px-3" aria-label="Dashboard navigation">
          {filteredItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "border-l-2 border-gold bg-gold/10 text-gold"
                    : "text-off-white/60 hover:bg-white/5 hover:text-off-white",
                )}
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-white/5 px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-off-white/40 hover:text-off-white/70 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Back to site
          </Link>
        </div>
      </aside>
    </>
  );
}
