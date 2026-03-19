// Agent Notification Email Template
// Sent to agents when a new lead is assigned to them

export interface AgentNotificationProps {
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  leadType: string;
  message?: string;
  propertyAddress?: string;
}

export function renderAgentNotification({
  leadName,
  leadEmail,
  leadPhone,
  leadType,
  message,
  propertyAddress,
}: AgentNotificationProps): string {
  const messageBlock = message
    ? `<div style="background:#1A1A1A;border-left:4px solid #C9A84C;padding:16px 20px;margin:24px 0;border-radius:0 4px 4px 0;">
        <p style="color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:14px;line-height:1.6;margin:0;font-style:italic;">"${message}"</p>
      </div>`
    : "";

  const propertyRow = propertyAddress
    ? `<p style="margin:8px 0;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:14px;line-height:1.6;">
        <span style="color:#999999;display:inline-block;width:80px;">Property:</span>
        <span>${propertyAddress}</span>
      </p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>New ${leadType} lead: ${leadName}</title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!--<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#1A1A1A;font-family:'DM Sans',Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">New ${leadType} lead: ${leadName}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1A1A1A;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#222222;border-radius:8px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="border-top:4px solid #C9A84C;padding:40px 40px 20px;text-align:center;">
              <h1 style="margin:0;font-family:Georgia,'Playfair Display',serif;color:#C9A84C;font-size:28px;letter-spacing:4px;font-weight:700;">TAURO</h1>
              <p style="margin:8px 0 0;font-family:'DM Sans',Arial,sans-serif;color:#999999;font-size:12px;letter-spacing:1px;">LYL Realty Group</p>
            </td>
          </tr>
          <!-- Divider -->
          <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #333333;margin:0;" /></td></tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <h2 style="margin:0 0 16px;font-family:Georgia,'Playfair Display',serif;color:#F5F0E8;font-size:22px;font-weight:600;">New Lead Alert</h2>
              <div style="display:inline-block;background-color:#C9A84C;color:#1A1A1A;padding:4px 12px;border-radius:4px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:24px;">${leadType}</div>
              <div style="background:#1A1A1A;border-radius:6px;padding:20px;margin:20px 0;">
                <p style="margin:8px 0;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:14px;line-height:1.6;">
                  <span style="color:#999999;display:inline-block;width:80px;">Name:</span>
                  <span style="font-weight:600;">${leadName}</span>
                </p>
                <p style="margin:8px 0;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:14px;line-height:1.6;">
                  <span style="color:#999999;display:inline-block;width:80px;">Email:</span>
                  <a href="mailto:${leadEmail}" style="color:#C9A84C;text-decoration:none;">${leadEmail}</a>
                </p>
                <p style="margin:8px 0;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:14px;line-height:1.6;">
                  <span style="color:#999999;display:inline-block;width:80px;">Phone:</span>
                  <a href="tel:${leadPhone}" style="color:#C9A84C;text-decoration:none;">${leadPhone}</a>
                </p>
                ${propertyRow}
              </div>
              ${messageBlock}
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:32px 0 0;">
                <tr>
                  <td style="background-color:#C9A84C;border-radius:6px;">
                    <a href="https://taurorealty.com/dashboard/leads" style="display:inline-block;padding:12px 28px;color:#1A1A1A;font-family:'DM Sans',Arial,sans-serif;font-size:14px;font-weight:600;text-decoration:none;">View in Dashboard</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #333333;margin:0;" /></td></tr>
          <tr>
            <td style="padding:24px 40px 40px;text-align:center;">
              <p style="margin:0;color:#666666;font-family:'DM Sans',Arial,sans-serif;font-size:12px;line-height:1.6;">Tauro Realty | Philadelphia, PA</p>
              <p style="margin:8px 0 0;color:#666666;font-family:'DM Sans',Arial,sans-serif;font-size:11px;">This is an automated notification from the Tauro lead management system.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default renderAgentNotification;
