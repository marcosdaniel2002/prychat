// contexts/SolicitudesContext.tsx
"use client";
import { useSocket } from "@/hooks/useSockets";
import { createContext, useContext, useEffect, useState } from "react";

const SolicitudesContext = createContext<number>(0);

export function SolicitudesProvider({
  count: initialCount,
  children,
}: {
  count: number;
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(initialCount);
  const socket = useSocket();

  useEffect(() => {
    const handler = (data: { count: number }) => {
      console.log("🔔 solicitud:nueva recibida →", data);
      setCount(data.count);
    };

    socket.on("solicitud:nueva", handler);
    return () => {
      socket.off("solicitud:nueva", handler);
    };
  }, [socket]);

  return (
    <SolicitudesContext.Provider value={count}>
      {children}
    </SolicitudesContext.Provider>
  );
}

export const useSolicitudes = () => useContext(SolicitudesContext);
