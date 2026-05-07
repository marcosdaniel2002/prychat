import { useRef, useEffect } from "react";
import { Mensaje } from "@/types/mensajes/mensaje.types";
import { MessageBubble } from "./MessageBubble";

interface Props {
  mensajes: Mensaje[];
  loading: boolean;
  error: string | null;
  currentUserId: string;
}

export function MessageList({
  mensajes,
  loading,
  error,
  currentUserId,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (loading || mensajes.length === 0) return;
    const el = containerRef.current;
    if (!el) return;

    if (isInitialLoad.current) {
      // Esperar el siguiente frame para que el DOM tenga altura final
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
      isInitialLoad.current = false;
    } else {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [mensajes, loading]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 md:px-12 py-6 md:py-8 space-y-4 hide-scrollbar"
    >
      {loading && (
        <div className="flex items-center justify-center h-full text-on-surface-variant opacity-50">
          Loading messages...
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center h-full text-error">
          {error}
        </div>
      )}
      {!loading && !error && mensajes.length === 0 && (
        <div className="flex items-center justify-center h-full text-on-surface-variant opacity-50">
          No messages yet. Say hello! 👋
        </div>
      )}
      {!loading &&
        !error &&
        mensajes.map((mensaje) => (
          <MessageBubble
            key={mensaje.id}
            mensaje={mensaje}
            isMine={mensaje.sender_id === currentUserId}
          />
        ))}
    </div>
  );
}
