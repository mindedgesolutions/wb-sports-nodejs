import express from 'express';
import path from 'path';
import { ROOT_PATH } from '@/globals/constants';
import { fileSizes, fileTypes } from '@/globals/helpers/formats.helper';
import { uploadSingle } from '@/globals/middlewares/upload.single';
import { advertisementsController } from '../controllers/advertisements.controller';

const advertisementsRoute = express.Router();

const uploadDocument = uploadSingle({
  dest: path.join(ROOT_PATH, '/uploads/sports/advertisements'),
  fileSize: fileSizes().max10mb,
  allowedTypes: fileTypes().documentTypes,
  fileName: (req, file) => {
    return `${Date.now()}${path.extname(file.originalname)}`;
  },
});

advertisementsRoute.post(
  '/',
  uploadDocument.single('newFile'),
  advertisementsController.add,
);
advertisementsRoute.get('/', advertisementsController.getPaginated);
advertisementsRoute.put(
  '/:id',
  uploadDocument.single('newFile'),
  advertisementsController.update,
);
advertisementsRoute.delete('/:id', advertisementsController.delete);
advertisementsRoute.put('/toggle/:id', advertisementsController.toggleActive);
advertisementsRoute.get('/download/:id', advertisementsController.download);

export default advertisementsRoute;
