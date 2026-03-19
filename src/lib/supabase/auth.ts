import { createClient } from "./server";
import { createClient as createBrowserClient } from "./client";

export type UserRole = "admin" | "agent" | "viewer";

export interface ProfileRow {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  avatar_url: string | null;
}

/**
 * Server-side: get the current authenticated user's profile.
 * Returns null when Supabase is not configured or the user is not logged in.
 */
export async function getUserProfile(): Promise<ProfileRow | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return null;

  // Try to fetch from a profiles table; if it doesn't exist, fall back to auth metadata
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, email, role, avatar_url")
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
    role: (user.user_metadata?.role as UserRole) || "agent",
    avatar_url: (user.user_metadata?.avatar_url as string) || null,
  };
}

/**
 * Client-side: sign out the current user.
 */
export async function signOut() {
  const supabase = createBrowserClient();
  await supabase.auth.signOut();
}
