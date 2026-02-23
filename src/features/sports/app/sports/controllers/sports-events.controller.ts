import { Request, Response } from 'express';
import { sportsEventsService } from '../services/sports-events.service';
import { StatusCodes } from 'http-status-codes';

class SportsEventsController {
  public async add(req: Request, res: Response) {
    const data = await sportsEventsService.add(req.body);

    return res.status(StatusCodes.CREATED).json({ message: 'OK', data });
  }

  // --------------------------------

  public async getAll(req: Request, res: Response) {
    const { page = 1, search } = req.query as {
      page?: string;
      search?: string;
    };
    const data = await sportsEventsService.getAll({
      page: Number(page),
      search,
    });
    return res.status(StatusCodes.OK).json({ message: 'OK', data });
  }

  // --------------------------------

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await sportsEventsService.update({
      id: Number(id),
      requestBody: req.body,
    });
    return res.status(StatusCodes.OK).json({ message: 'OK', data });
  }

  // --------------------------------

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await sportsEventsService.delete(Number(id));
    return res.status(StatusCodes.NO_CONTENT).json({ message: 'OK' });
  }

  // --------------------------------

  public async toggleActive(req: Request, res: Response) {
    const { id } = req.params;
    const { checked } = req.body;
    const data = await sportsEventsService.toggleActive({
      id: Number(id),
      active: checked as boolean,
    });

    return res.status(StatusCodes.OK).json({ message: 'success', data });
  }
}

export const sportsEventsController: SportsEventsController =
  new SportsEventsController();
