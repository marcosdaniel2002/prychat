// SERVER-SIDE SERVICE
"use server";

import { Usuario } from "@/types/auth/usuario.types";
import { cookies } from "next/headers";

interface UsuarioMensaje {
  id: string;
  username: string;
  imagen: string | null;
}

interface UltimoMensaje {
  id: string;
  contenido: string;
  createdAt: string;
  sender: UsuarioMensaje;
}

export interface Conversacion {
  id: string;
  tipo: "direct" | "group";
  nombre: string | null;
  imagen: string | null;
  estado_user: string | null;
  miembros: Usuario[];
  ultimo_mensaje: UltimoMensaje | null;
  no_leidos: number;
}

export interface SuccessResponse {
  data: {
    total: number;
    conversaciones: Conversacion[];
  };
}

export const getConversaciones = async function () {
  try {
    // await sleep(2);
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversaciones`,
      {
        method: "GET",
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

    const response: SuccessResponse = await res.json();
    return response.data;
  } catch (err) {
    throw err;
  }
};
