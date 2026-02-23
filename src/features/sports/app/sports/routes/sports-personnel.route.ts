import express from 'express';
import { sportsPersonnelController } from '../controllers/sports-personnel.controller';
import { validateSchema } from '@/globals/middlewares/validate.schema.middleware';
import { sportsPersonnelSchema } from '../schemas';

const sportsPersonnelRoute = express.Router();

sportsPersonnelRoute.post(
  '/',
  validateSchema(sportsPersonnelSchema),
  sportsPersonnelController.add,
);
sportsPersonnelRoute.get('/', sportsPersonnelController.getAll);
sportsPersonnelRoute.put('/toggle/:id', sportsPersonnelController.toggleActive);
sportsPersonnelRoute.put(
  '/:id',
  validateSchema(sportsPersonnelSchema),
  sportsPersonnelController.update,
);
sportsPersonnelRoute.delete('/:id', sportsPersonnelController.delete);

export default sportsPersonnelRoute;
