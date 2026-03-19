// Newsletter Welcome Email
// Sent after subscriber confirms their email (double opt-in complete)

export interface NewsletterWelcomeProps {
  firstName: string;
  interests: string[];
  unsubscribeUrl: string;
}

const interestLabels: Record<string, string> = {
  "new-listings": "New Listings",
  "market-reports": "Market Reports",
  "neighborhood-guides": "Neighborhood Guides",
};

export function renderNewsletterWelcome({
  firstName,
  interests,
  unsubscribeUrl,
}: NewsletterWelcomeProps): string {
  const greeting = firstName ? `Welcome, ${firstName}!` : "Welcome!";
  const interestsList = interests
    .map((i) => interestLabels[i] || i)
    .map((label) => `<li style="margin:4px 0;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:14px;">${label}</li>`)
    .join("");

  const interestsBlock = interests.length > 0
    ? `<div style="background:#1A1A1A;border-left:4px solid #C9A84C;padding:16px 20px;margin:24px 0;border-radius:0 4px 4px 0;">
        <p style="margin:0 0 8px;color:#C9A84C;font-family:'DM Sans',Arial,sans-serif;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Your interests</p>
        <ul style="margin:0;padding:0 0 0 20px;">${interestsList}</ul>
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Welcome to the Tauro Realty Newsletter</title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!--<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#1A1A1A;font-family:'DM Sans',Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">Welcome to the Tauro Realty newsletter - Philadelphia real estate insights delivered monthly.</div>
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
              <h2 style="margin:0 0 16px;font-family:Georgia,'Playfair Display',serif;color:#F5F0E8;font-size:22px;font-weight:600;">${greeting}</h2>
              <p style="margin:0 0 20px;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:16px;line-height:1.6;">Your subscription is confirmed. You'll now receive monthly updates about Philadelphia real estate, including curated listings, market data, and neighborhood insights.</p>
              ${interestsBlock}
              <p style="margin:20px 0;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:15px;line-height:1.6;">Here's what you can expect:</p>
              <ul style="margin:0 0 20px;padding:0 0 0 20px;">
                <li style="margin:8px 0;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:14px;line-height:1.5;">Hand-picked featured listings from Philadelphia's top neighborhoods</li>
                <li style="margin:8px 0;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:14px;line-height:1.5;">Monthly market reports with pricing trends and inventory data</li>
                <li style="margin:8px 0;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:14px;line-height:1.5;">Neighborhood spotlights covering what makes each area special</li>
              </ul>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:32px 0 0;">
                <tr>
                  <td style="background-color:#C9A84C;border-radius:6px;">
                    <a href="https://taurorealty.com/properties" style="display:inline-block;padding:12px 28px;color:#1A1A1A;font-family:'DM Sans',Arial,sans-serif;font-size:14px;font-weight:600;text-decoration:none;">Browse Properties</a>
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
              <p style="margin:8px 0 0;">
                <a href="${unsubscribeUrl}" style="color:#999999;font-family:'DM Sans',Arial,sans-serif;font-size:11px;text-decoration:underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default renderNewsletterWelcome;
