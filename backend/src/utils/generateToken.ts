import { Response } from 'express';
import jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';

export const generateToken = function (userId: string, res: Response) {
  const payload = { id: userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as StringValue,
  });
  res.cookie('jwt', token, {
    httpOnly: true, // USER BROWSER CANT USE JAVASCRIPT TO ACCESS IT
    secure: process.env.DEBUG === 'false',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};
