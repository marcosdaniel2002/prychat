// sockets/handlers/status.handler.ts
import { Socket, Server } from 'socket.io';
import { prisma } from '../../lib/prisma.ts';
import { notificarContactos } from '../index.socket.ts';

export const statusHandler = (io: Server, socket: Socket) => {
  socket.on('user:status', async (estado: string) => {
    const usuario_id = socket.data.user.id;
    const estadosValidos = ['online', 'offline', 'away', 'busy'];

    if (!estadosValidos.includes(estado)) return;

    await prisma.usuario.update({
      where: { id: usuario_id },
      data: { estado_user: estado as any },
    });

    await notificarContactos(io, usuario_id, estado);
  });
};
