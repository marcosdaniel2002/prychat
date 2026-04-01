import { Socket, Server } from 'socket.io';

export const mensajeHandler = (io: Server, socket: Socket) => {
  // Cliente abre una conversación → setea cuál está activa
  socket.on('conversation:open', ({ conversacion_id }: { conversacion_id: string }) => {
    socket.data.conversacion_activa = conversacion_id;
  });

  // Cliente cierra o cambia de conversación
  socket.on('conversation:close', () => {
    socket.data.conversacion_activa = null;
  });

  socket.on('message:read', async ({ mensaje_id }: { mensaje_id: string }) => {
    const conversacion_id = socket.data.conversacion_activa;

    if (!conversacion_id) return; // no hay conversación activa

    socket.to(conversacion_id).emit('message:read', {
      mensaje_id,
      usuario_id: socket.data.user.id,
    });
  });
};
