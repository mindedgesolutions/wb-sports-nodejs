import { Request, Response } from 'express';

class AdvertisementsController {
  public async add(req: Request, res: Response) {}

  // -----------------------------

  public async getPaginated(req: Request, res: Response) {}

  // -----------------------------

  public async update(req: Request, res: Response) {}

  // -----------------------------

  public async delete(req: Request, res: Response) {}

  // -----------------------------

  public async toggleActive(req: Request, res: Response) {}

  // -----------------------------

  public async download(req: Request, res: Response) {}
}

export const advertisementsController: AdvertisementsController =
  new AdvertisementsController();
