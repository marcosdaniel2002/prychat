// src/contexts/AuthContext.tsx
"use client";
import { Usuario } from "@/types/auth/usuario.types";
import { createContext, useContext } from "react";

const AuthContext = createContext<Usuario | null>(null);

export function AuthProvider({
  user,
  children,
}: {
  user: Usuario;
  children: React.ReactNode;
}) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
