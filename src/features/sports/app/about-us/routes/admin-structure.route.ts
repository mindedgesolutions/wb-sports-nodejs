import express from 'express';
import { adminStructureController } from '../controllers/admin-structure.controller';
import { validateSchema } from '@/globals/middlewares/validate.schema.middleware';
import { adminStructureSchema } from '../schemas';

const adminStructureRoute = express.Router();

adminStructureRoute.post(
  '/',
  validateSchema(adminStructureSchema),
  adminStructureController.create,
);
adminStructureRoute.get('/', adminStructureController.getAll);
adminStructureRoute.put('/sort', adminStructureController.sortShowOrder);
adminStructureRoute.put(
  '/:id',
  validateSchema(adminStructureSchema),
  adminStructureController.update,
);
adminStructureRoute.delete('/:id', adminStructureController.delete);
adminStructureRoute.put('/toggle/:id', adminStructureController.toggleActive);

export default adminStructureRoute;
