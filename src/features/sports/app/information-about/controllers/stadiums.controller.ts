import { Request, Response } from 'express';
import { stadiumService } from '../services/stadiums.service';
import { StatusCodes } from 'http-status-codes';

class StadiumController {
  public async add(req: Request, res: Response) {
    const files = req.files as {
      newImg?: Express.Multer.File[];
      newGalleryImg?: Express.Multer.File[];
    };

    const cover = files.newImg?.[0];
    const gallery = files.newGalleryImg || [];
    const data = await stadiumService.add({
      requestBody: req.body,
      cover: cover as Express.Multer.File,
      gallery: gallery as Express.Multer.File[],
    });
    return res.status(StatusCodes.CREATED).json({ message: 'Success', data });
  }

  // -------------------------------

  public async getPaginated(req: Request, res: Response) {
    const { page, search } = req.query;
    const data = await stadiumService.getPaginated({
      page: Number(page) || 1,
      search: search as string | undefined,
    });
    return res.status(StatusCodes.OK).json({ message: 'Success', data });
  }

  // -------------------------------

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const data = await stadiumService.getById(Number(id));
    return res.status(StatusCodes.OK).json({ message: 'Success', data });
  }

  // -------------------------------

  public async update(req: Request, res: Response) {}

  // -------------------------------

  public async delete(req: Request, res: Response) {}

  // -------------------------------

  public async toggleActive(req: Request, res: Response) {}
}

export const stadiumController: StadiumController = new StadiumController();
