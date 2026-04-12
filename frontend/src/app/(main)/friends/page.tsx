import FriendsList from "@/components/friends/FriendsList";
import Loading from "@/components/shared/Loading";
import { Suspense } from "react";

function page() {
  return (
    <div className="px-12 pb-20">
      {/* <!-- Hero Section --> */}
      <section className="mt-8 mb-12">
        <div className="max-w-4xl">
          <h1 className="text-[2.75rem] font-extrabold tracking-tight leading-tight mb-4">
            Discover New Friends
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Expand your atmosphere. Connect with creators, designers, and
            visionaries within The Fluid Exchange ecosystem.
          </p>
        </div>
      </section>
      {/* <!-- Discovery Grid --> */}
      <Suspense fallback={<Loading />}>
        <FriendsList />
      </Suspense>
      {/* <!-- Suggestion Footer --> */}
      <div className="mt-16 p-12 rounded-[3rem] bg-secondary-fixed/30 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/40">
        <div className="max-w-lg">
          <h2 className="text-2xl font-bold mb-2">
            Can't find who you're looking for?
          </h2>
          <p className="text-on-surface-variant">
            Try searching by professional tags like #design, #development, or
            #strategy to narrow down your results.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="py-4 px-8 bg-surface-container-lowest text-on-surface rounded-full font-bold cloud-shadow hover:bg-surface transition-colors">
            Invite a Friend
          </button>
          <button className="py-4 px-8 bg-secondary text-white rounded-full font-bold cloud-shadow hover:opacity-90 transition-opacity">
            View All Categories
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
