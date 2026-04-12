import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

export const resolveFileResult = async (
  req: Request,
  fields: { fieldName: string; ruta_save?: string }[]
) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const result: Record<string, string | null> = {};

  for (const { fieldName } of fields) {
    const newFile = files?.[fieldName]?.[0];
    const removeFile = req.body[`_remove_${fieldName}`] === 'true';
    const currentPath = req.currentFiles?.[fieldName] ?? null;

    if ((newFile || removeFile) && currentPath?.startsWith('media/')) {
      const oldPath = path.join(process.cwd(), currentPath);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    result[fieldName] = newFile
      ? newFile.path.replaceAll('\\', '/')
      : removeFile
        ? null
        : currentPath;
  }

  return result;
};
