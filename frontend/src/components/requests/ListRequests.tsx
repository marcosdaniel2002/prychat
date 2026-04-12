import { getRequests } from "@/services/requests/getRequest.server";
import RequestCard from "./RequestCard";
import Link from "next/link";

async function ListRequests() {
  const data = await getRequests();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* <!-- Request Card 3 (Visual Variant) --> */}
      {data.solicitudes.map((solicitud) => (
        <RequestCard key={solicitud.id} solicitud={solicitud} />
      ))}
      {/* <!-- Featured Request/Callout Card --> */}
      <div className="bg-primary-container/10 rounded-[2rem] p-8 relative overflow-hidden flex flex-col justify-center">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <h4 className="text-headline-sm font-extrabold text-primary mb-2">
          Build Your Network
        </h4>
        <p className="text-on-surface-variant text-sm mb-6">
          Connecting with industry leaders increases your atmospheric visibility
          by 40%.
        </p>
        <Link
          href="/friends"
          className="bg-surface-container-lowest text-primary font-bold py-3 px-6 rounded-full w-max cloud-shadow flex items-center gap-2 hover:bg-white transition-all"
        >
          <span className="material-symbols-outlined">explore</span>
          Find People
        </Link>
      </div>
    </div>
  );
}

export default ListRequests;
