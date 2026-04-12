import { Request, Response, NextFunction } from 'express';

import { prisma } from '../lib/prisma.ts';
import { AppError } from '../utils/AppError.ts';
import { usuariosConectados } from '../sockets/index.socket.ts';
import { io } from '../index.ts';

export const getSolicitudesRecibidas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const receiver_id = req.user.id;

    const solicitudes = await prisma.solicitudAmistad.findMany({
      where: {
        receiver_id,
        estado_solicitud: 'pending',
        status: true,
      },
      include: {
        sender: {
          select: { id: true, username: true, nombres: true, apellidos: true, imagen: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      data: {
        total: solicitudes.length,
        solicitudes,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getSolicitudesEnviadas = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sender_id = req.user.id;

    const solicitudes = await prisma.solicitudAmistad.findMany({
      where: {
        sender_id,
        estado_solicitud: 'pending',
        status: true,
      },
      include: {
        receiver: {
          select: { id: true, username: true, nombres: true, apellidos: true, imagen: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      data: {
        total: solicitudes.length,
        solicitudes,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const enviarSolicitud = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sender_id = req.user.id;
    const { receiver_id } = req.body;

    if (sender_id === receiver_id) {
      throw new AppError('No puedes enviarte una solicitud a ti mismo');
    }

    // 2. Verificar que el receptor existe
    const receptor = await prisma.usuario.findUnique({
      where: { id: receiver_id, status: true },
    });

    if (!receptor) {
      throw new AppError('Usuario no encontrado');
    }

    // 3. Verificar que no exista ya una solicitud entre ambos
    const solicitudExistente = await prisma.solicitudAmistad.findFirst({
      where: {
        OR: [
          { sender_id, receiver_id },
          { sender_id: receiver_id, receiver_id: sender_id },
        ],
        status: true,
      },
    });

    if (solicitudExistente) {
      const mensajes = {
        pending: 'Ya existe una solicitud pendiente entre ambos',
        accepted: 'Ya son amigos',
        rejected: 'La solicitud fue rechazada anteriormente',
      };
      throw new AppError(mensajes[solicitudExistente.estado_solicitud]);
    }

    // 4. Crear la solicitud
    const solicitud = await prisma.solicitudAmistad.create({
      data: { sender_id, receiver_id },
      include: {
        receiver: {
          select: {
            id: true,
            username: true,
            nombres: true,
            imagen: true,
            apellidos: true,
            biografia: true,
            email: true,
          },
        },
      },
    });

    // SOCKET NOTIFICAR AL RECEPTOR
    const socketId = usuariosConectados.get(receiver_id);
    if (socketId) {
      console.log('SE ENCONTRO USUARIO CONECTADO');
      const count = await prisma.solicitudAmistad.count({
        where: {
          receiver_id,
          estado_solicitud: 'pending',
          status: true,
        },
      });
      io.to(socketId).emit('solicitud:nueva', { count: count });
    }

    res.json({
      data: {
        solicitud,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const aceptarSolicitud = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuario_id = req.user.id;
    const { id } = req.params as { id: string }; // id de la solicitud

    // 1. Buscar la solicitud
    const solicitud = await prisma.solicitudAmistad.findUnique({
      where: { id, status: true },
    });

    if (!solicitud) {
      throw new AppError('Solicitud no encontrada', 404);
    }

    // 2. Solo el receptor puede aceptar
    if (solicitud.receiver_id !== usuario_id) {
      throw new AppError('No tienes permiso para aceptar esta solicitud', 403);
    }

    // 3. Solo se puede aceptar si está pendiente
    if (solicitud.estado_solicitud !== 'pending') {
      const mensajes = {
        accepted: 'La solicitud ya fue aceptada',
        rejected: 'La solicitud ya fue rechazada',
      };
      throw new AppError(mensajes[solicitud.estado_solicitud]);
    }

    // 4. Aceptar solicitud + crear conversación directa en una transacción
    const [solicitudActualizada, conversacion] = await prisma.$transaction([
      prisma.solicitudAmistad.update({
        where: { id },
        data: {
          estado_solicitud: 'accepted',
          responded_at: new Date(),
        },
        include: {
          sender: {
            select: { id: true, username: true, nombres: true, imagen: true },
          },
        },
      }),

      prisma.conversacion.create({
        data: {
          creado_por_id: usuario_id,
          tipo: 'direct',
          miembroConversacions: {
            create: [
              { usuario_id: solicitud.sender_id, rol: 'member' },
              { usuario_id: solicitud.receiver_id, rol: 'member' },
            ],
          },
        },
      }),
    ]);

    res.json({
      data: {
        solicitud: solicitudActualizada,
        conversacion,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const rechazarSolicitud = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuario_id = req.user.id;
    const { id } = req.params as { id: string }; // id de la solicitud

    // 1. Buscar la solicitud
    const solicitud = await prisma.solicitudAmistad.findUnique({
      where: { id, status: true },
    });

    if (!solicitud) {
      throw new AppError('Solicitud no encontrada', 404);
    }

    // 2. Solo el receptor puede rechazar
    if (solicitud.receiver_id !== usuario_id) {
      throw new AppError('No tienes permiso para rechazar esta solicitud', 403);
    }

    // 3. Solo se puede rechazar si está pendiente
    if (solicitud.estado_solicitud !== 'pending') {
      const mensajes = {
        accepted: 'La solicitud ya fue aceptada',
        rejected: 'La solicitud ya fue rechazada',
      };
      throw new AppError(mensajes[solicitud.estado_solicitud]);
    }

    // 4. Rechazar
    const solicitudActualizada = await prisma.solicitudAmistad.update({
      where: { id },
      data: {
        estado_solicitud: 'rejected',
        responded_at: new Date(),
      },
      include: {
        sender: {
          select: { id: true, username: true, nombres: true, imagen: true },
        },
      },
    });

    res.json({
      data: { solicitud: solicitudActualizada },
    });
  } catch (err) {
    next(err);
  }
};

export const cancelarSolicitud = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sender_id = req.user.id;
    const { id } = req.params as { id: string };

    const solicitud = await prisma.solicitudAmistad.findUnique({
      where: { id, status: true },
    });

    if (!solicitud) {
      throw new AppError('Solicitud no encontrada', 404);
    }

    // Solo el sender puede cancelar
    if (solicitud.sender_id !== sender_id) {
      throw new AppError('No tienes permiso para cancelar esta solicitud', 403);
    }

    if (solicitud.estado_solicitud !== 'pending') {
      const mensajes = {
        accepted: 'No puedes cancelar una solicitud ya aceptada',
        rejected: 'No puedes cancelar una solicitud ya rechazada',
      };
      throw new AppError(mensajes[solicitud.estado_solicitud]);
    }

    await prisma.solicitudAmistad.update({
      where: { id },
      data: { status: false },
    });

    res.json({ message: 'Solicitud cancelada' });
  } catch (err) {
    next(err);
  }
};

// CONSULTAS LIGERAS
export const countSolicitudesPendientes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const count = await prisma.solicitudAmistad.count({
      where: {
        receiver_id: req.user.id,
        estado_solicitud: 'pending',
        status: true,
      },
    });
    res.json({ data: { count } });
  } catch (err) {
    next(err);
  }
};
