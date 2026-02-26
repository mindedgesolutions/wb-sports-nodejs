import { Request, Response } from 'express';
import { advisoryWorkingService } from '../services/advisory-working.service';
import { StatusCodes } from 'http-status-codes';

class AdvisoryWorkingController {
  public async add(req: Request, res: Response) {
    const file = req.file ?? null;
    const data = await advisoryWorkingService.add(req.body, file);

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
    const data = await advisoryWorkingService.update(Number(id), {
      ...req.body,
      file,
    });
    return res.status(StatusCodes.OK).json({ message: 'success', data });
  }

  // ----------------------------

  public async delete(req: Request, res: Response) {}

  // ----------------------------

  public async toggleActive(req: Request, res: Response) {}
}

export const advisoryWorkingController: AdvisoryWorkingController =
  new AdvisoryWorkingController();
