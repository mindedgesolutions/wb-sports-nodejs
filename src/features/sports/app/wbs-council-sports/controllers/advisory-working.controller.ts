import { Request, Response } from 'express';
import { advisoryWorkingService } from '../services/advisory-working.service';
import { StatusCodes } from 'http-status-codes';

class AdvisoryWorkingController {
  public async add(req: Request, res: Response) {
    const file = req.file ?? null;
    const data = await advisoryWorkingService.add({
      requestBody: req.body,
      file,
    });

    return res.status(StatusCodes.CREATED).json({ message: 'success', data });
  }

  // ----------------------------

  public async getPaginated(req: Request, res: Response) {
    const { page, search } = req.query;
    const data = await advisoryWorkingService.getPaginated({
      page: Number(page) || 1,
      search: String(search) || '',
    });
    return res.status(StatusCodes.OK).json({ message: 'success', data });
  }

  // ----------------------------

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const file = req.file ?? null;
    const data = await advisoryWorkingService.update({
      id: Number(id),
      requestBody: req.body,
      file,
    });

    return res.status(StatusCodes.OK).json({ message: 'success', data });
  }

  // ----------------------------

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await advisoryWorkingService.delete(Number(id));
    return res.status(StatusCodes.OK).json({ message: 'Success' });
  }

  // ----------------------------

  public async toggleActive(req: Request, res: Response) {
    const { id } = req.params;
    const { checked } = req.body;

    const data = await advisoryWorkingService.toggleActive({
      id: Number(id),
      active: checked as boolean,
    });

    return res.status(StatusCodes.OK).json({ message: `Success`, data });
  }
}

export const advisoryWorkingController: AdvisoryWorkingController =
  new AdvisoryWorkingController();
