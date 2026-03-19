"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { DashboardHeader } from "./header";
import type { UserRole } from "@/lib/supabase/auth";

interface DashboardShellProps {
  user: {
    fullName: string;
    email: string;
    role: UserRole;
    avatarUrl?: string | null;
  };
  children: React.ReactNode;
}

export function DashboardShell({ user, children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#141425] text-off-white">
      <Sidebar
        currentPath={pathname}
        userRole={user.role}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader
          user={user}
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        />

        <main id="main-content" className="flex-1 overflow-y-auto px-4 py-6 lg:px-8">
          <div className="mx-auto max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
