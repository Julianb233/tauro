// Lead Confirmation Email Template
// Sent to visitors after they submit a lead form

export interface LeadConfirmationProps {
  firstName: string;
  type: string;
  message?: string;
}

const bodyByType: Record<string, string> = {
  contact:
    "We've received your inquiry and a member of our team will be in touch within 24 hours.",
  showing:
    "Your showing request has been received. Our team will confirm your appointment shortly.",
  seller:
    "Thank you for your interest in listing with Tauro. A listing specialist will contact you to discuss your home's value.",
  "agent-contact":
    "Your message has been sent to the agent. They'll respond as soon as possible.",
};

export function renderLeadConfirmation({
  firstName,
  type,
  message,
}: LeadConfirmationProps): string {
  const bodyText = bodyByType[type] || bodyByType.contact;

  const messageBlock = message
    ? `<div style="background:#1A1A1A;border-left:4px solid #C9A84C;padding:16px 20px;margin:24px 0;border-radius:0 4px 4px 0;">
        <p style="color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:14px;line-height:1.6;margin:0;font-style:italic;">"${message}"</p>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Thank you for reaching out to Tauro Realty</title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!--<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#1A1A1A;font-family:'DM Sans',Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">Thank you for reaching out to Tauro Realty</div>
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
              <h2 style="margin:0 0 16px;font-family:Georgia,'Playfair Display',serif;color:#F5F0E8;font-size:22px;font-weight:600;">Thank You, ${firstName}</h2>
              <p style="margin:0 0 20px;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:16px;line-height:1.6;">${bodyText}</p>
              ${messageBlock}
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:32px 0 0;">
                <tr>
                  <td style="background-color:#C9A84C;border-radius:6px;">
                    <a href="https://taurorealty.com" style="display:inline-block;padding:12px 28px;color:#1A1A1A;font-family:'DM Sans',Arial,sans-serif;font-size:14px;font-weight:600;text-decoration:none;">Visit Tauro Realty</a>
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
              <p style="margin:8px 0 0;color:#666666;font-family:'DM Sans',Arial,sans-serif;font-size:11px;">You received this email because you submitted an inquiry on our website.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default renderLeadConfirmation;
