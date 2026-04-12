import ListRequests from "@/components/requests/ListRequests";
import Loading from "@/components/shared/Loading";
import Link from "next/link";
import { Suspense } from "react";

function page() {
  return (
    // <!-- Main Content Canvas -->
    <main className="px-12 pb-16">
      <div className="mx-auto">
        {/* <!-- Editorial Header --> */}
        <div className="mt-8 mb-16">
          <h1 className="text-[2.75rem] font-extrabold tracking-tight leading-tight mb-4">
            Contact Requests
          </h1>
          <p className="text-on-surface-variant font-medium">
            Manage your incoming connections and foster new dialogues.
          </p>
        </div>
        {/* <!-- Requests Bento/Asymmetric Grid --> */}
        <Suspense fallback={<Loading />}>
          <ListRequests />
        </Suspense>

        {/* <!-- Empty State Concept (Hidden but structured) --> */}
        <div className="hidden flex-col items-center justify-center py-32 text-center">
          <div className="w-24 h-24 bg-surface-variant rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">
              inbox
            </span>
          </div>
          <h3 className="text-headline-sm font-bold text-on-surface">
            All Clear
          </h3>
          <p className="text-on-surface-variant mt-2">
            You've responded to all pending contact requests.
          </p>
        </div>
      </div>
    </main>
  );
}

export default page;
