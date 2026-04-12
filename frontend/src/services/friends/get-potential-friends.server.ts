// SERVER-SIDE SERVICE
import { sleep } from "@/helpers/sleep";
import { Usuario } from "@/types/auth/usuario.types";
import { cookies } from "next/headers";

export interface SuccessResponse {
  data: {
    total: number;
    users: Usuario[];
  };
}

export const getPotentialFriends = async function () {
  try {
    // await sleep(2);
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/potential-friends`,
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
