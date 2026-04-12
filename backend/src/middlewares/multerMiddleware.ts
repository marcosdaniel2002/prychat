import multer from 'multer';
import path from 'path';
import fs from 'fs';

// ─── Helpers ───────────────────────────────────────────────
const createStorage = (getFolder: (fieldname: string) => string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const fullPath = path.join('media', getFolder(file.fieldname));
      fs.mkdirSync(fullPath, { recursive: true });
      cb(null, fullPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`);
    },
  });

// ─── Un solo archivo ───────────────────────────────────────
export const upload = (fieldName: string, ruta_save: string) => {
  const storage = createStorage(() => ruta_save);
  return multer({ storage }).single(fieldName);
};

// ─── Múltiples campos con rutas diferentes ─────────────────
export const uploadFields = (fields: { fieldName: string; ruta_save: string }[]) => {
  const storage = createStorage((fieldname) => {
    const field = fields.find((f) => f.fieldName === fieldname);
    return field?.ruta_save ?? 'others';
  });

  return multer({ storage }).fields(
    fields.map(({ fieldName }) => ({ name: fieldName, maxCount: 1 }))
  );
};

// ─── Solo texto, sin archivos ──────────────────────────────
export const multerMiddleware = multer().none();
