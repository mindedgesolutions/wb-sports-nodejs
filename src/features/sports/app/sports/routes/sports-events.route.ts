import express from 'express';
import { sportsEventsController } from '../controllers/sports-events.controller';

const sportsEventsRoute = express.Router();

sportsEventsRoute.post('/', sportsEventsController.add);
sportsEventsRoute.get('/', sportsEventsController.getAll);
sportsEventsRoute.put('/toggle/:id', sportsEventsController.toggleActive);
sportsEventsRoute.put('/:id', sportsEventsController.update);
sportsEventsRoute.delete('/:id', sportsEventsController.delete);

export default sportsEventsRoute;
