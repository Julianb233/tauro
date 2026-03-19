function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
    </svg>
  );
}

/**
 * Google review badge showing star rating.
 * @param variant - "light" for dark backgrounds (footer), "default" for standard pages.
 */
export function GoogleReviewBadge({
  variant = "default",
}: {
  variant?: "default" | "light";
}) {
  const isLight = variant === "light";

  return (
    <a
      href="https://g.co/kgs/taurorealty"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 transition-opacity hover:opacity-80"
      aria-label="4.9 stars on Google — 127 reviews"
    >
      {/* Google "G" icon */}
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>

      {/* Stars */}
      <span className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-3.5 w-3.5 ${i < 5 ? "text-amber-400" : "text-white/20"}`}
          />
        ))}
      </span>

      {/* Text */}
      <span
        className={`text-xs font-medium ${
          isLight ? "text-white/70" : "text-muted-foreground"
        }`}
      >
        4.9 stars
        <span className="hidden sm:inline"> on Google</span>{" "}
        <span className={isLight ? "text-white/40" : "text-muted-foreground/60"}>
          (127 reviews)
        </span>
      </span>
    </a>
  );
}
