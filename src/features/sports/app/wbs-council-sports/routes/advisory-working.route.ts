import express from 'express';
import { advisoryWorkingController } from '../controllers/advisory-working.controller';

const advisoryWorkingRoute = express.Router();

advisoryWorkingRoute.post('/', advisoryWorkingController.add);
advisoryWorkingRoute.get('/', advisoryWorkingController.getPaginated);
advisoryWorkingRoute.put('/:id', advisoryWorkingController.update);
advisoryWorkingRoute.delete('/:id', advisoryWorkingController.delete);
advisoryWorkingRoute.put('/toggle/:id', advisoryWorkingController.toggleActive);

export default advisoryWorkingRoute;
