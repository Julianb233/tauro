import { Resend } from "resend";
import {
  renderLeadConfirmation,
  type LeadConfirmationProps,
} from "@/emails/lead-confirmation";
import {
  renderAgentNotification,
  type AgentNotificationProps,
} from "@/emails/agent-notification";
import {
  renderApplicationConfirmation,
  type ApplicationConfirmationProps,
} from "@/emails/application-confirmation";
import {
  renderDailyDigest,
  type DailyDigestProps,
} from "@/emails/daily-digest";
<<<<<<< HEAD
=======

>>>>>>> feat/12-03-daily-digest-cron

// ---------------------------------------------------------------------------
// Resend client — lazily initialized, gracefully degrades if no API key
// ---------------------------------------------------------------------------

let _resend: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — emails will be skipped");
    return null;
  }
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const EMAIL_FROM =
  process.env.EMAIL_FROM || "Tauro Realty <noreply@taurorealty.com>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@lylrealty.com";

export type EmailResult = { success: boolean; error?: string };

// ---------------------------------------------------------------------------
// sendLeadConfirmation — visitor receives branded confirmation
// ---------------------------------------------------------------------------

export async function sendLeadConfirmation(
  to: string,
  data: LeadConfirmationProps,
): Promise<EmailResult> {
  const client = getResend();
  if (!client) return { success: false, error: "Email client not configured" };

  try {
    const html = renderLeadConfirmation(data);
    await client.emails.send({
      from: EMAIL_FROM,
      to,
      subject: "Thank you for reaching out to Tauro Realty",
      html,
    });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[email] sendLeadConfirmation failed:", message);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// sendAgentNotification — agent gets lead alert with full details
// ---------------------------------------------------------------------------

export async function sendAgentNotification(
  to: string,
  data: AgentNotificationProps,
): Promise<EmailResult> {
  const client = getResend();
  if (!client) return { success: false, error: "Email client not configured" };

  try {
    const html = renderAgentNotification(data);
    await client.emails.send({
      from: EMAIL_FROM,
      to,
      subject: `New ${data.leadType} lead: ${data.leadName}`,
      html,
    });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[email] sendAgentNotification failed:", message);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// sendApplicationConfirmation — realtor applicant acknowledgment
// ---------------------------------------------------------------------------

export async function sendApplicationConfirmation(
  to: string,
  data: ApplicationConfirmationProps,
): Promise<EmailResult> {
  const client = getResend();
  if (!client) return { success: false, error: "Email client not configured" };

  try {
    const html = renderApplicationConfirmation(data);
    await client.emails.send({
      from: EMAIL_FROM,
      to,
      subject: "Your Tauro Realty application has been received",
      html,
    });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[email] sendApplicationConfirmation failed:", message);
    return { success: false, error: message };
  }
}

<<<<<<< HEAD
// ---------------------------------------------------------------------------
// sendDailyDigest — admin receives daily lead summary
// ---------------------------------------------------------------------------

export type DailyDigestData = DailyDigestProps;

export async function sendDailyDigest(data: DailyDigestData): Promise<EmailResult> {
=======

// ---------------------------------------------------------------------------
// sendDailyDigest — admin morning summary of overnight lead activity
// ---------------------------------------------------------------------------

export async function sendDailyDigest(
  data: DailyDigestProps,
): Promise<EmailResult> {
>>>>>>> feat/12-03-daily-digest-cron
  const client = getResend();
  if (!client) return { success: false, error: "Email client not configured" };

  try {
    const html = renderDailyDigest(data);
    await client.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
<<<<<<< HEAD
      subject: `Daily Lead Digest - ${data.date} (${data.totalLeads} leads)`,
=======
      subject: \`Tauro Daily Digest - \${data.date}\`,
>>>>>>> feat/12-03-daily-digest-cron
      html,
    });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[email] sendDailyDigest failed:", message);
    return { success: false, error: message };
  }
}

export { ADMIN_EMAIL, EMAIL_FROM };
