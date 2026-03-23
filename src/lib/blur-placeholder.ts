/**
 * Generates a tiny SVG shimmer placeholder encoded as a base64 data URL.
 * Used with Next.js Image `placeholder="blur"` and `blurDataURL`.
 *
 * The shimmer is a subtle gradient animation that indicates content is loading.
 * The SVG is small (~600 bytes) and renders instantly.
 */

const shimmerSvg = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#e5e7eb" offset="20%" />
      <stop stop-color="#f3f4f6" offset="50%" />
      <stop stop-color="#e5e7eb" offset="80%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#e5e7eb" />
  <rect width="${w}" height="${h}" fill="url(#g)" />
</svg>`;

function toBase64(str: string): string {
  return typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
}

/**
 * Returns a base64-encoded SVG data URL for use as a blur placeholder.
 * @param w - Width of the placeholder (default 700)
 * @param h - Height of the placeholder (default 475)
 */
export function blurDataURL(w = 700, h = 475): string {
  return `data:image/svg+xml;base64,${toBase64(shimmerSvg(w, h))}`;
}

/** Pre-computed placeholder for landscape images (e.g., property cards, hero) */
export const BLUR_LANDSCAPE = blurDataURL(700, 475);

/** Pre-computed placeholder for square images (e.g., agent photos) */
export const BLUR_SQUARE = blurDataURL(400, 400);

/** Pre-computed placeholder for portrait images */
export const BLUR_PORTRAIT = blurDataURL(400, 600);
