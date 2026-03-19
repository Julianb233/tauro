// ---------------------------------------------------------------------------
// Server-side Cloudflare Turnstile token verification
// ---------------------------------------------------------------------------

const VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface TurnstileResult {
  success: boolean;
  error?: string;
}

/**
 * Verify a Turnstile CAPTCHA token server-side.
 * Returns { success: true } when valid, or { success: false, error } otherwise.
 *
 * If TURNSTILE_SECRET_KEY is not set, returns success (graceful skip for dev).
 */
export async function verifyTurnstileToken(
  token: string | undefined,
  remoteIp: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Graceful skip when not configured (dev mode)
  if (!secret) {
    return { success: true };
  }

  if (!token) {
    return { success: false, error: "CAPTCHA verification required" };
  }

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
        remoteip: remoteIp,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      return { success: false, error: "CAPTCHA verification failed" };
    }

    return { success: true };
  } catch {
    return { success: false, error: "CAPTCHA verification error" };
  }
}
