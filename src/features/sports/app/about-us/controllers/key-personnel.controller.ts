import { Request, Response } from 'express';
import { keyPersonnelService } from '../services/key-personnel.service';
import { StatusCodes } from 'http-status-codes';
import { KeyPersonnelShowOrderDTO } from '../interfaces';

class KeyPersonnelController {
  public async create(req: Request, res: Response) {
    const file = req.file ?? null;
    const data = await keyPersonnelService.create(req.body, file);

    return res.status(StatusCodes.CREATED).json({ message: 'Success', data });
  }

  // ----------------------

  public async getPaginated(req: Request, res: Response) {
    const { page, search } = req.query;
    const data = await keyPersonnelService.getPaginated({
      page: Number(page) || 1,
      search: search as string,
    });

    return res.status(StatusCodes.OK).json({ message: 'Success', data });
  }

  // ----------------------

  public async getAll(req: Request, res: Response) {
    const data = await keyPersonnelService.getAll();

    return res.status(StatusCodes.OK).json({ message: 'Success', data });
  }

  // ----------------------

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const file = req.file;
    const data = await keyPersonnelService.update({
      id: Number(id),
      requestBody: req.body,
      file: file as Express.Multer.File,
    });

    return res.status(StatusCodes.OK).json({ message: 'Success', data });
  }

  // ----------------------

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const data = await keyPersonnelService.delete(Number(id));

    return res.status(StatusCodes.OK).json({ message: `Success`, data });
  }

  // ----------------------

  public async toggleActive(req: Request, res: Response) {
    const { id } = req.params;
    const { checked } = req.body;

    const data = await keyPersonnelService.toggleActive({
      id: Number(id),
      active: checked as boolean,
    });

    return res.status(StatusCodes.OK).json({ message: `Success`, data });
  }

  // ----------------------

  public async sortShowOrder(req: Request, res: Response) {
    const data = await keyPersonnelService.sortShowOrder(
      req.body as KeyPersonnelShowOrderDTO[],
    );

    return res.status(StatusCodes.OK).json({ message: `Success`, data });
  }
}

export const keyPersonnelController: KeyPersonnelController =
  new KeyPersonnelController();
