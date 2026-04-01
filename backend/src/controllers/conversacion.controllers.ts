import { NextFunction, Request, Response } from 'express';
import { prisma } from '../lib/prisma.ts';
import { AppError } from '../utils/AppError.ts';
import { ROL_MIEMBRO } from '../generated/prisma/enums.ts';

export const getConversaciones = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuario_id = req.user.id;

    const conversaciones = await prisma.conversacion.findMany({
      where: {
        status: true,
        miembroConversacions: {
          some: {
            usuario_id,
            status: true,
          },
        },
      },
      include: {
        miembroConversacions: {
          where: { status: true },
          include: {
            usuario: {
              select: {
                id: true,
                username: true,
                nombres: true,
                apellidos: true,
                imagen: true,
                estado_user: true,
              },
            },
          },
        },
        mensajes: {
          where: { status: true },
          orderBy: { createdAt: 'desc' },
          take: 1, // solo el ultimo mensaje
          include: {
            sender: {
              select: { id: true, username: true, imagen: true },
            },
          },
        },
        _count: {
          select: {
            mensajes: {
              where: {
                status: true,
                mensajeLeidos: {
                  none: { usuario_id }, // MENSAJES QUE YO NO HE LEIDO
                },
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    // Para conversaciones directas, extraer el "otro" usuario
    const data = conversaciones.map((conv) => {
      const otroMiembro =
        conv.tipo === 'direct'
          ? conv.miembroConversacions.find((m) => m.usuario_id !== usuario_id)?.usuario
          : null;

      return {
        id: conv.id,
        tipo: conv.tipo,
        nombre: conv.tipo === 'direct' ? otroMiembro?.nombres : conv.nombre,
        imagen: conv.tipo === 'direct' ? otroMiembro?.imagen : null,
        estado_user: conv.tipo === 'direct' ? otroMiembro?.estado_user : null,
        miembros: conv.miembroConversacions.map((m) => m.usuario),
        ultimo_mensaje: conv.mensajes[0] ?? null,
        no_leidos: conv._count.mensajes,
      };
    });

    res.json({
      data: {
        total: data.length,
        conversaciones: data,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getConversacion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuario_id = req.user.id;
    const { id } = req.params as { id: string }; // id de la conversacion

    const conversacion = await prisma.conversacion.findUnique({
      where: {
        status: true,
        id: id,
        miembroConversacions: { some: { status: true, usuario_id: usuario_id } },
      },
      include: {
        miembroConversacions: {
          where: { status: true },
          include: {
            usuario: {
              select: {
                id: true,
                username: true,
                nombres: true,
                apellidos: true,
                imagen: true,
                estado_user: true,
              },
            },
          },
        },
        _count: {
          select: {
            mensajes: {
              where: {
                status: true,
                mensajeLeidos: {
                  none: { usuario_id }, // MENSAJES QUE YO NO HE LEIDO
                },
              },
            },
          },
        },
      },
    });

    if (!conversacion) {
      throw new AppError('Conversación no encontrada');
    }

    const otroMiembro =
      conversacion.tipo === 'direct'
        ? conversacion.miembroConversacions.find((m) => m.usuario_id !== usuario_id)?.usuario
        : null;

    res.json({
      data: {
        conversacion: {
          ...conversacion,
          nombre: conversacion.tipo === 'direct' ? otroMiembro?.nombres : conversacion.nombre,
          imagen: conversacion.tipo === 'direct' ? otroMiembro?.imagen : null,
          estado_user: conversacion.tipo === 'direct' ? otroMiembro?.estado_user : null,
          no_leidos: conversacion._count.mensajes,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export const crearConversacion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuario_id = req.user.id;
    const { nombre, miembros_ids } = req.body;
    // miembros_ids: string[] — ids de los usuarios a agregar

    // 1. Validar que venga nombre y al menos un miembro
    if (!nombre || !miembros_ids?.length) {
      throw new AppError('Nombre y al menos un miembro son requeridos');
    }

    // 2. Verificar que todos los miembros existen y son amigos del creador
    const amistades = await prisma.solicitudAmistad.findMany({
      where: {
        estado_solicitud: 'accepted',
        status: true,
        OR: [
          { sender_id: usuario_id, receiver_id: { in: miembros_ids } },
          { receiver_id: usuario_id, sender_id: { in: miembros_ids } },
        ],
      },
    });

    if (amistades.length !== miembros_ids.length) {
      throw new AppError('Solo puedes agregar amigos a un grupo');
    }

    // 3. Crear grupo con todos los miembros + el creador
    const conversacion = await prisma.conversacion.create({
      data: {
        tipo: 'group',
        nombre,
        creado_por_id: usuario_id,
        miembroConversacions: {
          create: [
            { usuario_id, rol: 'admin' }, // creador es admin
            ...miembros_ids.map((id: string) => ({
              usuario_id: id,
              rol: 'member',
            })),
          ],
        },
      },
      include: {
        miembroConversacions: {
          include: {
            usuario: {
              select: { id: true, username: true, nombres: true, imagen: true },
            },
          },
        },
      },
    });

    res.status(201).json({ data: { conversacion } });
  } catch (err) {
    next(err);
  }
};

export const agregarMiembro = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: conversacion_id } = req.params as { id: string };
    const { miembro_id } = req.body;
    const { usuario_id } = req.user.id;

    const conversacion = await prisma.conversacion.findFirst({
      where: {
        id: conversacion_id,
        status: true,
      },
      include: {
        miembroConversacions: {
          where: { status: true },
        },
      },
    });

    if (!conversacion) {
      throw new AppError('No se encontro esa conversacion');
    }

    if (conversacion.tipo !== 'group') {
      throw new AppError('No puedes agregar miembros a una conversación directa');
    }

    // 2. Verificar que quien agrega es admin del grupo
    const solicitante = conversacion.miembroConversacions.find((m) => m.usuario_id === usuario_id);

    if (!solicitante) {
      throw new AppError('No eres miembro de esta conversación', 403);
    }

    if (solicitante.rol !== 'admin') {
      throw new AppError('Solo los administradores pueden agregar miembros', 403);
    }

    // 3. Verificar que el nuevo miembro no está ya en el grupo
    const yaEsMiembro = conversacion.miembroConversacions.some((m) => m.usuario_id === miembro_id);

    if (yaEsMiembro) {
      throw new AppError('El usuario ya es miembro de esta conversación', 409);
    }

    // 4. Verificar que son amigos
    const amistad = await prisma.solicitudAmistad.findFirst({
      where: {
        estado_solicitud: 'accepted',
        status: true,
        OR: [
          { sender_id: usuario_id, receiver_id: miembro_id },
          { sender_id: miembro_id, receiver_id: usuario_id },
        ],
      },
    });

    if (!amistad) {
      throw new AppError('Solo puedes agregar amigos al grupo', 400);
    }

    // 5. Agregar miembro
    const nuevoMiembro = await prisma.miembroConversacion.create({
      data: {
        conversacion_id: conversacion_id,
        usuario_id: miembro_id,
        rol: 'member',
      },
      include: {
        usuario: {
          select: { id: true, username: true, nombres: true, apellidos: true, imagen: true },
        },
      },
    });

    res.status(201).json({ data: { nuevoMiembro } });
  } catch (err) {
    next(err);
  }
};

export const cambiarRol = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuario_id = req.user.id;
    const { id, usuarioId: miembro_id } = req.params as { id: string; usuarioId: string };
    const { rol } = req.body as { rol: 'member' | 'admin' };

    if (!rol || !Object.values(ROL_MIEMBRO).includes(rol)) {
      throw new AppError(`Rol inválido, debe ser: ${Object.values(ROL_MIEMBRO).join(' | ')}`, 400);
    }

    const conversacion = await prisma.conversacion.findFirst({
      where: {
        id,
        status: true,
      },
      include: {
        miembroConversacions: {
          where: { status: true },
        },
      },
    });

    if (!conversacion) {
      throw new AppError('No se encontro esa conversacion');
    }

    if (conversacion.tipo !== 'group') {
      throw new AppError('Solo puedes cambiar rol en grupos');
    }

    // 2. Verificar que quien cambiar rol es admin
    const solicitante = conversacion.miembroConversacions.find((m) => m.usuario_id === usuario_id);

    if (!solicitante) {
      throw new AppError('No eres miembro de esta conversación', 403);
    }

    if (solicitante.rol !== 'admin') {
      throw new AppError('Solo los administradores pueden cambiar roles', 403);
    }

    // 3. Verificar que exista el miembro
    const miembro = conversacion.miembroConversacions.find((m) => m.usuario_id === miembro_id);

    if (!miembro) {
      throw new AppError('El usuario no es miembro de esta conversacion', 409);
    }

    // 4. No puede cambiar su propio rol
    if (usuario_id === miembro_id) {
      throw new AppError('No puedes cambiar tu propio rol', 400);
    }

    // 5. No puede cambiar el rol del creador del grupo
    if (conversacion.creado_por_id === miembro_id) {
      throw new AppError('No puedes cambiar el rol del creador del grupo', 403);
    }

    // 6.
    if (miembro.rol === rol) {
      throw new AppError(`El usuario ya tiene el rol ${rol}`, 400);
    }

    // EDITAR
    const miembroUpdated = await prisma.miembroConversacion.update({
      where: { id: miembro.id },
      data: { rol },
      include: {
        usuario: {
          select: { id: true, username: true, nombres: true, apellidos: true, imagen: true },
        },
      },
    });

    res
      .status(201)
      .json({ data: { miembro: miembroUpdated, rol_anterior: miembro.rol, rol_nuevo: rol } });
  } catch (err) {
    next(err);
  }
};

export const removerMiembro = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuario_id = req.user.id;
    const { id, usuarioId } = req.params as { id: string; usuarioId: string };

    // 1. Verificar que la conversación existe y es grupo
    const conversacion = await prisma.conversacion.findUnique({
      where: { id, status: true },
      include: {
        miembroConversacions: {
          where: { status: true },
        },
      },
    });

    if (!conversacion) {
      throw new AppError('Conversación no encontrada', 404);
    }

    if (conversacion.tipo !== 'group') {
      throw new AppError('No puedes remover miembros de una conversación directa', 400);
    }

    // 2. Verificar que quien remueve es admin o se está removiendo a sí mismo (salir del grupo)
    const solicitante = conversacion.miembroConversacions.find((m) => m.usuario_id === usuario_id);

    if (!solicitante) {
      throw new AppError('No eres miembro de esta conversación', 403);
    }

    const seSaleElMismo = usuario_id === usuarioId;

    if (!seSaleElMismo && solicitante.rol !== 'admin') {
      throw new AppError('Solo los administradores pueden remover miembros', 403);
    }

    // 3. Verificar que el objetivo existe en el grupo
    const miembroObjetivo = conversacion.miembroConversacions.find(
      (m) => m.usuario_id === usuarioId
    );

    if (!miembroObjetivo) {
      throw new AppError('El usuario no es miembro de esta conversación', 404);
    }

    // 4. No se puede remover al creador del grupo
    if (conversacion.creado_por_id === usuarioId && !seSaleElMismo) {
      throw new AppError('No puedes remover al creador del grupo', 403);
    }

    // 5. Si el creador se va, debe haber otro admin
    if (seSaleElMismo && conversacion.creado_por_id === usuario_id) {
      const otroAdmin = conversacion.miembroConversacions.find(
        (m) => m.usuario_id !== usuario_id && m.rol === 'admin'
      );
      if (!otroAdmin) {
        throw new AppError('Debes asignar otro administrador antes de salir', 400);
      }
    }

    // 6. Soft delete del miembro
    await prisma.miembroConversacion.update({
      where: { id: miembroObjetivo.id },
      data: { status: false },
    });

    res.json({});
  } catch (err) {
    next(err);
  }
};

export const eliminarConversacion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuario_id = req.user.id;
    const { id } = req.params as { id: string };

    // 1. Verificar que la conversación existe
    const conversacion = await prisma.conversacion.findUnique({
      where: { id, status: true },
      include: {
        miembroConversacions: {
          where: { status: true },
        },
      },
    });

    if (!conversacion) {
      throw new AppError('Conversación no encontrada', 404);
    }

    // 2. Verificar que es miembro
    const solicitante = conversacion.miembroConversacions.find((m) => m.usuario_id === usuario_id);

    if (!solicitante) {
      throw new AppError('No eres miembro de esta conversación', 403);
    }

    // 3. En grupos solo el creador puede archivar
    if (conversacion.tipo === 'group' && conversacion.creado_por_id !== usuario_id) {
      throw new AppError('Solo el creador puede archivar el grupo', 403);
    }

    // 4. Eliminar conversacion
    await prisma.conversacion.update({
      where: { id },
      data: { status: false },
    });

    res.json({});
  } catch (err) {
    next(err);
  }
};
