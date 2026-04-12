import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib/prisma.js';

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.usuario.findMany({
    where: { status: true },
  });
  res.json({
    data: { users },
  });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.usuario.findFirst({
    where: { id: String(id) },
  });
  res.send({ data: { user } });
};

export const createUser = async (req: Request, res: Response) => {
  const { nombres, apellidos, email, username, password } = req.body;
  const user = await prisma.usuario.create({
    data: { nombres, apellidos, email, username, password },
  });
  res.status(201).json({
    data: {
      user,
    },
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombres, apellidos, email, username, password } = req.body;
  const user = await prisma.usuario.update({
    where: { id: String(id) },
    data: { nombres, apellidos, email, username, password, updatedAt: new Date() },
  });
  res.json({ data: { user } });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.usuario.update({
    where: { id: String(id) },
    data: { status: false },
  });
  res.status(204).json({});
};

export const getPotentialFriends = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuario_id = req.user.id;

    // Obtener IDs de usuarios con los que ya hay una solicitud activa o amistad
    const solicitudes = await prisma.solicitudAmistad.findMany({
      where: {
        OR: [{ sender_id: usuario_id }, { receiver_id: usuario_id }],
        status: true,
      },
      select: { sender_id: true, receiver_id: true },
    });

    const excluidos = new Set<string>([usuario_id]);
    for (const s of solicitudes) {
      excluidos.add(s.sender_id);
      excluidos.add(s.receiver_id);
    }

    const users = await prisma.usuario.findMany({
      where: {
        status: true,
        id: { notIn: Array.from(excluidos) },
      },
      select: {
        id: true,
        username: true,
        nombres: true,
        apellidos: true,
        imagen: true,
        biografia: true,
        email: true,
        estado_user: true,
      },
    });

    res.json({ data: { total: users.length, users } });
  } catch (err) {
    next(err);
  }
};
