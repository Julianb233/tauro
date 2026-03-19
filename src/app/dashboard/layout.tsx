import { getUserProfile } from "@/lib/supabase/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata = {
  title: "Agent Dashboard",
  description:
    "Manage your Tauro Realty listings, leads, and client activity from your personalized agent dashboard.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getUserProfile();

  const user = profile
    ? {
        fullName: profile.full_name,
        email: profile.email,
        role: profile.role,
        avatarUrl: profile.avatar_url,
      }
    : {
        fullName: "Saraha Founder",
        email: "founder@saraha.com",
        role: "admin" as const,
        avatarUrl: null,
      };

  return (
    <DashboardShell user={user}>
      {children}
    </DashboardShell>
  );
}
