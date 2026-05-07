import { Mensaje } from "@/types/mensajes/mensaje.types";

interface SuccessResponse {
  data: {
    mensajes: Mensaje[];
    nextCursor: string | null;
    hasMore: boolean;
  };
}

interface GetMensajesParams {
  conversacion_id: string;
  limit?: number;
  cursor?: string | null;
}

export const getMensajes = async function (params: GetMensajesParams) {
  const { conversacion_id, limit, cursor } = params;

  const queryParams = new URLSearchParams();
  queryParams.append("conversacion_id", conversacion_id);

  if (limit) {
    queryParams.append("limit", limit.toString());
  }

  if (cursor) {
    queryParams.append("cursor", cursor);
  }

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/mensajes?${queryParams.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const response: SuccessResponse = await res.json();
  return response.data;
};
