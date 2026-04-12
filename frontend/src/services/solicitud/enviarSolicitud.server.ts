// SERVER-SIDE SERVICE
"use server";

import { SolicitudAmistad } from "@/types/solicitud/solicitud.types";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface SuccessResponse {
  data: {
    solicitud: SolicitudAmistad;
  };
}

export const enviarSolicitud = async function (receiver_id: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/solicitudes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `jwt=${token?.value}`,
        },
        body: JSON.stringify({ receiver_id }),
      },
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    revalidatePath("/friends"); // 👈 sí hace falta para actualizar inmediatamente

    const response: SuccessResponse = await res.json();
    return response.data.solicitud;
  } catch (err) {
    throw err;
  }
};
