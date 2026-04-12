import { Server } from 'socket.io';
import { prisma } from '../lib/prisma.ts';
import { statusHandler } from './handlers/status.handler.ts';
import verifyToken from '../utils/verifyToken.ts';
import { mensajeHandler } from './handlers/mensaje.handler.ts';

export const usuariosConectados = new Map<string, string>();

export function setupSockets(io: Server) {
  io.use(async (socket, next) => {
    try {
      const cookie = socket.handshake.headers.cookie;
      const token = cookie
        ?.split(';')
        .find((c) => c.trim().startsWith('jwt='))
        ?.split('=')[1];

      if (!token) return next(new Error('Token requerido'));

      const user = await verifyToken(token);
      socket.data.user = user;
      next();
    } catch {
      next(new Error('Token inválido'));
    }
  });

  io.on('connection', async (socket) => {
    const usuario_id = socket.data.user.id;

    // Inicialización
    usuariosConectados.set(usuario_id, socket.id);
    console.log(`Usuario conectado: ${usuario_id}`);
    await prisma.usuario.update({
      where: { id: usuario_id },
      data: { estado_user: 'online' },
    });

    await notificarContactos(io, usuario_id, 'online');

    const miembroEn = await prisma.miembroConversacion.findMany({
      where: { usuario_id, status: true },
      select: { conversacion_id: true },
    });
    miembroEn.forEach((m) => socket.join(m.conversacion_id));

    // Registrar handlers
    statusHandler(io, socket);
    mensajeHandler(io, socket);

    // Desconexión
    socket.on('disconnect', async () => {
      usuariosConectados.delete(usuario_id);

      await prisma.usuario.update({
        where: { id: usuario_id },
        data: { estado_user: 'offline', updatedAt: new Date() },
      });

      await notificarContactos(io, usuario_id, 'offline');
    });
  });
}

// Helper compartido
export async function notificarContactos(io: Server, usuario_id: string, estado: string) {
  const amistades = await prisma.solicitudAmistad.findMany({
    where: {
      estado_solicitud: 'accepted',
      status: true,
      OR: [{ sender_id: usuario_id }, { receiver_id: usuario_id }],
    },
  });

  amistades.forEach((amistad) => {
    const contacto_id = amistad.sender_id === usuario_id ? amistad.receiver_id : amistad.sender_id;

    const socketId = usuariosConectados.get(contacto_id);
    if (socketId) {
      io.to(socketId).emit('user:status_changed', { usuario_id, estado });
    }
  });
}
