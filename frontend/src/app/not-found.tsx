"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 overflow-hidden relative w-full">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-container/10 blur-[80px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full">
        {/* Big 404 number */}
        <div className="relative mb-6 select-none">
          <span
            className="text-[10rem] sm:text-[13rem] font-headline font-extrabold leading-none"
            style={{
              background:
                "linear-gradient(135deg, #216a17 0%, #3c842f 40%, #00687c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </span>
          {/* Floating icon on top of number */}
          <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-primary-container flex items-center justify-center shadow-lg animate-bounce">
            <span className="material-symbols-outlined text-on-primary-container text-xl">
              search_off
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 shadow-xl shadow-primary/5 space-y-5">
          <div className="space-y-2">
            <h1 className="font-headline font-bold text-2xl text-on-surface">
              Page not found
            </h1>
            <p className="text-on-surface-variant text-sm font-medium leading-relaxed">
              The page you're looking for doesn't exist or may have been moved.
              Let's get you back on track.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-outline-variant/15" />

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.back()}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-full border border-outline-variant/30 bg-surface-container hover:bg-surface-container-high transition-all duration-200 font-semibold text-on-surface-variant text-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              Go back
            </button>

            <button
              onClick={() => router.push("/")}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-full font-bold text-on-primary text-sm transition-all duration-200 hover:scale-[1.02] active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, #216a17 0%, #3c842f 60%, #246c1a 100%)",
                boxShadow: "0 4px 24px 0 rgba(33,106,23,0.25)",
              }}
            >
              <span className="material-symbols-outlined text-[18px]">
                home
              </span>
              Go home
            </button>
          </div>
        </div>

        {/* Bottom hint */}
        <p className="mt-6 text-outline text-xs font-medium">
          Error code{" "}
          <span className="text-primary font-bold font-headline">404</span> ·
          Not Found
        </p>
      </div>
    </div>
  );
}
