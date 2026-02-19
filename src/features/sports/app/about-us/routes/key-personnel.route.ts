import express from 'express';
import { keyPersonnelController } from '../controllers/key-personnel.controller';
import { validateSchema } from '@/globals/middlewares/validate.schema.middleware';
import { uploadSingle } from '@/globals/middlewares/upload.single';
import path from 'path';
import { ROOT_PATH } from '@/globals/constants';
import { keyPersonnelSchema } from '../schemas';

const keyPersonnelRoute = express.Router();

const uploadKeyPersonnel = uploadSingle({
  dest: path.join(ROOT_PATH, '/uploads/sports/key-personnel'),
  fileSize: 2 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png'],
  fileName: (req, file) => {
    console.log(`File name: ${file.originalname}`);
    return `${Date.now()}${path.extname(file.originalname)}`;
  },
});

keyPersonnelRoute.post(
  '/',
  validateSchema(keyPersonnelSchema),
  uploadKeyPersonnel.single('newImg'),
  keyPersonnelController.create,
);
keyPersonnelRoute.get('/', keyPersonnelController.getAll);
keyPersonnelRoute.put(
  '/:id',
  validateSchema(keyPersonnelSchema),
  uploadKeyPersonnel.single('newImg'),
  keyPersonnelController.update,
);
keyPersonnelRoute.delete('/:id', keyPersonnelController.delete);
keyPersonnelRoute.put('/toggle/:id', keyPersonnelController.toggleActive);

export default keyPersonnelRoute;
