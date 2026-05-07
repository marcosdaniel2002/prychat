import { Usuario } from "../auth/usuario.types";

interface ReplyToMessage {
  id: string;
  contenido: string;
  sender: Usuario;
}

export interface Mensaje {
  id: string;
  contenido: string;
  conversacion_id: string;
  sender_id: string;
  reply_to_id: string | null;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  sender: Usuario;
  reply_to: ReplyToMessage | null;
  mensajeLeidos: { usuario_id: string }[];
}
