import multer, { StorageEngine, FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

export interface UploadOptions {
  dest: string;
  fileSize?: number;
  allowedTypes?: string[];
  fileName?: (req: Request, file: Express.Multer.File) => string;
}

export function uploadSingle(options: UploadOptions) {
  const rootPath = path.resolve(process.cwd());
  const {
    dest,
    fileSize = 2 * 1024 * 1024,
    allowedTypes = ['image/jpeg', 'image/png'],
    fileName,
  } = options;

  // ensure directory exists
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => cb(null, dest),

    filename: (req, file, cb) => {
      if (fileName) {
        return cb(null, fileName(req, file));
      }

      const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);

      cb(null, unique + path.extname(file.originalname));
    },
  });

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'));
    }
    cb(null, true);
  };

  return multer({
    storage,
    limits: { fileSize },
    fileFilter,
  });
}
