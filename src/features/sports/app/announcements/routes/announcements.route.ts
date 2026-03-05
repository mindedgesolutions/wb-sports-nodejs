import express from 'express';
import { announcementsController } from '../controllers/announcements.controller';
import { uploadSingle } from '@/globals/middlewares/upload.single';
import path from 'path';
import { ROOT_PATH } from '@/globals/constants';
import { fileSizes, fileTypes } from '@/globals/helpers/formats.helper';

const announcementsRoute = express.Router();

const uploadDocument = uploadSingle({
  dest: path.join(ROOT_PATH, '/uploads/sports/announcements'),
  fileSize: fileSizes().max10mb,
  allowedTypes: fileTypes().documentTypes,
  fileName: (req, file) => {
    return `${Date.now()}${path.extname(file.originalname)}`;
  },
});

announcementsRoute.post(
  '/',
  uploadDocument.single('file'),
  announcementsController.add,
);
announcementsRoute.get('/', announcementsController.getPaginated);
announcementsRoute.put(
  '/:id',
  uploadDocument.single('file'),
  announcementsController.update,
);
announcementsRoute.delete('/:id', announcementsController.delete);
announcementsRoute.put('/:id/toggle', announcementsController.toggleActive);

export default announcementsRoute;
