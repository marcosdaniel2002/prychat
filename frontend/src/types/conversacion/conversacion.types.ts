import { Usuario } from "../auth/usuario.types";

// Interface para un miembro de la conversación
interface MiembroConversacion {
  id: string;
  conversacion_id: string;
  usuario_id: string;
  rol: "member" | "admin";
  createdAt: Date;
  updatedAt: Date | null;
  status: boolean;
  usuario?: Usuario;
}

// Interface para el mensaje (si lo necesitas)
interface Mensaje {
  id: string;
  conversacion_id: string;
  sender_id: string;
  reply_to_id: string | null;
  tipo: "text" | "image" | "file" | "audio";
  contenido: string;
  createdAt: Date;
  updatedAt: Date | null;
  status: boolean;
  sender?: Usuario;
  mensajeLeidos?: MensajeLeido[];
}

// Interface para mensaje leído
interface MensajeLeido {
  id: string;
  mensaje_id: string;
  usuario_id: string;
  usuario?: Usuario;
}

// Interface para la conversación (lo que retorna tu endpoint)
export interface Conversacion {
  id: string;
  creado_por_id: string;
  tipo: "direct" | "group";
  nombre: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  status: boolean;
  miembroConversacions: MiembroConversacion[];
  // Opcional: si incluyes mensajes
  mensajes?: Mensaje[];
}
