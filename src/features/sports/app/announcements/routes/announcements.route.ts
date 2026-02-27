import express from 'express';
import { announcementsController } from '../controllers/announcements.controller';

const announcementsRoute = express.Router();

announcementsRoute.post('/', announcementsController.add);
announcementsRoute.get('/', announcementsController.getPaginated);
announcementsRoute.put('/:id', announcementsController.update);
announcementsRoute.delete('/:id', announcementsController.delete);
announcementsRoute.put('/:id/toggle', announcementsController.toggleActive);

export default announcementsRoute;
