// Newsletter Double Opt-In Confirmation Email
// Sent when a visitor subscribes to confirm their email address

export interface NewsletterConfirmationProps {
  firstName: string;
  confirmUrl: string;
}

export function renderNewsletterConfirmation({
  firstName,
  confirmUrl,
}: NewsletterConfirmationProps): string {
  const greeting = firstName ? `Hi ${firstName},` : "Hi there,";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Confirm your subscription - Tauro Realty</title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!--<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#1A1A1A;font-family:'DM Sans',Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">Confirm your subscription to Tauro Realty's newsletter</div>
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
              <h2 style="margin:0 0 16px;font-family:Georgia,'Playfair Display',serif;color:#F5F0E8;font-size:22px;font-weight:600;">Confirm Your Subscription</h2>
              <p style="margin:0 0 20px;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:16px;line-height:1.6;">${greeting}</p>
              <p style="margin:0 0 20px;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:16px;line-height:1.6;">Thanks for signing up for the Tauro Realty newsletter. Please confirm your email address to start receiving Philadelphia real estate insights, new listings, and market reports.</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:32px 0;">
                <tr>
                  <td style="background-color:#C9A84C;border-radius:6px;">
                    <a href="${confirmUrl}" style="display:inline-block;padding:14px 32px;color:#1A1A1A;font-family:'DM Sans',Arial,sans-serif;font-size:15px;font-weight:600;text-decoration:none;">Confirm My Subscription</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;color:#999999;font-family:'DM Sans',Arial,sans-serif;font-size:13px;line-height:1.6;">If you didn't sign up for this newsletter, you can safely ignore this email.</p>
              <p style="margin:12px 0 0;color:#666666;font-family:'DM Sans',Arial,sans-serif;font-size:12px;line-height:1.6;">This link will expire in 48 hours.</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #333333;margin:0;" /></td></tr>
          <tr>
            <td style="padding:24px 40px 40px;text-align:center;">
              <p style="margin:0;color:#666666;font-family:'DM Sans',Arial,sans-serif;font-size:12px;line-height:1.6;">Tauro Realty | Philadelphia, PA</p>
              <p style="margin:8px 0 0;color:#666666;font-family:'DM Sans',Arial,sans-serif;font-size:11px;">You received this email because you signed up for our newsletter.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default renderNewsletterConfirmation;
