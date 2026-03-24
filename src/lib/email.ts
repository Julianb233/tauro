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
import {
  renderNewsletterConfirmation,
  type NewsletterConfirmationProps,
} from "@/emails/newsletter-confirmation";
import {
  renderNewsletterWelcome,
  type NewsletterWelcomeProps,
} from "@/emails/newsletter-welcome";
import {
  renderMonthlyNewsletter,
  type MonthlyNewsletterProps,
} from "@/emails/monthly-newsletter";
import {
  renderShareProperty,
  type SharePropertyProps,
} from "@/emails/share-property";

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

// ---------------------------------------------------------------------------
// sendDailyDigest — admin morning summary of overnight lead activity
// ---------------------------------------------------------------------------

export type DailyDigestData = DailyDigestProps;

export async function sendDailyDigest(data: DailyDigestProps): Promise<EmailResult> {
  const client = getResend();
  if (!client) return { success: false, error: "Email client not configured" };

  try {
    const html = renderDailyDigest(data);
    await client.emails.send({
      from: EMAIL_FROM,
      to: ADMIN_EMAIL,
      subject: `Daily Lead Digest - ${data.date} (${data.totalLeads} leads)`,
      html,
    });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[email] sendDailyDigest failed:", message);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// sendNewsletterConfirmation — double opt-in confirmation email
// ---------------------------------------------------------------------------

export async function sendNewsletterConfirmation(
  to: string,
  data: NewsletterConfirmationProps,
): Promise<EmailResult> {
  const client = getResend();
  if (!client) return { success: false, error: "Email client not configured" };

  try {
    const html = renderNewsletterConfirmation(data);
    await client.emails.send({
      from: EMAIL_FROM,
      to,
      subject: "Confirm your Tauro Realty newsletter subscription",
      html,
    });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[email] sendNewsletterConfirmation failed:", message);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// sendNewsletterWelcome — sent after subscriber confirms email
// ---------------------------------------------------------------------------

export async function sendNewsletterWelcome(
  to: string,
  data: NewsletterWelcomeProps,
): Promise<EmailResult> {
  const client = getResend();
  if (!client) return { success: false, error: "Email client not configured" };

  try {
    const html = renderNewsletterWelcome(data);
    await client.emails.send({
      from: EMAIL_FROM,
      to,
      subject: "Welcome to the Tauro Realty Newsletter",
      html,
    });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[email] sendNewsletterWelcome failed:", message);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// sendMonthlyNewsletter — curated monthly real estate digest
// ---------------------------------------------------------------------------

export async function sendMonthlyNewsletter(
  to: string,
  data: MonthlyNewsletterProps,
): Promise<EmailResult> {
  const client = getResend();
  if (!client) return { success: false, error: "Email client not configured" };

  try {
    const html = renderMonthlyNewsletter(data);
    const { month, year } = data;
    await client.emails.send({
      from: EMAIL_FROM,
      to,
      subject: `Tauro Realty - ${month} ${year} Philadelphia Real Estate Update`,
      html,
    });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[email] sendMonthlyNewsletter failed:", message);
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// sendShareProperty — email a property listing to a friend
// ---------------------------------------------------------------------------

export async function sendShareProperty(
  to: string,
  data: SharePropertyProps,
): Promise<EmailResult> {
  const client = getResend();
  if (!client) return { success: false, error: "Email client not configured" };

  try {
    const html = renderShareProperty(data);
    await client.emails.send({
      from: EMAIL_FROM,
      to,
      subject: `${data.senderName} shared a property with you — ${data.propertyTitle}`,
      html,
    });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[email] sendShareProperty failed:", message);
    return { success: false, error: message };
  }
}

export { ADMIN_EMAIL, EMAIL_FROM };
