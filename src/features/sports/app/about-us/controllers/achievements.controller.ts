import { Request, Response } from 'express';
import { achievementsService } from '../services/achievements.service';
import { StatusCodes } from 'http-status-codes';
import { AchievementsDTO } from '../interfaces';

class AchievementsController {
  public async create(req: Request, res: Response) {
    const data = await achievementsService.create(req.body as AchievementsDTO);

    return res.status(StatusCodes.CREATED).json({
      message: 'Achievement created successfully',
      data,
    });
  }

  // ----------------------

  public async getAll(req: Request, res: Response) {
    const { page, search } = req.query;

    const data = await achievementsService.getAll({
      page: Number(page) || 1,
      search: search as string,
    });

    return res.status(StatusCodes.OK).json({
      message: 'Achievements fetched successfully',
      data,
    });
  }

  // ----------------------

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await achievementsService.update({
      id: Number(id),
      requestBody: req.body,
    });

    res.status(StatusCodes.OK).json({ message: `Success`, data });
  }

  // ----------------------

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const data = await achievementsService.delete(Number(id));

    return res.status(StatusCodes.OK).json({ message: `Success`, data });
  }

  // ----------------------

  public async toggleActive(req: Request, res: Response) {
    const { id } = req.params;
    const { checked } = req.body;

    const data = await achievementsService.toggleActive({
      id: Number(id),
      active: checked as boolean,
    });

    return res.status(StatusCodes.OK).json({ message: `Success`, data });
  }
}

export const achievementsController: AchievementsController =
  new AchievementsController();
