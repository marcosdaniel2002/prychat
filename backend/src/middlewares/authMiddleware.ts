import { Request, Response, NextFunction } from 'express';

import { AppError } from '../utils/AppError.ts';
import { prisma } from '../lib/prisma.ts';
import verifyToken from '../utils/verifyToken.ts';

// READ THE TOKEN FROM THE REQUEST
export const authMiddleware = async function (req: Request, res: Response, next: NextFunction) {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      throw new AppError('Not authorized, no token provided', 401);
    }

    // VERIFY TOKEN
    const user = verifyToken(token);

    if (!user) {
      throw new AppError('Not authorized, user not exist', 401);
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
