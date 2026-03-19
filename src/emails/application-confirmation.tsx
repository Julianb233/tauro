// Application Confirmation Email Template
// Sent to realtor applicants after they submit their application

export interface ApplicationConfirmationProps {
  firstName: string;
  licenseNumber?: string;
}

export function renderApplicationConfirmation({
  firstName,
  licenseNumber,
}: ApplicationConfirmationProps): string {
  const licenseNote = licenseNumber
    ? `<p style="margin:16px 0 0;color:#C9A84C;font-family:'DM Sans',Arial,sans-serif;font-size:14px;line-height:1.6;">License #${licenseNumber} has been noted.</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Your Tauro Realty application has been received</title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!--<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#1A1A1A;font-family:'DM Sans',Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">Your Tauro Realty application has been received</div>
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
              <h2 style="margin:0 0 16px;font-family:Georgia,'Playfair Display',serif;color:#F5F0E8;font-size:22px;font-weight:600;">Application Received</h2>
              <p style="margin:0 0 8px;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:16px;line-height:1.6;">Thank you for your interest in joining Tauro Realty, ${firstName}. We've received your application and our team will review it carefully.</p>
              ${licenseNote}
              <div style="margin:32px 0;">
                <h3 style="margin:0 0 16px;color:#C9A84C;font-family:Georgia,'Playfair Display',serif;font-size:16px;font-weight:600;">What Happens Next</h3>
                <div style="background:#1A1A1A;border-radius:6px;padding:20px;">
                  <p style="margin:0 0 12px;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:14px;line-height:1.6;">
                    <span style="color:#C9A84C;font-weight:600;">1.</span> Our team will review your application within 3-5 business days
                  </p>
                  <p style="margin:0 0 12px;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:14px;line-height:1.6;">
                    <span style="color:#C9A84C;font-weight:600;">2.</span> If selected, we'll schedule a brief introductory call
                  </p>
                  <p style="margin:0;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:14px;line-height:1.6;">
                    <span style="color:#C9A84C;font-weight:600;">3.</span> Discuss commission structure, tools, and growth opportunities
                  </p>
                </div>
              </div>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:32px 0 0;">
                <tr>
                  <td style="background-color:#C9A84C;border-radius:6px;">
                    <a href="https://taurorealty.com/join" style="display:inline-block;padding:12px 28px;color:#1A1A1A;font-family:'DM Sans',Arial,sans-serif;font-size:14px;font-weight:600;text-decoration:none;">Learn More About Tauro</a>
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
              <p style="margin:8px 0 0;color:#666666;font-family:'DM Sans',Arial,sans-serif;font-size:11px;">You received this email because you submitted an application on our website.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default renderApplicationConfirmation;
