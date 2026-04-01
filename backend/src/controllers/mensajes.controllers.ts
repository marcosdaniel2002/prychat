import { NextFunction, Request, Response } from 'express';
import { prisma } from '../lib/prisma.ts';
import { AppError } from '../utils/AppError.ts';
import { io } from '../index.ts';

export const getMensajes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuario_id = req.user.id;
    const conversacion_id = req.query.conversacion_id as string | undefined;
    const take = Number(req.query.limit) || 20;
    const cursor = req.query.cursor as string | undefined;

    if (!conversacion_id) {
      throw new AppError('conversacion_id es requerido', 400);
    }

    // Verificar que es miembro
    const esMiembro = await prisma.miembroConversacion.findFirst({
      where: { conversacion_id: conversacion_id, usuario_id, status: true },
    });

    if (!esMiembro) {
      throw new AppError('No tienes acceso a esta conversación', 403);
    }

    const mensajes = await prisma.mensaje.findMany({
      where: { conversacion_id: conversacion_id, status: true },
      orderBy: { createdAt: 'desc' },
      take,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
      include: {
        sender: { select: { id: true, username: true, imagen: true } },
        reply_to: {
          select: {
            id: true,
            contenido: true,
            sender: { select: { id: true, username: true } },
          },
        },
      },
    });

    const ultimoMensaje = mensajes.at(-1);
    const nextCursor = mensajes.length === take ? (ultimoMensaje?.id ?? null) : null;

    res.json({
      data: {
        mensajes: mensajes.reverse(),
        nextCursor,
        hasMore: nextCursor !== null,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getMensajesNoLeidos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuario_id = req.user.id;
    const conversacion_id = req.query.conversacion_id as string | undefined;

    if (!conversacion_id) {
      throw new AppError('conversacion_id es requerido', 400);
    }

    // 1. Verificar que es miembro
    const esMiembro = await prisma.miembroConversacion.findFirst({
      where: { conversacion_id, usuario_id, status: true },
    });

    if (!esMiembro) {
      throw new AppError('No tienes acceso a esta conversación', 403);
    }

    // 2. Contar y traer mensajes no leídos
    const mensajes = await prisma.mensaje.findMany({
      where: {
        conversacion_id,
        status: true,
        sender_id: { not: usuario_id }, // no contar mis propios mensajes
        mensajeLeidos: {
          none: { usuario_id },
        },
      },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: { select: { id: true, username: true, imagen: true } },
      },
    });

    res.json({
      data: {
        total: mensajes.length,
        mensajes,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const enviarMensaje = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sender_id = req.user.id;
    const { conversacion_id, contenido, tipo, reply_to_id } = req.body;

    // 1. Validar campos requeridos
    if (!conversacion_id || !contenido) {
      throw new AppError('conversacion_id y contenido son requeridos', 400);
    }

    // 2. Verificar que es miembro
    const esMiembro = await prisma.miembroConversacion.findFirst({
      where: { conversacion_id, usuario_id: sender_id, status: true },
    });

    if (!esMiembro) {
      throw new AppError('No tienes acceso a esta conversación', 403);
    }

    // 3. Si hay reply_to_id verificar que el mensaje existe y es de la misma conversación
    if (reply_to_id) {
      const mensajePadre = await prisma.mensaje.findUnique({
        where: { id: reply_to_id, status: true },
      });

      if (!mensajePadre) {
        throw new AppError('El mensaje al que respondes no existe', 404);
      }

      if (mensajePadre.conversacion_id !== conversacion_id) {
        throw new AppError('El mensaje no pertenece a esta conversación', 400);
      }
    }

    // 4. Crear mensaje
    const mensaje = await prisma.mensaje.create({
      data: {
        conversacion_id,
        sender_id,
        contenido,
        tipo: tipo ?? 'text',
        reply_to_id: reply_to_id ?? null,
      },
      include: {
        sender: { select: { id: true, username: true, imagen: true } },
        reply_to: {
          select: {
            id: true,
            contenido: true,
            sender: { select: { id: true, username: true } },
          },
        },
      },
    });

    // 5. Actualizar updatedAt de la conversación (para ordenar en getMisConversaciones)
    await prisma.conversacion.update({
      where: { id: conversacion_id },
      data: { updatedAt: new Date() },
    });

    // Enviar a TODOS incluyendo sender
    io.to(conversacion_id).emit('message:new', mensaje);

    res.status(201).json({ data: { mensaje } });
  } catch (err) {
    next(err);
  }
};

export const marcarLeido = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuario_id = req.user.id;
    const { id } = req.params as { id: string }; // mensaje_id

    // 1. Verificar que el mensaje existe
    const mensaje = await prisma.mensaje.findUnique({
      where: { id, status: true },
    });

    if (!mensaje) {
      throw new AppError('Mensaje no encontrado', 404);
    }

    // 2. Verificar que es miembro de la conversación
    const esMiembro = await prisma.miembroConversacion.findFirst({
      where: { conversacion_id: mensaje.conversacion_id, usuario_id, status: true },
    });

    if (!esMiembro) {
      throw new AppError('No tienes acceso a este mensaje', 403);
    }

    // 3. No marcar como leído tus propios mensajes
    if (mensaje.sender_id === usuario_id) {
      throw new AppError('No puedes marcar como leído tu propio mensaje', 400);
    }

    // 4. Verificar que no esté ya marcado como leído
    const yaLeido = await prisma.mensajeLeido.findFirst({
      where: { mensaje_id: id, usuario_id },
    });

    if (yaLeido) {
      res.json({ data: { message: 'El mensaje ya estaba marcado como leído' } });
      return;
    }

    // 5. Crear registro de lectura
    const mensajeLeido = await prisma.mensajeLeido.create({
      data: { mensaje_id: id, usuario_id },
    });

    res.status(201).json({ data: { mensajeLeido } });
  } catch (err) {
    next(err);
  }
};

export const eliminarMensaje = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuario_id = req.user.id;
    const { id } = req.params as { id: string };

    // 1. Verificar que el mensaje existe
    const mensaje = await prisma.mensaje.findUnique({
      where: { id, status: true },
    });

    if (!mensaje) {
      throw new AppError('Mensaje no encontrado', 404);
    }

    // 2. Solo el sender puede eliminar su propio mensaje
    if (mensaje.sender_id !== usuario_id) {
      throw new AppError('Solo puedes eliminar tus propios mensajes', 403);
    }

    // 3. Soft delete
    await prisma.mensaje.update({
      where: { id },
      data: { status: false },
    });

    res.json({ data: { message: 'Mensaje eliminado' } });
  } catch (err) {
    next(err);
  }
};
