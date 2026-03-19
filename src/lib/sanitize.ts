/**
 * Strips HTML/script tags from a string to prevent stored XSS.
 */
export function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}
