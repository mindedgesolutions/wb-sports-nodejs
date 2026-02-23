import { Request, Response } from 'express';
import { adminStructureService } from '../services/admin-structure.service';
import { StatusCodes } from 'http-status-codes';
import { AdminStructureDTO, AdminStructureShowOrderDTO } from '../interfaces';

class AdminStructureController {
  public async create(req: Request, res: Response) {
    const data = await adminStructureService.create(
      req.body as AdminStructureDTO,
    );

    return res.status(StatusCodes.CREATED).json({ message: 'Success', data });
  }

  // ----------------------

  public async getPaginated(req: Request, res: Response) {
    const { page, search } = req.query;
    const data = await adminStructureService.getPaginated({
      page: Number(page) || 1,
      search: search as string,
    });

    return res.status(StatusCodes.OK).json({ message: 'Success', data });
  }

  // ----------------------

  public async getAll(req: Request, res: Response) {
    const data = await adminStructureService.getAll();

    return res.status(StatusCodes.OK).json({ message: 'Success', data });
  }

  // ----------------------

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = await adminStructureService.update({
      id: Number(id),
      requestBody: req.body as AdminStructureDTO,
    });

    return res.status(StatusCodes.OK).json({ message: 'Success', data });
  }

  // ----------------------

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    const data = await adminStructureService.delete(Number(id));

    return res.status(StatusCodes.OK).json({ message: `Success`, data });
  }

  // ----------------------

  public async toggleActive(req: Request, res: Response) {
    const { id } = req.params;
    const { checked } = req.body;

    const data = await adminStructureService.toggleActive({
      id: Number(id),
      active: checked as boolean,
    });

    return res.status(StatusCodes.OK).json({ message: `Success`, data });
  }

  // ----------------------

  public async sortShowOrder(req: Request, res: Response) {
    const data = await adminStructureService.sortShowOrder(
      req.body as AdminStructureShowOrderDTO[],
    );

    return res.status(StatusCodes.OK).json({ message: `Success`, data });
  }
}

export const adminStructureController: AdminStructureController =
  new AdminStructureController();
