import { createBrowserClient } from "@supabase/ssr";
import type { Database, ProfileRow, UserRole } from "@/types/database";
export type { ProfileRow, UserRole };

// ---------------------------------------------------------------------------
// Browser-side helpers (safe to call from "use client" components)
// ---------------------------------------------------------------------------

function getBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export async function signIn(email: string, password: string) {
  const supabase = getBrowserClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { user: data?.user ?? null, error };
}

export async function signUp(
  email: string,
  password: string,
  fullName: string,
  role?: string,
) {
  const supabase = getBrowserClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, role: role ?? "buyer" } },
  });
  return { user: data?.user ?? null, error };
}

export async function signOut() {
  const supabase = getBrowserClient();
  const { error } = await supabase.auth.signOut();
  return { error };
}

// ---------------------------------------------------------------------------
// Server-side helpers (only call from Server Components / Route Handlers)
// ---------------------------------------------------------------------------

async function getServerClient() {
  const { createClient } = await import("./server");
  return createClient();
}

export async function getSession() {
  const supabase = await getServerClient();
  if (!supabase) return null;

  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function getUserProfile(): Promise<ProfileRow | null> {
  const supabase = await getServerClient();
  if (!supabase) return null;

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile) {
    return profile as ProfileRow;
  }

  // Fallback: build profile from auth user metadata
  return {
    id: user.id,
    full_name:
      (user.user_metadata?.full_name as string) ||
      (user.user_metadata?.name as string) ||
      user.email?.split("@")[0] ||
      "User",
    email: user.email || "",
    role: ((user.user_metadata?.role as UserRole) || "agent") as UserRole,
    agent_id: null,
    avatar_url: (user.user_metadata?.avatar_url as string) || null,
    created_at: user.created_at,
    updated_at: user.updated_at ?? user.created_at,
  };
}

export async function getUserRole(): Promise<UserRole | null> {
  const profile = await getUserProfile();
  return profile?.role ?? null;
}
