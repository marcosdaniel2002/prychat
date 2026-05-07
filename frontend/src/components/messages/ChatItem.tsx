"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useChatContext } from "@/contexts/ChatContext";
import { Conversacion } from "@/services/conversacion/getConversaciones.services";
import { useFriendStatus } from "@/hooks/useFriendStatus";
import { formatChatDate } from "@/helpers/formatChatDate";
import { useSocket } from "@/hooks/useSockets";
import { Mensaje } from "@/types/mensajes/mensaje.types";

const statusDot: Record<string, string> = {
  online: "bg-green-400",
  offline: "bg-gray-400",
  away: "bg-yellow-400",
  busy: "bg-red-400",
};

interface Props {
  conversacion: Conversacion;
}

function ChatItem({ conversacion }: Props) {
  const { setChatOpen, setSelectedConversacionId, setSelectedConversacion, selectedConversacionId } =
    useChatContext();
  const user = useAuth();
  const socket = useSocket();

  const miembro = conversacion.miembros.find((m) => m.id !== user?.id);
  const estado = useFriendStatus(
    miembro?.id ?? "",
    miembro?.estado_user ?? "offline",
  );

  const [fechaFormateada, setFechaFormateada] = useState<string>("");
  const [noLeidos, setNoLeidos] = useState(conversacion.no_leidos);
  const [ultimoMensaje, setUltimoMensaje] = useState(
    conversacion.ultimo_mensaje,
  );

  useEffect(() => {
    setFechaFormateada(formatChatDate(ultimoMensaje?.createdAt));
  }, [ultimoMensaje?.createdAt]);

  // Actualizar último mensaje y contador cuando llega uno nuevo
  useEffect(() => {
    const handleNewMessage = (mensaje: Mensaje) => {
      if (mensaje.conversacion_id !== conversacion.id) return;

      setUltimoMensaje({
        id: mensaje.id,
        contenido: mensaje.contenido,
        createdAt: String(mensaje.createdAt),
        sender: mensaje.sender,
      });

      if (
        mensaje.sender_id !== user?.id &&
        selectedConversacionId !== conversacion.id
      ) {
        setNoLeidos((prev) => prev + 1);
      }
    };

    socket.on("message:new", handleNewMessage);
    return () => {
      socket.off("message:new", handleNewMessage);
    };
  }, [conversacion.id, user?.id, selectedConversacionId, socket]);

  // Limpiar badge al abrir la conversación
  useEffect(() => {
    if (selectedConversacionId === conversacion.id) {
      setNoLeidos(0);
    }
  }, [selectedConversacionId, conversacion.id]);

  const imagen =
    conversacion.tipo === "direct" ? miembro?.imagen : conversacion.imagen;
  const nombre =
    conversacion.tipo === "direct" && miembro
      ? miembro.username
      : conversacion.nombre;

  return (
    <div
      onClick={() => {
        setChatOpen(true);
        setSelectedConversacionId(conversacion.id);
        setSelectedConversacion(conversacion);
      }}
      className={`relative flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-2xl group cursor-pointer transition-colors ${
        selectedConversacionId === conversacion.id
          ? "bg-surface-container"
          : "bg-surface-container-highest hover:bg-surface-container"
      }`}
    >
      {selectedConversacionId === conversacion.id && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full" />
      )}

      <div className="relative shrink-0">
        <img
          className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover"
          src={
            imagen
              ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${imagen}`
              : "https://lh3.googleusercontent.com/aida-public/AB6AXuBtyLLuYoW4AdMoFSo_jzgvd5LolspIzLBEQohr4xkrStv7MJIPd0AMYrlJB2cank1EcxIslVif0IWSk5IviTP5EbTSzrSIh-UBkjEc2T5KgbLiD7m8AYsunKPAZVAYzyRgUzyA7kcyKYYool1u5rssi6fEYpzdbMO-4AlLIw1Uy2uJFUW5zI-6uQOC9CT-0Wi8dPePNPDMG-Er0Xxh9rZRaspZ_iwQ6pRAN-wsVUKhc0scicBVWZ3Z_4xwY-2SbN-aO7fK9ZuPlyi5"
          }
          alt={nombre ?? ""}
        />
        {conversacion.tipo === "direct" && (
          <span
            className={`absolute -bottom-1 -right-1 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 border-surface ${statusDot[estado] ?? statusDot.offline}`}
          />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="title-md font-semibold text-on-surface truncate">
            {nombre}
          </h3>
          <span className="label-sm text-on-surface-variant font-bold shrink-0 ml-2">
            {fechaFormateada}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="body-lg text-on-surface-variant truncate opacity-80 text-sm">
            {ultimoMensaje?.contenido || "No messages yet"}
          </p>
          {noLeidos > 0 && (
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-green-500 text-white text-xs font-bold leading-none shrink-0">
              {noLeidos > 99 ? "99+" : noLeidos}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
