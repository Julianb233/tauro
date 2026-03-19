/**
 * Seed script: Create Exit Benchmark Realty user accounts in Supabase
 *
 * Uses the Supabase Admin API (service role key) to:
 * 1. Create auth users with email/password
 * 2. Create auth identities for email login
 * 3. Update auto-created profiles with correct roles
 * 4. Link agent profiles to their agents table record (by email match)
 *
 * NOTE: The GoTrue admin.createUser() endpoint returns 500 on this project
 * due to a trigger conflict. If that happens, use the Supabase Management API
 * (SQL endpoint) with SUPABASE_ACCESS_TOKEN instead:
 *
 *   curl -X POST "https://api.supabase.com/v1/projects/PROJECT_REF/database/query" \
 *     -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
 *     -H "Content-Type: application/json" \
 *     -d '{"query": "INSERT INTO auth.users ..."}'
 *
 * Usage: npx tsx scripts/seed-users.ts
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

interface UserSeed {
  email: string;
  password: string;
  full_name: string;
  role: "admin" | "agent" | "viewer";
}

const USERS: UserSeed[] = [
  // Admins
  {
    email: "tcupone@aol.com",
    password: "password",
    full_name: "Tony Goodman",
    role: "admin",
  },
  {
    email: "shaquonda@exitbenchmark.com",
    password: "password",
    full_name: "Shaquonda Garrett",
    role: "admin",
  },
  // Agents
  {
    email: "morris@exitbenchmark.com",
    password: "password",
    full_name: "Morris Brown",
    role: "agent",
  },
  {
    email: "stephen@exitbenchmark.com",
    password: "password",
    full_name: "Stephen Stevens",
    role: "agent",
  },
  {
    email: "chris@exitbenchmark.com",
    password: "password",
    full_name: "Chris Lane",
    role: "agent",
  },
];

async function seedUsers() {
  console.log("Seeding user accounts...\n");

  for (const user of USERS) {
    // 1. Check if user already exists
    const { data: existingList } = await supabase.auth.admin.listUsers();
    const existing = existingList?.users?.find((u) => u.email === user.email);

    let userId: string;

    if (existing) {
      console.log(`  [SKIP] ${user.email} already exists (id: ${existing.id})`);
      userId = existing.id;
    } else {
      // 2. Create auth user
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: { full_name: user.full_name },
      });

      if (error) {
        console.error(
          `  [ERROR] ${user.email}: ${error.message}`,
          JSON.stringify(error, null, 2),
        );
        console.error(
          "  -> If you see 'Database error creating new user', use the Management API approach (see header comment)",
        );
        continue;
      }

      userId = data.user.id;
      console.log(`  [CREATED] ${user.email} (id: ${userId})`);
    }

    // 3. Update profile with correct role and full_name
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        role: user.role,
        full_name: user.full_name,
      })
      .eq("id", userId);

    if (profileError) {
      console.error(
        `  [PROFILE ERROR] ${user.email}: ${profileError.message}`,
      );
    } else {
      console.log(`  [PROFILE] ${user.email} -> role: ${user.role}`);
    }

    // 4. Try to link profile to agents table record by email match
    const { data: agentMatch } = await supabase
      .from("agents")
      .select("id")
      .eq("email", user.email)
      .maybeSingle();

    if (agentMatch) {
      const { error: linkError } = await supabase
        .from("profiles")
        .update({ agent_id: agentMatch.id })
        .eq("id", userId);

      if (linkError) {
        console.error(`  [LINK ERROR] ${user.email}: ${linkError.message}`);
      } else {
        console.log(
          `  [LINKED] ${user.email} -> agent_id: ${agentMatch.id}`,
        );
      }
    }

    console.log("");
  }

  console.log("Done.");
}

seedUsers().catch(console.error);
