import express from 'express';
import { sportsPersonnelController } from '../controllers/sports-personnel.controller';

const sportsPersonnelRoute = express.Router();

sportsPersonnelRoute.post('/', sportsPersonnelController.add);
sportsPersonnelRoute.get('/', sportsPersonnelController.getAll);
sportsPersonnelRoute.put('/:id', sportsPersonnelController.update);
sportsPersonnelRoute.delete('/:id', sportsPersonnelController.delete);
sportsPersonnelRoute.put(
  '/:id/toggle-active',
  sportsPersonnelController.toggleActive,
);

export default sportsPersonnelRoute;
