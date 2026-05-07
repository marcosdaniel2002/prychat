import { Mensaje } from "@/types/mensajes/mensaje.types";

interface Props {
  mensaje: Mensaje;
  isMine: boolean;
}

export function MessageBubble({ mensaje, isMine }: Props) {
  return (
    <div
      className={`flex items-end gap-2 md:gap-4 ${
        isMine
          ? "flex-row-reverse ml-auto max-w-[85%] md:max-w-[70%]"
          : "max-w-[85%] md:max-w-[70%]"
      }`}
    >
      {!isMine && (
        <img
          className="w-7 h-7 md:w-8 md:h-8 rounded-xl object-cover mb-2 shrink-0"
          src={
            mensaje.sender.imagen
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${mensaje.sender.imagen}`
              : `https://ui-avatars.com/api/?name=${mensaje.sender.username}&background=random`
          }
          alt={mensaje.sender.username}
        />
      )}

      <div className={`space-y-1 ${isMine ? "items-end flex flex-col" : ""}`}>
        {/* Reply preview */}
        {mensaje.reply_to && (
          <div className="px-3 py-2 mb-1 bg-surface-container rounded-xl border-l-2 border-secondary text-on-surface-variant text-xs opacity-70">
            <span className="font-bold">
              {mensaje.reply_to.sender.username}:{" "}
            </span>
            <span className="truncate">{mensaje.reply_to.contenido}</span>
          </div>
        )}

        {/* Bubble */}
        <div
          className={`px-4 py-3 md:px-6 md:py-4 text-sm md:text-base leading-relaxed shadow-sm ${
            isMine
              ? "bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-t-3xl rounded-bl-3xl shadow-primary/10"
              : "bg-surface-container-low text-on-surface-variant rounded-t-3xl rounded-br-3xl"
          }`}
        >
          {mensaje.contenido}
        </div>

        {/* Timestamp + tick */}
        <div
          className={`flex items-center gap-1.5 ${isMine ? "justify-end" : ""}`}
        >
          <span className="label-sm text-on-surface-variant opacity-40 text-xs">
            {new Date(mensaje.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {isMine && (
            <span
              className={`material-symbols-outlined text-sm ${
                mensaje.mensajeLeidos.length > 0
                  ? "text-blue-500"
                  : "text-on-surface-variant opacity-40"
              }`}
            >
              done_all
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
