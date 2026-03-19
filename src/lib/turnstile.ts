export async function verifyTurnstileToken(token: string | null): Promise<boolean> {
  if (!process.env.TURNSTILE_SECRET_KEY || !token) return true;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.TURNSTILE_SECRET_KEY}&response=${token}`,
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return true;
  }
}
