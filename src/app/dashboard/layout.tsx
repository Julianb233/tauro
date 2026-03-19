import { redirect } from "next/navigation";
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

  if (!profile) {
    redirect("/login");
  }

  return (
    <DashboardShell
      user={{
        fullName: profile.full_name,
        email: profile.email,
        role: profile.role,
        avatarUrl: profile.avatar_url,
      }}
    >
      {children}
    </DashboardShell>
  );
}
