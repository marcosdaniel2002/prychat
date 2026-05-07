"use client";

import { aceptarSolicitud } from "@/services/requests/acceptRequest.server";
import { rechazarSolicitud } from "@/services/requests/rechazarRequest.server";
import { SolicitudAmistad } from "@/types/solicitud/solicitud.types";
import toast from "react-hot-toast";

interface Props {
  solicitud: SolicitudAmistad;
}

function RequestCard({ solicitud }: Props) {
  async function handleAccept() {
    try {
      await aceptarSolicitud(solicitud.id);
      toast.success("Request accepted successfully.");
    } catch (err: unknown) {
      toast.error((err as Error).message);
    }
  }

  async function handleDecline() {
    try {
      await rechazarSolicitud(solicitud.id);
    } catch (err: unknown) {
      toast.error((err as Error).message);
    }
  }

  const imagen =
    solicitud.sender?.imagen ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAy497fb8fufHFQyWCB-6aFGyQOoxUBA7i4W_i2ZyvRIveQTqbp6c3B7fyFINJtb0j9l-_pK8bSS5wgH3ffwuAAf-q4qRoeh-hCfqfqw_GKvRci-fbbRf9q5JX0lVmYhBclqSWe6GtJcIzV1OttvIm1ESc-WyrRJMaLwgPcqTv0_aKJVW59t107H7vZfILA22BRfHs0J5gSaOeWzekcR3_vVfqvUqsxyvFUM14uHc2xZQVVelZy_3rEPYbDgbqNKvkKYrIyezeEuVUT";
  return (
    <div className="bg-surface-container-low rounded-[2rem] p-8 cloud-shadow border-l-4 border-secondary transition-transform hover:scale-[1.01] md:col-span-1">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm">
            <img
              alt={solicitud.sender?.nombres || "Unknown User"}
              className="w-full h-full object-cover"
              data-alt="Artistic profile of a woman with vibrant lighting and shadows, editorial photography style"
              src={imagen}
            />
          </div>
          <div>
            <h3 className="text-title-md font-bold text-on-surface">
              {solicitud.sender?.nombres || "Unknown User"}
            </h3>
            <p className="text-[0.6875rem] uppercase tracking-wider text-secondary font-bold">
              {solicitud.sender?.email || "Unknown Profession"}
            </p>
          </div>
        </div>
        <span className="text-[0.6875rem] uppercase tracking-widest text-on-surface-variant opacity-60">
          {new Date(solicitud.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
      <div className="mb-8">
        <p className="text-on-surface-variant italic leading-relaxed">
          {solicitud.sender?.biografia || "No biography available."}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="flex-1 primary-gradient text-on-primary py-3 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 active:scale-95 transition-all"
          onClick={handleAccept}
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          className="flex-1 border-2 border-outline-variant text-on-surface-variant py-3 rounded-full font-bold text-sm hover:bg-surface-container-highest transition-colors"
        >
          Decline
        </button>
      </div>
    </div>
  );
}

export default RequestCard;
