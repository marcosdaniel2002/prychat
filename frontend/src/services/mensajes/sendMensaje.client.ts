import { Mensaje } from "@/types/mensajes/mensaje.types";

export enum TipoMensaje {
  TEXT = "text",
  IMAGE = "image",
  FILE = "file",
  AUDIO = "audio",
}

interface SuccessResponse {
  data: {
    mensaje: Mensaje;
  };
}

interface GetMensajesParams {
  conversacion_id: string;
  reply_to_id: string | null;
  contenido: string;
  tipo: TipoMensaje;
}

export const sendMensaje = async function (params: GetMensajesParams) {
  const { conversacion_id, reply_to_id, contenido, tipo } = params;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/mensajes`;

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ conversacion_id, reply_to_id, contenido, tipo }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const response: SuccessResponse = await res.json();
  return response.data;
};
