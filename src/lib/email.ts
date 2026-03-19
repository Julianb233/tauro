import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Resend client — lazily initialized, gracefully degrades if no API key
// ---------------------------------------------------------------------------

let resend: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — emails will be skipped");
    return null;
  }
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

const FROM_EMAIL = process.env.FROM_EMAIL || "Tauro Realty <noreply@lylrealty.com>";

type EmailResult = { success: boolean; error?: string };

// ---------------------------------------------------------------------------
// sendLeadConfirmation — visitor receives branded confirmation
// ---------------------------------------------------------------------------

export async function sendLeadConfirmation(
  to: string,
  details: { firstName: string; type: string; message?: string },
): Promise<EmailResult> {
  const client = getResend();
  if (!client) return { success: false, error: "Email client not configured" };

  try {
    const subjectMap: Record<string, string> = {
      contact: "We received your message",
      showing: "Your showing request is confirmed",
      seller: "Your home valuation request is confirmed",
      "agent-contact": "We received your message",
    };

    const subject = subjectMap[details.type] || "Thank you for contacting Tauro Realty";

    await client.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a2e;">Thank you, ${details.firstName}!</h2>
          <p>We've received your ${details.type === "showing" ? "showing request" : details.type === "seller" ? "home valuation request" : "message"} and a member of our team will be in touch shortly.</p>
          ${details.message ? `<p style="color: #666; border-left: 3px solid #ddd; padding-left: 12px;">${details.message}</p>` : ""}
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #999; font-size: 12px;">Tauro Realty — Powered by LYL Realty</p>
        </div>
      `,
    });

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("sendLeadConfirmation error:", message);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// sendAgentNotification — agent (or admin fallback) gets lead alert
// ---------------------------------------------------------------------------

export async function sendAgentNotification(
  to: string,
  details: {
    leadName: string;
    leadEmail: string;
    leadPhone: string;
    leadType: string;
    message?: string;
    propertyAddress?: string;
  },
): Promise<EmailResult> {
  const client = getResend();
  if (!client) return { success: false, error: "Email client not configured" };

  try {
    await client.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `New ${details.leadType} lead: ${details.leadName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a2e;">New Lead Notification</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Name</td><td style="padding: 8px;">${details.leadName}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Email</td><td style="padding: 8px;"><a href="mailto:${details.leadEmail}">${details.leadEmail}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Phone</td><td style="padding: 8px;"><a href="tel:${details.leadPhone}">${details.leadPhone}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Type</td><td style="padding: 8px;">${details.leadType}</td></tr>
            ${details.propertyAddress ? `<tr><td style="padding: 8px; font-weight: bold;">Property</td><td style="padding: 8px;">${details.propertyAddress}</td></tr>` : ""}
          </table>
          ${details.message ? `<p style="margin-top: 16px; color: #666; border-left: 3px solid #ddd; padding-left: 12px;">${details.message}</p>` : ""}
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #999; font-size: 12px;">Tauro Realty — Lead Notification System</p>
        </div>
      `,
    });

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("sendAgentNotification error:", message);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// sendApplicationConfirmation — realtor applicant acknowledgment
// ---------------------------------------------------------------------------

export async function sendApplicationConfirmation(
  to: string,
  details: { firstName: string; licenseNumber?: string },
): Promise<EmailResult> {
  const client = getResend();
  if (!client) return { success: false, error: "Email client not configured" };

  try {
    await client.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Your agent application has been received",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a2e;">Welcome, ${details.firstName}!</h2>
          <p>Thank you for applying to join the Tauro Realty team. We've received your application${details.licenseNumber ? ` (License #${details.licenseNumber})` : ""} and our team will review it within 2-3 business days.</p>
          <p>We'll be in touch with next steps soon.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #999; font-size: 12px;">Tauro Realty — Powered by LYL Realty</p>
        </div>
      `,
    });

    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("sendApplicationConfirmation error:", message);
    return { success: false, error: message };
  }
}
