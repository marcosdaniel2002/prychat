import MobileButtonBack from "./MobileButtonBack";
import { StatusBadge } from "./StatusBadge";
import { StatusIndicator } from "./StatusIndicator";

interface Props {
  nombre: string;
  imagen?: string | null;
  estado: string;
}

export function ConversationHeader({ nombre, imagen, estado }: Props) {
  return (
    <header className="px-4 md:px-12 h-20 md:h-24 flex items-center justify-between bg-surface/80 backdrop-blur-md z-10 border-b border-outline-variant/10">
      <div className="flex items-center gap-3 md:gap-5">
        <MobileButtonBack />
        <div className="relative">
          <img
            className="w-10 h-10 md:w-12 md:h-12 rounded-2xl object-cover"
            src={
              imagen
                ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${imagen}`
                : "https://lh3.googleusercontent.com/aida-public/AB6AXuBtyLLuYoW4AdMoFSo_jzgvd5LolspIzLBEQohr4xkrStv7MJIPd0AMYrlJB2cank1EcxIslVif0IWSk5IviTP5EbTSzrSIh-UBkjEc2T5KgbLiD7m8AYsunKPAZVAYzyRgUzyA7kcyKYYool1u5rssi6fEYpzdbMO-4AlLIw1Uy2uJFUW5zI-6uQOC9CT-0Wi8dPePNPDMG-Er0Xxh9rZRaspZ_iwQ6pRAN-wsVUKhc0scicBVWZ3Z_4xwY-2SbN-aO7fK9ZuPlyi5"
            }
            alt={nombre}
          />
          <StatusBadge estado={estado} />
        </div>
        <div>
          <h2 className="text-base md:headline-sm font-bold text-on-surface">
            {nombre}
          </h2>
          <StatusIndicator estado={estado} />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        {[
          { icon: "call", label: "Llamar" },
          { icon: "videocam", label: "Video" },
        ].map(({ icon, label }) => (
          <button
            key={icon}
            aria-label={label}
            className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-xl">{icon}</span>
          </button>
        ))}
        <button
          aria-label="Info"
          className="hidden md:flex w-12 h-12 rounded-2xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest transition-colors items-center justify-center"
        >
          <span className="material-symbols-outlined">info</span>
        </button>
      </div>
    </header>
  );
}
