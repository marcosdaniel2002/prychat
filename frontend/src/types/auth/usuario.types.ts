export type EstadoUser = "online" | "offline" | "away";

export interface Usuario {
  id: string;
  nombres: string;
  apellidos: string;
  email: string;
  username: string;
  imagen: string | null;
  estado_user: EstadoUser;
  biografia: string | null;
}
