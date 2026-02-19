import express from 'express';
import { achievementsController } from '../controllers/achievements.controller';
import { validateSchema } from '@/globals/middlewares/validate.schema.middleware';
import { achievementSchema } from '../schemas';

const achievementsRoute = express.Router();

achievementsRoute.post(
  '/',
  validateSchema(achievementSchema),
  achievementsController.create,
);
achievementsRoute.get('/', achievementsController.getAll);
achievementsRoute.put(
  '/:id',
  validateSchema(achievementSchema),
  achievementsController.update,
);
achievementsRoute.delete('/:id', achievementsController.delete);
achievementsRoute.put('/toggle/:id', achievementsController.toggleActive);

export default achievementsRoute;
