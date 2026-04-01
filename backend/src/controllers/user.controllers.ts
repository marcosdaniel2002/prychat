import { Request, Response } from 'express';
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
