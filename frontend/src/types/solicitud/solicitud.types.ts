import { Usuario } from "../auth/usuario.types";

// Enum para el estado de la solicitud
export enum EstadoSolicitud {
  pending = "pending",
  accepted = "accepted",
  rejected = "rejected",
}

// Interfaz principal para SolicitudAmistad
export interface SolicitudAmistad {
  id: string;
  sender_id: string;
  receiver_id: string;
  responded_at: Date | null;
  estado_solicitud: EstadoSolicitud;
  createdAt: Date;
  updatedAt: Date | null;
  status: boolean;
  // Relaciones (opcionales si no se incluyen en la consulta)
  sender?: Usuario;
  receiver?: Usuario;
}
