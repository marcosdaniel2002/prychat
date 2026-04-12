import { cookies } from "next/headers";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt");

  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
    ...options, // 👈 aquí pasan las opciones de next incluyendo next.revalidate
    headers: {
      ...options.headers,
      ...(token && { Cookie: `jwt=${token.value}` }),
    },
  });
};
