// SERVER SIDE SERVICE

import { fetchWithAuth } from "@/helpers/fetch-auth";
import { Usuario } from "@/types/auth/usuario.types";

export interface SuccessResponse {
  data: {
    user: Usuario;
  };
}

export const getMe = async () => {
  const res = await fetchWithAuth("/auth/me");
  if (!res.ok) return null;
  const response: SuccessResponse = await res.json();
  return response.data.user;
};
