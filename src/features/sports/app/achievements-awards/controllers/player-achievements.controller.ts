import { Request, Response } from 'express';
import { playerAchievementsService } from '../services/player-achievements.service';
import { StatusCodes } from 'http-status-codes';

class PlayerAchievementsController {
  public async add(req: Request, res: Response) {
    const data = await playerAchievementsService.add(req.body);
    return res.status(StatusCodes.CREATED).json({ message: 'Success', data });
  }

  // ---------------------------

  public async getPaginated(req: Request, res: Response) {
    const { page, search } = req.query;
    const data = await playerAchievementsService.getPaginated({
      page: Number(page) || 1,
      search: (search as string) || undefined,
    });
    return res.status(StatusCodes.OK).json({ message: 'Success', data });
  }

  // ---------------------------

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await playerAchievementsService.update({
      id: Number(id),
      requestBody: req.body,
    });
    return res.status(StatusCodes.OK).json({ message: 'Success', data });
  }

  // ---------------------------

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const data = await playerAchievementsService.delete(Number(id));
    return res.status(StatusCodes.OK).json({ message: 'Success', data });
  }

  // ---------------------------

  public async toggleActive(req: Request, res: Response) {
    const { id } = req.params;
    const { checked } = req.body;
    const data = await playerAchievementsService.toggleActive({
      id: Number(id),
      checked,
    });
    return res.status(StatusCodes.OK).json({ message: 'Success', data });
  }
}

export const playerAchievementsController: PlayerAchievementsController =
  new PlayerAchievementsController();
