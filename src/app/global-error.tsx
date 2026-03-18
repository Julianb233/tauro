"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen items-center justify-center bg-[#0F0F1A] text-[#F5F3F0]">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <button
            onClick={() => reset()}
            className="mt-4 rounded-md bg-[#C9A96E] px-4 py-2 text-sm font-semibold text-[#0F0F1A]"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
