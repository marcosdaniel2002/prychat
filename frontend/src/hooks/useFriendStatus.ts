// hooks/useFriendStatus.ts
import { useState, useEffect } from "react";
import { useSocket } from "./useSockets";

export function useFriendStatus(usuario_id: string, estadoInicial: string) {
  const socket = useSocket();
  const [estado, setEstado] = useState(estadoInicial);

  useEffect(() => {
    const handler = (data: { usuario_id: string; estado: string }) => {
      if (data.usuario_id === usuario_id) {
        setEstado(data.estado);
      }
    };

    socket.on("user:status_changed", handler);
    return () => {
      socket.off("user:status_changed", handler);
    };
  }, [usuario_id]);

  return estado;
}
