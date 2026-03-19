import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1, // 10% of transactions
  replaysSessionSampleRate: 0, // Disable session replay by default
  replaysOnErrorSampleRate: 1.0, // Record replay on error
  enabled: process.env.NODE_ENV === "production",
});
