"use client";

import { useState, useEffect } from "react";
import { useChatContext } from "@/contexts/ChatContext";
import ConversationLayout from "./ConversationLayout";
import { Mensaje } from "@/types/mensajes/mensaje.types";
import { getMensajes } from "@/services/mensajes/getMensajes.client";
import { marcarLeidoConversacion } from "@/services/mensajes/marcarLeidoConversacion.client";
import { useAuth } from "@/contexts/AuthContext";
import { useSocket } from "@/hooks/useSockets";
import { useFriendStatus } from "@/hooks/useFriendStatus";
import { ConversationHeader } from "./ConversationHeader";
import { MessageList } from "./MessageList";
import InputType from "./InputType";

function ConversationView() {
  const { selectedConversacionId, selectedConversacion } = useChatContext();
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useAuth();
  const socket = useSocket();

  const friend = selectedConversacion?.miembros?.find((m) => m.id !== user?.id);

  const estado_friend = useFriendStatus(
    friend?.id ?? "",
    friend?.estado_user ?? "offline",
  );

  // Cargar mensajes y marcar como leídos al abrir conversación
  useEffect(() => {
    if (!selectedConversacionId) return;

    socket.emit("conversation:open", { conversacion_id: selectedConversacionId });

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMensajes({
          conversacion_id: selectedConversacionId,
          limit: 20,
        });
        setMensajes(data.mensajes);
        await marcarLeidoConversacion(selectedConversacionId);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar mensajes",
        );
      } finally {
        setLoading(false);
      }
    };
    fetch();

    return () => {
      socket.emit("conversation:close");
    };
  }, [selectedConversacionId, socket]);

  // Escuchar nuevos mensajes en tiempo real
  useEffect(() => {
    const handleNewMessage = (mensaje: Mensaje) => {
      if (mensaje.conversacion_id !== selectedConversacionId) return;
      setMensajes((prev) => {
        if (prev.some((m) => m.id === mensaje.id)) return prev;
        return [...prev, mensaje];
      });
      // Marcar como leído de inmediato si la conversación está abierta
      marcarLeidoConversacion(selectedConversacionId).catch(() => {});
    };

    const handleConversationRead = ({
      mensaje_ids,
      usuario_id,
    }: {
      conversacion_id: string;
      usuario_id: string;
      mensaje_ids: string[];
    }) => {
      setMensajes((prev) =>
        prev.map((m) =>
          mensaje_ids.includes(m.id) &&
          !m.mensajeLeidos.some((l) => l.usuario_id === usuario_id)
            ? { ...m, mensajeLeidos: [...m.mensajeLeidos, { usuario_id }] }
            : m,
        ),
      );
    };

    socket.on("message:new", handleNewMessage);
    socket.on("conversation:read", handleConversationRead);
    return () => {
      socket.off("message:new", handleNewMessage);
      socket.off("conversation:read", handleConversationRead);
    };
  }, [selectedConversacionId, socket]);

  if (!selectedConversacionId || !selectedConversacion) {
    return (
      <div className="flex-1 flex items-center justify-center text-on-surface-variant opacity-50">
        Select a conversation to start chatting
      </div>
    );
  }

  return (
    <ConversationLayout>
      <>
        <ConversationHeader
          nombre={selectedConversacion.nombre ?? "Conversation"}
          imagen={selectedConversacion.imagen}
          estado={estado_friend}
        />

        <MessageList
          key={selectedConversacionId}
          mensajes={mensajes}
          loading={loading}
          error={error}
          currentUserId={user?.id ?? ""}
        />

        <InputType
          conversacion_id={selectedConversacionId}
          reply_to_id={null}
        />

        <div className="absolute top-1/2 -right-64 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
        <div className="absolute bottom-0 -left-64 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
      </>
    </ConversationLayout>
  );
}

export default ConversationView;
