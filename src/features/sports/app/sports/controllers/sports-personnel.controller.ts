import { Request, Response } from 'express';
import { sportsPersonnelService } from '../services/sports-personnel.service';
import { StatusCodes } from 'http-status-codes';

class SportsPersonnelController {
  public async add(req: Request, res: Response) {
    const data = await sportsPersonnelService.add(req.body);

    return res.status(StatusCodes.CREATED).json({ message: 'success', data });
  }

  // -------------------------------------

  public async getAll(req: Request, res: Response) {
    const { page = 1, search } = req.query;

    const data = await sportsPersonnelService.getAll({
      page: Number(page),
      search: search as string,
    });

    return res.status(StatusCodes.OK).json({ message: 'success', data });
  }

  // -------------------------------------

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await sportsPersonnelService.update({
      id: Number(id),
      requestBody: req.body,
    });

    return res.status(StatusCodes.CREATED).json({ message: 'success', data });
  }

  // -------------------------------------

  public async delete(req: Request, res: Response) {
    const data = await sportsPersonnelService.delete(Number(req.params.id));

    return res.status(StatusCodes.OK).json({ message: 'success', data });
  }

  // -------------------------------------

  public async toggleActive(req: Request, res: Response) {
    const { id } = req.params;
    const { checked } = req.body;
    const data = await sportsPersonnelService.toggleActive({
      id: Number(id),
      active: checked as boolean,
    });

    return res.status(StatusCodes.OK).json({ message: 'success', data });
  }
}

export const sportsPersonnelController: SportsPersonnelController =
  new SportsPersonnelController();
