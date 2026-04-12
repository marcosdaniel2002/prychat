"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md flex flex-col items-center text-center gap-6">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-error-container flex items-center justify-center">
          <span className="material-symbols-outlined text-on-error-container text-4xl">
            error
          </span>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="font-headline text-2xl font-bold text-on-surface">
            Something went wrong
          </h1>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            An unexpected error occurred. You can try again or go back to the
            home page.
          </p>
          {error?.digest && (
            <p className="text-outline text-xs font-mono mt-1">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={reset}
            className="flex-1 primary-gradient text-on-primary font-bold py-3.5 rounded-full cloud-shadow hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            <span>Try again</span>
          </button>

          <a
            href="/"
            className="flex-1 border border-outline-variant text-on-surface-variant font-semibold py-3.5 rounded-full hover:bg-surface-container transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">home</span>
            <span>Go home</span>
          </a>
        </div>
      </div>
    </main>
  );
}
