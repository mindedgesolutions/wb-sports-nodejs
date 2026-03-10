import { ROOT_PATH } from '@/globals/constants';
import { fileSizes, fileTypes } from '@/globals/helpers/formats.helper';
import { uploadSingle } from '@/globals/middlewares/upload.single';
import express from 'express';
import path from 'path';
import { awardsController } from '../controllers/awards.controller';

const awardsRoute = express.Router();

const uploadDocument = uploadSingle({
  dest: path.join(ROOT_PATH, '/uploads/sports/awards'),
  fileSize: fileSizes().max10mb,
  allowedTypes: fileTypes().documentTypes,
  fileName: (req, file) => {
    return `${Date.now()}${path.extname(file.originalname)}`;
  },
});

awardsRoute.post('/', uploadDocument.single('newFile'), awardsController.add);
awardsRoute.get('/', awardsController.getPaginated);
awardsRoute.put(
  '/:id',
  uploadDocument.single('newFile'),
  awardsController.update,
);
awardsRoute.delete('/:id', awardsController.delete);
awardsRoute.put('/toggle/:id', awardsController.toggleActive);
awardsRoute.get('/download/:id', awardsController.download);

export default awardsRoute;
