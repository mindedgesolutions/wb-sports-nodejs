import { Request, Response } from 'express';
import { wbsCouncilDesignationsService } from '../services/wbs-council-designations.service';
import { StatusCodes } from 'http-status-codes';
import {
  WbsCouncilDesignationsDTO,
  WbsCouncilDesignationsShowOrderDTO,
} from '../interfaces';

class WbsCouncilDesignationsController {
  public async add(req: Request, res: Response) {
    const data = await wbsCouncilDesignationsService.add(req.body);

    return res.status(StatusCodes.CREATED).json({ message: 'Success', data });
  }

  // ---------------------------------

  public async getPaginated(req: Request, res: Response) {
    const { page = 1, search } = req.query;
    const data = await wbsCouncilDesignationsService.getPaginated({
      page: Number(page) || 1,
      search: search as string,
    });

    return res.status(StatusCodes.OK).json({ message: 'Success', data });
  }

  // ---------------------------------

  public async getAll(req: Request, res: Response) {
    const data = await wbsCouncilDesignationsService.getAll();

    return res.status(StatusCodes.OK).json({ message: 'Success', data });
  }

  // ---------------------------------

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await wbsCouncilDesignationsService.update(
      Number(id),
      req.body as WbsCouncilDesignationsDTO,
    );
    return res.status(StatusCodes.OK).json({ message: 'Success', data });
  }

  // ---------------------------------

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await wbsCouncilDesignationsService.delete(Number(id));
    return res.status(StatusCodes.OK).json({ message: 'Success' });
  }

  // ---------------------------------

  public async toggleActive(req: Request, res: Response) {
    const { id } = req.params;
    const { checked } = req.body;

    const data = await wbsCouncilDesignationsService.toggleActive({
      id: Number(id),
      active: checked as boolean,
    });

    return res.status(StatusCodes.OK).json({ message: `Success`, data });
  }

  // ---------------------------------

  public async sortShowOrder(req: Request, res: Response) {
    const data = await wbsCouncilDesignationsService.sortShowOrder(
      req.body as WbsCouncilDesignationsShowOrderDTO[],
    );

    return res.status(StatusCodes.OK).json({ message: `Success`, data });
  }
}

export const wbsCouncilDesignationsController: WbsCouncilDesignationsController =
  new WbsCouncilDesignationsController();
