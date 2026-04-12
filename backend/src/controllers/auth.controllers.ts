import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

import { prisma } from '../lib/prisma.js';
import { AppError } from '../utils/AppError.ts';
import { generateToken } from '../utils/generateToken.ts';
import verifyToken from '../utils/verifyToken.ts';
import { resolveFileResult } from '../utils/resolveFile.ts';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // res.json('testsksks');
    const { nombres, apellidos, email, username, password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
      throw new AppError('Las contraseñas no coinciden');
    }

    const existingEmail = await prisma.usuario.findUnique({ where: { email } });
    if (existingEmail) {
      throw new AppError('El email ya está en uso', 409, 'EMAIL_TAKEN');
    }

    const existingUsername = await prisma.usuario.findUnique({ where: { username } });
    if (existingUsername) {
      throw new AppError('El username ya está en uso', 409, 'USERNAME_TAKEN');
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE A USER
    const user = await prisma.usuario.create({
      data: {
        nombres,
        apellidos,
        email,
        username,
        password: hashedPassword,
      },
    });

    // GENERATE JWT TOKEN
    generateToken(user.id, res);

    const { password: passwordBD, createdAt, updatedAt, status, ...rest } = user;

    res.json({
      data: {
        user: rest,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.usuario.findUnique({ where: { username, status: true } });
    if (!user) {
      throw new AppError('Invalid email or password');
    }

    // VERIFY PASSWORD
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password');
    }

    // GENERATE JWT TOKEN
    generateToken(user.id, res);

    const { password: passwordBD, createdAt, updatedAt, status, ...rest } = user;

    res.json({
      data: {
        user: rest,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });

    res.json({});
  } catch (err) {
    next(err);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) throw new AppError('No autenticado', 401);
    // VERIFY TOKEN
    const user = await verifyToken(token);
    if (!user) throw new AppError('Usuario no encontrado', 404);

    const { password: passwordBD, createdAt, updatedAt, status, ...rest } = user;
    res.json({ data: { user: rest } });
  } catch (err) {
    next(err);
  }
};

export const updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentUser = await prisma.usuario.findUnique({
      where: { id: req.user.id, status: true },
      select: { imagen: true },
    });

    if (!currentUser) throw new AppError('Usuario no encontrado');

    req.currentFiles = { imagen: currentUser.imagen ?? null };

    const { imagen } = await resolveFileResult(req, [{ fieldName: 'imagen' }]);

    const updatedUser = await prisma.usuario.update({
      where: { id: req.user.id },
      data: { imagen: imagen ?? null },
    });

    const { password, createdAt, updatedAt, status, ...rest } = updatedUser;
    res.json({ data: { user: rest } });
  } catch (err) {
    next(err);
  }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) throw new AppError('Las contraseñas no coinciden', 400);

    const currentUser = await prisma.usuario.findUnique({
      where: { id: req.user!.id, status: true },
    });

    if (!currentUser) throw new AppError('Usuario no encontrado');

    const isMatch = await bcrypt.compare(currentPassword, currentUser.password);
    if (!isMatch) throw new AppError('La contraseña actual es incorrecta', 400);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedUser = await prisma.usuario.update({
      where: { id: req.user.id },
      data: { password: hashedPassword },
    });

    const { password, createdAt, updatedAt, status, ...rest } = updatedUser;

    res.json({
      data: {
        user: rest,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, username, biography } = req.body;

    const currentUser = await prisma.usuario.findUnique({
      where: { id: req.user!.id, status: true },
    });

    if (!currentUser) throw new AppError('Usuario no encontrado');

    // Verificar si el username ya existe en otro usuario
    if (username && username !== currentUser.username) {
      const usernameExists = await prisma.usuario.findUnique({
        where: { username },
      });
      if (usernameExists) throw new AppError('El username ya está en uso', 400);
    }

    const updatedUser = await prisma.usuario.update({
      where: { id: req.user!.id },
      data: {
        nombres: firstName,
        apellidos: lastName,
        username,
        biografia: biography,
      },
    });

    const { password, createdAt, updatedAt, status, ...rest } = updatedUser;
    res.json({ data: { user: rest } });
  } catch (err) {
    next(err);
  }
};
