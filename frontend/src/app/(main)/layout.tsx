import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { LayoutInner } from "@/components/shared/LayoutInner";

import { AuthProvider } from "@/contexts/AuthContext";
import { ChatProvider } from "@/contexts/ChatContext";
import { SolicitudesProvider } from "@/contexts/SolicitudesContext";

import { getMe } from "@/services/auth/me.services";
import { getCountSolicitudesPendientes } from "@/services/requests/getCountRequest.server";

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await getMe();
  if (!user) redirect("/auth/login");

  // Aquí podrías obtener el conteo de solicitudes pendientes, por ejemplo:
  let pendingCount = 0;
  try {
    const data = await getCountSolicitudesPendientes();
    pendingCount = data.count;
  } catch {}

  return (
    <AuthProvider user={user}>
      <SolicitudesProvider count={pendingCount}>
        <ChatProvider>
          <LayoutInner>{children}</LayoutInner>
        </ChatProvider>
      </SolicitudesProvider>
    </AuthProvider>
  );
}
