import express from 'express';
import { stadiumController } from '../controllers/stadiums.controller';

const stadiumsRoute = express.Router();

stadiumsRoute.post('/', stadiumController.add);
stadiumsRoute.get('/', stadiumController.getPaginated);
stadiumsRoute.put('/:id', stadiumController.update);
stadiumsRoute.delete('/:id', stadiumController.delete);
stadiumsRoute.put('/toggle/:id', stadiumController.toggleActive);

export default stadiumsRoute;
