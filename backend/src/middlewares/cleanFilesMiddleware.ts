import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

export const cleanupFiles = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
  Object.values(files ?? {})
    .flat()
    .forEach((file) => {
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    });
  next(err);
};
