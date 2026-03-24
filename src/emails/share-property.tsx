// Share Property Email Template
// Sent when a user shares a property listing with a friend

export interface SharePropertyProps {
  senderName: string;
  recipientName?: string;
  propertyTitle: string;
  propertyUrl: string;
  propertyImage?: string;
  personalMessage?: string;
}

export function renderShareProperty({
  senderName,
  recipientName,
  propertyTitle,
  propertyUrl,
  propertyImage,
  personalMessage,
}: SharePropertyProps): string {
  const greeting = recipientName ? `Hi ${recipientName},` : "Hi,";

  const messageBlock = personalMessage
    ? `<div style="background:#1A1A1A;border-left:4px solid #C9A84C;padding:16px 20px;margin:24px 0;border-radius:0 4px 4px 0;">
        <p style="color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:14px;line-height:1.6;margin:0;font-style:italic;">"${personalMessage}"</p>
      </div>`
    : "";

  const imageBlock = propertyImage
    ? `<tr>
        <td style="padding:0;">
          <img src="${propertyImage}" alt="${propertyTitle}" width="600" style="display:block;width:100%;max-width:600px;height:auto;border-radius:0;" />
        </td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${senderName} shared a property with you</title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!--<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#1A1A1A;font-family:'DM Sans',Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">${senderName} thought you'd love this property on Tauro Realty</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1A1A1A;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#222222;border-radius:8px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:#111111;padding:24px 32px;text-align:center;">
              <img src="https://taurorealty.com/tauro-logo-white.png" alt="Tauro Realty" width="120" style="display:inline-block;" />
            </td>
          </tr>
          ${imageBlock}
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:16px;line-height:1.6;margin:0 0 16px;">
                ${greeting}
              </p>
              <p style="color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:16px;line-height:1.6;margin:0 0 8px;">
                <strong>${senderName}</strong> thought you'd love this property:
              </p>
              <h2 style="color:#C9A84C;font-family:'DM Sans',Arial,sans-serif;font-size:22px;margin:16px 0;">
                ${propertyTitle}
              </h2>
              ${messageBlock}
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0;">
                <tr>
                  <td style="background:#C9A84C;border-radius:6px;">
                    <a href="${propertyUrl}" style="display:inline-block;padding:14px 32px;color:#111111;font-family:'DM Sans',Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.5px;">
                      View Property
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color:#999999;font-family:'DM Sans',Arial,sans-serif;font-size:13px;line-height:1.5;margin:24px 0 0;">
                Sent via <a href="https://taurorealty.com" style="color:#C9A84C;text-decoration:none;">Tauro Realty</a> — Premium Philadelphia Real Estate
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#111111;padding:20px 32px;text-align:center;">
              <p style="color:#666666;font-family:'DM Sans',Arial,sans-serif;font-size:11px;margin:0;">
                &copy; ${new Date().getFullYear()} Tauro Realty. All rights reserved.
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
