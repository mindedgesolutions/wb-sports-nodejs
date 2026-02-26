import express from 'express';
import { advisoryWorkingController } from '../controllers/advisory-working.controller';
import { validateSchema } from '@/globals/middlewares/validate.schema.middleware';
import { wbsCouncilMemberSchema } from '../schemas';
import { uploadSingle } from '@/globals/middlewares/upload.single';
import path from 'path';
import { ROOT_PATH } from '@/globals/constants';

const advisoryWorkingRoute = express.Router();

const uploadMemberImg = uploadSingle({
  dest: path.join(ROOT_PATH, '/uploads/sports/wbs-council-members'),
  fileSize: 2 * 1024 * 1024,
  allowedTypes: ['image/jpeg', 'image/png'],
  fileName: (req, file) => {
    return `${Date.now()}${path.extname(file.originalname)}`;
  },
});

advisoryWorkingRoute.post(
  '/',
  validateSchema(wbsCouncilMemberSchema),
  uploadMemberImg.single('newImg'),
  advisoryWorkingController.add,
);
advisoryWorkingRoute.get('/', advisoryWorkingController.getPaginated);
advisoryWorkingRoute.put(
  '/:id',
  validateSchema(wbsCouncilMemberSchema),
  advisoryWorkingController.update,
);
advisoryWorkingRoute.delete('/:id', advisoryWorkingController.delete);
advisoryWorkingRoute.put('/toggle/:id', advisoryWorkingController.toggleActive);

export default advisoryWorkingRoute;
