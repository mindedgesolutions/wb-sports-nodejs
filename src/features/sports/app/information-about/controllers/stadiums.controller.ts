import { Request, Response } from 'express';

class StadiumController {
  public async add(req: Request, res: Response) {}

  // -------------------------------

  public async getPaginated(req: Request, res: Response) {}

  // -------------------------------

  public async getById(req: Request, res: Response) {}

  // -------------------------------

  public async update(req: Request, res: Response) {}

  // -------------------------------

  public async delete(req: Request, res: Response) {}

  // -------------------------------

  public async toggleActive(req: Request, res: Response) {}
}

export const stadiumController: StadiumController = new StadiumController();
