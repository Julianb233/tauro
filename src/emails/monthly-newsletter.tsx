// Monthly Newsletter Email Template
// Sent to confirmed subscribers with curated Philadelphia real estate content

export interface FeaturedListing {
  address: string;
  neighborhood: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  url: string;
}

export interface MarketStat {
  label: string;
  value: string;
  change?: string;
}

export interface MonthlyNewsletterProps {
  month: string;
  year: string;
  preheader?: string;
  heroHeadline: string;
  heroSubtext: string;
  featuredListings: FeaturedListing[];
  marketStats: MarketStat[];
  neighborhoodSpotlight?: {
    name: string;
    description: string;
    url: string;
  };
  unsubscribeUrl: string;
}

function renderListing(listing: FeaturedListing): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px;background:#1A1A1A;border-radius:6px;overflow:hidden;">
      <tr>
        <td style="width:140px;vertical-align:top;">
          <img src="${listing.image}" alt="${listing.address}" width="140" height="100" style="display:block;object-fit:cover;width:140px;height:100px;" />
        </td>
        <td style="padding:12px 16px;vertical-align:top;">
          <p style="margin:0 0 4px;color:#C9A84C;font-family:'DM Sans',Arial,sans-serif;font-size:15px;font-weight:600;">${listing.price}</p>
          <p style="margin:0 0 4px;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:13px;">${listing.address}</p>
          <p style="margin:0 0 8px;color:#999999;font-family:'DM Sans',Arial,sans-serif;font-size:12px;">${listing.beds} bed | ${listing.baths} bath | ${listing.sqft} sqft | ${listing.neighborhood}</p>
          <a href="${listing.url}" style="color:#C9A84C;font-family:'DM Sans',Arial,sans-serif;font-size:12px;text-decoration:none;">View listing &rarr;</a>
        </td>
      </tr>
    </table>`;
}

function renderMarketStats(stats: MarketStat[]): string {
  return stats
    .map(
      (stat) => `
    <td style="padding:12px 8px;text-align:center;border-right:1px solid #333333;">
      <p style="margin:0;color:#C9A84C;font-family:Georgia,'Playfair Display',serif;font-size:20px;font-weight:700;">${stat.value}</p>
      <p style="margin:4px 0 0;color:#999999;font-family:'DM Sans',Arial,sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;">${stat.label}</p>
      ${stat.change ? `<p style="margin:2px 0 0;color:${stat.change.startsWith("+") ? "#4ade80" : "#f87171"};font-family:'DM Sans',Arial,sans-serif;font-size:11px;">${stat.change}</p>` : ""}
    </td>`,
    )
    .join("");
}

export function renderMonthlyNewsletter(props: MonthlyNewsletterProps): string {
  const {
    month,
    year,
    preheader,
    heroHeadline,
    heroSubtext,
    featuredListings,
    marketStats,
    neighborhoodSpotlight,
    unsubscribeUrl,
  } = props;

  const listingsHtml = featuredListings.map(renderListing).join("");

  const spotlightHtml = neighborhoodSpotlight
    ? `
    <tr>
      <td style="padding:0 40px 32px;">
        <h3 style="margin:0 0 12px;font-family:Georgia,'Playfair Display',serif;color:#C9A84C;font-size:18px;font-weight:600;">Neighborhood Spotlight: ${neighborhoodSpotlight.name}</h3>
        <p style="margin:0 0 12px;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:14px;line-height:1.6;">${neighborhoodSpotlight.description}</p>
        <a href="${neighborhoodSpotlight.url}" style="color:#C9A84C;font-family:'DM Sans',Arial,sans-serif;font-size:13px;text-decoration:none;">Explore ${neighborhoodSpotlight.name} &rarr;</a>
      </td>
    </tr>
    <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #333333;margin:0 0 24px;" /></td></tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Tauro Realty - ${month} ${year} Newsletter</title>
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!--<![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#1A1A1A;font-family:'DM Sans',Arial,sans-serif;">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>` : ""}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#1A1A1A;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#222222;border-radius:8px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="border-top:4px solid #C9A84C;padding:40px 40px 20px;text-align:center;">
              <h1 style="margin:0;font-family:Georgia,'Playfair Display',serif;color:#C9A84C;font-size:28px;letter-spacing:4px;font-weight:700;">TAURO</h1>
              <p style="margin:8px 0 0;font-family:'DM Sans',Arial,sans-serif;color:#999999;font-size:12px;letter-spacing:1px;">${month} ${year} Newsletter</p>
            </td>
          </tr>
          <!-- Divider -->
          <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #333333;margin:0;" /></td></tr>

          <!-- Hero -->
          <tr>
            <td style="padding:32px 40px 24px;">
              <h2 style="margin:0 0 12px;font-family:Georgia,'Playfair Display',serif;color:#F5F0E8;font-size:24px;font-weight:600;">${heroHeadline}</h2>
              <p style="margin:0;color:#CCCCCC;font-family:'DM Sans',Arial,sans-serif;font-size:15px;line-height:1.6;">${heroSubtext}</p>
            </td>
          </tr>

          <!-- Market Stats -->
          ${
            marketStats.length > 0
              ? `
          <tr>
            <td style="padding:0 40px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1A1A1A;border-radius:6px;overflow:hidden;">
                <tr>${renderMarketStats(marketStats)}</tr>
              </table>
            </td>
          </tr>`
              : ""
          }

          <!-- Divider -->
          <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #333333;margin:0 0 24px;" /></td></tr>

          <!-- Featured Listings -->
          ${
            featuredListings.length > 0
              ? `
          <tr>
            <td style="padding:0 40px 24px;">
              <h3 style="margin:0 0 16px;font-family:Georgia,'Playfair Display',serif;color:#C9A84C;font-size:18px;font-weight:600;">Featured Listings</h3>
              ${listingsHtml}
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:16px 0 0;">
                <tr>
                  <td style="background-color:#C9A84C;border-radius:6px;">
                    <a href="https://taurorealty.com/properties" style="display:inline-block;padding:12px 28px;color:#1A1A1A;font-family:'DM Sans',Arial,sans-serif;font-size:14px;font-weight:600;text-decoration:none;">View All Properties</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #333333;margin:0 0 24px;" /></td></tr>`
              : ""
          }

          <!-- Neighborhood Spotlight -->
          ${spotlightHtml}

          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 32px;text-align:center;">
              <p style="margin:0 0 16px;color:#F5F0E8;font-family:'DM Sans',Arial,sans-serif;font-size:15px;">Ready to find your dream home in Philadelphia?</p>
              <table role="presentation" cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <td style="background-color:#C9A84C;border-radius:6px;">
                    <a href="https://taurorealty.com/contact" style="display:inline-block;padding:12px 28px;color:#1A1A1A;font-family:'DM Sans',Arial,sans-serif;font-size:14px;font-weight:600;text-decoration:none;">Get in Touch</a>
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
              <p style="margin:8px 0 0;color:#666666;font-family:'DM Sans',Arial,sans-serif;font-size:11px;">
                You received this email because you subscribed to the Tauro Realty newsletter.
              </p>
              <p style="margin:8px 0 0;">
                <a href="${unsubscribeUrl}" style="color:#999999;font-family:'DM Sans',Arial,sans-serif;font-size:11px;text-decoration:underline;">Unsubscribe</a>
                <span style="color:#666666;font-family:'DM Sans',Arial,sans-serif;font-size:11px;"> | </span>
                <a href="https://taurorealty.com/newsletter/preferences" style="color:#999999;font-family:'DM Sans',Arial,sans-serif;font-size:11px;text-decoration:underline;">Manage Preferences</a>
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

export default renderMonthlyNewsletter;
