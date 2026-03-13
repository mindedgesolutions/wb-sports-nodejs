import express from 'express';
import { stadiumController } from '../controllers/stadiums.controller';
import { uploadSingle } from '@/globals/middlewares/upload.single';
import path from 'path';
import { ROOT_PATH } from '@/globals/constants';
import { fileSizes, fileTypes } from '@/globals/helpers/formats.helper';

const stadiumsRoute = express.Router();

const uploadStadiumImg = uploadSingle({
  dest: path.join(ROOT_PATH, '/uploads/sports/temp'),
  fileSize: fileSizes().max2mb,
  allowedTypes: fileTypes().imageTypes,
  fileName: (req, file) => {
    return `${Date.now()}${path.extname(file.originalname)}`;
  },
});

stadiumsRoute.post(
  '/',
  uploadStadiumImg.fields([
    { name: 'newImg', maxCount: 1 },
    { name: 'newGalleryImg', maxCount: 10 },
  ]),
  stadiumController.add,
);
stadiumsRoute.get('/', stadiumController.getPaginated);
stadiumsRoute.put('/:id', stadiumController.update);
stadiumsRoute.delete('/:id', stadiumController.delete);
stadiumsRoute.put('/toggle/:id', stadiumController.toggleActive);

export default stadiumsRoute;
