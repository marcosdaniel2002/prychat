// SERVER-SIDE SERVICE
"use server";

import { Conversacion } from "@/types/conversacion/conversacion.types";
import { SolicitudAmistad } from "@/types/solicitud/solicitud.types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export interface SuccessResponse {
  data: {
    conversacion: Conversacion;
    solicitud: SolicitudAmistad;
  };
}

export const aceptarSolicitud = async function (id: String) {
  try {
    // await sleep(2);
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/solicitudes/${id}/aceptar`,
      {
        method: "PATCH",
        headers: {
          Cookie: `jwt=${token?.value}`,
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    revalidatePath("/requests");

    const response: SuccessResponse = await res.json();
    return response.data;
  } catch (err) {
    throw err;
  }
};
