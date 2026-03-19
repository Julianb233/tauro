// ---------------------------------------------------------------------------
// Daily Digest email template — admin morning summary of overnight leads
// Uses raw HTML strings (same pattern as other Tauro email templates)
// ---------------------------------------------------------------------------

export interface DailyDigestProps {
  date: string;
  totalLeads: number;
  leadsByType: {
    contact: number;
    showing: number;
    seller: number;
    agentApplication: number;
    agentContact: number;
  };
  recentLeads: Array<{
    name: string;
    email: string;
    type: string;
    createdAt: string;
  }>;
}

const TYPE_LABELS: Record<string, string> = {
  contact: "Contact Inquiries",
  showing: "Showing Requests",
  seller: "Seller Leads",
  "agent-application": "Agent Applications",
  "agent-contact": "Agent Messages",
};

const TYPE_DOT_COLORS: Record<string, string> = {
  contact: "#C9A84C",
  showing: "#4CAF50",
  seller: "#2196F3",
  "agent-application": "#FF9800",
  "agent-contact": "#9C27B0",
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderTypeBreakdown(leadsByType: DailyDigestProps["leadsByType"]): string {
  const entries: Array<{ key: string; label: string; count: number }> = [
    { key: "contact", label: "Contact Inquiries", count: leadsByType.contact },
    { key: "showing", label: "Showing Requests", count: leadsByType.showing },
    { key: "seller", label: "Seller Leads", count: leadsByType.seller },
    { key: "agent-application", label: "Agent Applications", count: leadsByType.agentApplication },
    { key: "agent-contact", label: "Agent Messages", count: leadsByType.agentContact },
  ].filter((e) => e.count > 0);

  if (entries.length === 0) return "";

  const rows = entries
    .map(
      (entry) => `
      <tr>
        <td style="padding:8px 0;color:#F5F0E8;font-size:14px;">
          <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${TYPE_DOT_COLORS[entry.key] || "#C9A84C"};margin-right:10px;vertical-align:middle;"></span>
          ${escapeHtml(entry.label)}
        </td>
        <td style="padding:8px 0;color:#C9A84C;font-size:16px;font-weight:600;text-align:right;">
          ${entry.count}
        </td>
      </tr>`,
    )
    .join("");

  return `
    <div style="margin-bottom:8px;color:#F5F0E8;font-size:18px;font-weight:600;">Breakdown</div>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
      ${rows}
    </table>`;
}

function renderRecentLeads(
  totalLeads: number,
  recentLeads: DailyDigestProps["recentLeads"],
): string {
  if (totalLeads === 0) {
    return `
      <div style="margin-bottom:8px;color:#F5F0E8;font-size:18px;font-weight:600;">Recent Leads</div>
      <p style="color:#F5F0E8;font-size:14px;opacity:0.7;font-style:italic;">
        No new leads in the last 24 hours. Quiet day!
      </p>`;
  }

  const items = recentLeads
    .map(
      (lead) => `
      <div style="background-color:#2A2A2A;border-radius:8px;padding:12px 16px;margin-bottom:8px;">
        <div style="margin-bottom:4px;">
          <span style="color:#F5F0E8;font-size:14px;font-weight:600;">${escapeHtml(lead.name)}</span>
          <span style="background-color:#C9A84C;color:#1A1A1A;font-size:11px;font-weight:600;padding:2px 8px;border-radius:4px;text-transform:uppercase;letter-spacing:0.5px;margin-left:8px;">
            ${escapeHtml(TYPE_LABELS[lead.type] || lead.type)}
          </span>
        </div>
        <div>
          <a href="mailto:${escapeHtml(lead.email)}" style="color:#C9A84C;font-size:13px;text-decoration:none;">${escapeHtml(lead.email)}</a>
          <span style="color:#F5F0E8;font-size:12px;opacity:0.6;float:right;">${escapeHtml(lead.createdAt)}</span>
        </div>
      </div>`,
    )
    .join("");

  return `
    <div style="margin-bottom:8px;color:#F5F0E8;font-size:18px;font-weight:600;">Recent Leads</div>
    ${items}`;
}

export function renderDailyDigest(props: DailyDigestProps): string {
  const { date, totalLeads, leadsByType, recentLeads } = props;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tauro Daily Digest - ${escapeHtml(date)}</title>
</head>
<body style="margin:0;padding:0;background-color:#1A1A1A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',sans-serif;">
  <!--[if mso]><table width="600" align="center"><tr><td><![endif]-->
  <div style="max-width:600px;margin:0 auto;">

    <!-- Header -->
    <div style="background-color:#222222;padding:24px 32px;border-bottom:2px solid #C9A84C;">
      <div style="color:#C9A84C;font-size:24px;font-weight:700;letter-spacing:4px;">TAURO</div>
    </div>

    <!-- Content -->
    <div style="background-color:#222222;padding:32px;">

      <!-- Title -->
      <div style="color:#F5F0E8;font-size:28px;font-weight:700;margin:0 0 4px;">Daily Digest</div>
      <div style="color:#C9A84C;font-size:16px;margin:0 0 24px;">${escapeHtml(date)}</div>

      <!-- Total Count -->
      <div style="text-align:center;padding:16px 0;">
        <div style="color:#C9A84C;font-size:48px;font-weight:700;line-height:1;">${totalLeads}</div>
        <div style="color:#F5F0E8;font-size:16px;margin-top:8px;opacity:0.8;">New Leads</div>
      </div>

      <!-- Divider -->
      <hr style="border:none;border-top:1px solid #333333;margin:24px 0;" />

      <!-- Type Breakdown -->
      ${renderTypeBreakdown(leadsByType)}

      <!-- Divider -->
      <hr style="border:none;border-top:1px solid #333333;margin:24px 0;" />

      <!-- Recent Leads -->
      ${renderRecentLeads(totalLeads, recentLeads)}

      <!-- Divider -->
      <hr style="border:none;border-top:1px solid #333333;margin:24px 0;" />

      <!-- CTA -->
      <div style="text-align:center;padding:8px 0;">
        <a href="https://taurorealty.com/dashboard/leads"
           style="background-color:#C9A84C;color:#1A1A1A;font-size:16px;font-weight:600;padding:14px 32px;border-radius:8px;text-decoration:none;display:inline-block;">
          View All Leads
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:24px 32px;text-align:center;">
      <div style="color:#F5F0E8;font-size:12px;opacity:0.5;margin:4px 0;">Tauro Realty Group | Miami, FL</div>
      <div style="color:#F5F0E8;font-size:12px;opacity:0.5;margin:4px 0;">This is an automated daily digest email.</div>
    </div>

  </div>
  <!--[if mso]></td></tr></table><![endif]-->
</body>
</html>`;
}
