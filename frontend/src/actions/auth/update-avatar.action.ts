import { Usuario } from "@/types/auth/usuario.types";

export interface SuccessResponse {
  data: {
    user: Usuario;
  };
}

export const updateAvatar = async function (data: FormData) {
  try {
    for (const [key, value] of data.entries()) {
      console.log(key, value);
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/update/avatar`,
      {
        method: "PATCH",
        body: data, // ✅ FormData llega intacto al backend
        credentials: "include", // para enviar cookies
      },
    );
    if (!res.ok) {
      const error = await res.json();
      let message = error.message;
      if (error.stack) {
        console.log(error.stack);
        message += `\nStack trace: ${error.stack}`;
      }
      throw new Error(`${message}`);
    }
    const response: SuccessResponse = await res.json();
    return response.data.user;
  } catch (err) {
    throw err;
  }
};
