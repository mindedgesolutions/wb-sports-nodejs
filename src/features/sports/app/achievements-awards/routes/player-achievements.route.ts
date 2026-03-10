import express from 'express';
import { playerAchievementsController } from '../controllers/player-achievements.controller';
import { validateSchema } from '@/globals/middlewares/validate.schema.middleware';
import { playerAchievementsSchema } from '../schemas';

const playerAchievementsRoute = express.Router();

playerAchievementsRoute.post(
  '/',
  validateSchema(playerAchievementsSchema),
  playerAchievementsController.add,
);
playerAchievementsRoute.get('/', playerAchievementsController.getPaginated);
playerAchievementsRoute.put(
  '/:id',
  validateSchema(playerAchievementsSchema),
  playerAchievementsController.update,
);
playerAchievementsRoute.delete('/:id', playerAchievementsController.delete);
playerAchievementsRoute.put(
  '/toggle/:id',
  playerAchievementsController.toggleActive,
);

export default playerAchievementsRoute;
