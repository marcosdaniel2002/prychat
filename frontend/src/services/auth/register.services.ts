// CLIENT-SIDE SERVICE

import { Usuario } from "@/types/auth/usuario.types";

export interface SuccessResponse {
  data: {
    user: Usuario;
  };
}

export const register = async function (data: FormData) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        credentials: "include",
        body: data,
      },
    );

    if (!res.ok) {
      let message = `Error del servidor (${res.status})`;
      try {
        const error = await res.json();
        message = error.message ?? message;
      } catch {
        // la respuesta no es JSON (ej. página HTML de error de Vercel)
      }
      throw new Error(message);
    }

    const response: SuccessResponse = await res.json();
    return response.data.user;
  } catch (err) {
    throw err;
  }
};
