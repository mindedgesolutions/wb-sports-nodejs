import express from 'express';
import { sportsPersonnelController } from '../controllers/sports-personnel.controller';

const sportsPersonnelRoute = express.Router();

sportsPersonnelRoute.post('/', sportsPersonnelController.add);
sportsPersonnelRoute.get('/', sportsPersonnelController.getAll);
sportsPersonnelRoute.put('/toggle/:id', sportsPersonnelController.toggleActive);
sportsPersonnelRoute.put('/:id', sportsPersonnelController.update);
sportsPersonnelRoute.delete('/:id', sportsPersonnelController.delete);

export default sportsPersonnelRoute;
