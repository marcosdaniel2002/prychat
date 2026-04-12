// hooks/useSocket.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function useSocket() {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      withCredentials: true, // 👈 reemplaza auth: { token }
    });
  }
  return socket;
}
