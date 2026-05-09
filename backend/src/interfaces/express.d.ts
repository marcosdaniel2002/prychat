// src/types/express.d.ts

import { Usuario } from '../generated/prisma/client.js';

declare global {
  namespace Express {
    interface Request {
      // authenticacion
      user?: Usuario;
      // archivos
      files?: Record<string, import('multer').File[]> | import('multer').File[];
      currentFiles?: Record<string, string | null>;
      fileResult?: Record<string, string | null>;
    }
  }
}
