import { getUserProfile } from "@/lib/supabase/auth";
import { ShieldAlert } from "lucide-react";
import { AgentManager } from "./agent-manager";

export default async function AgentsPage() {
  const profile = await getUserProfile();

  if (!profile || profile.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <ShieldAlert className="mb-4 h-16 w-16 text-red-400/60" />
        <h1 className="text-xl font-bold text-off-white">Access Denied</h1>
        <p className="mt-2 text-sm text-off-white/50">
          Admin only. You do not have permission to view this page.
        </p>
        <a
          href="/dashboard"
          className="mt-6 rounded-lg bg-gold/20 px-5 py-2.5 text-sm font-medium text-gold hover:bg-gold/30 transition-colors"
        >
          Back to Dashboard
        </a>
      </div>
    );
  }

  return <AgentManager />;
}
