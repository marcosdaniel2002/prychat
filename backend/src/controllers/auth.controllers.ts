import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

import { prisma } from '../lib/prisma.js';
import { AppError } from '../utils/AppError.ts';
import { generateToken } from '../utils/generateToken.ts';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
