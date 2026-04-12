// CLIENT-SIDE SERVICE
import { sleep } from "@/helpers/sleep";
import { Usuario } from "@/types/auth/usuario.types";

export interface SuccessResponse {
  data: {
    user: Usuario;
  };
}

export const updateProfile = async function (data: FormData) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/update/profile`,
      {
        method: "PATCH",
        credentials: "include",
        body: data,
      },
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }

    const response: SuccessResponse = await res.json();
    return response.data.user;
  } catch (err) {
    throw err;
  }
};
