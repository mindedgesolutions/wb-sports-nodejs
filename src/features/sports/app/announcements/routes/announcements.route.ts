import express from 'express';
import { announcementsController } from '../controllers/announcements.controller';
import { uploadSingle } from '@/globals/middlewares/upload.single';
import path from 'path';
import { ROOT_PATH } from '@/globals/constants';
import { fileSizes, fileTypes } from '@/globals/helpers/formats.helper';
import { validateSchema } from '@/globals/middlewares/validate.schema.middleware';
import { announcementSchema } from '../schemas';

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
  validateSchema(announcementSchema),
  uploadDocument.single('newFile'),
  announcementsController.add,
);
announcementsRoute.get('/', announcementsController.getPaginated);
announcementsRoute.put(
  '/:id',
  validateSchema(announcementSchema),
  uploadDocument.single('newFile'),
  announcementsController.update,
);
announcementsRoute.delete('/:id', announcementsController.delete);
announcementsRoute.put('/toggle/:id', announcementsController.toggleActive);
announcementsRoute.get('/download/:id', announcementsController.download);

export default announcementsRoute;
