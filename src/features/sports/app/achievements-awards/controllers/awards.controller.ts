import { Request, Response } from 'express';
import { awardsService } from '../services/awards.service';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '@/prisma';
import path from 'path';
import { ROOT_PATH } from '@/globals/constants';

class AwardsController {
  public async add(req: Request, res: Response) {
    const file = req.file;
    const data = await awardsService.add({
      requestBody: req.body,
      file: file as Express.Multer.File,
    });
    return res.status(StatusCodes.CREATED).json({ message: 'success', data });
  }

  // ----------------------------

  public async getPaginated(req: Request, res: Response) {
    const { page, search } = req.query;
    const data = await awardsService.getPaginated({
      page: Number(page) || 1,
      search: search as string | undefined,
    });
    return res.status(StatusCodes.OK).json({ message: 'success', data });
  }

  // ----------------------------

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const file = req.file;
    const data = await awardsService.update({
      id: Number(id),
      requestBody: req.body,
      file: file as Express.Multer.File,
    });
    return res.status(StatusCodes.OK).json({ message: 'success', data });
  }

  // ----------------------------

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await awardsService.delete(Number(id));
    return res.status(StatusCodes.OK).json({ message: 'Deleted successfully' });
  }

  // ----------------------------

  public async toggleActive(req: Request, res: Response) {
    const { id } = req.params;
    const { checked } = req.body;
    await awardsService.toggleActive({
      id: Number(id),
      checked: Boolean(checked),
    });
    return res.status(StatusCodes.OK).json({ message: 'Updated successfully' });
  }

  // ----------------------------

  public async download(req: Request, res: Response) {
    const { filePath } = req.params;
    const ann = await prisma.spAwards.findFirst({
      where: { filePath: filePath as string },
      select: { fileName: true, filePath: true },
    });

    if (!ann) {
      return res.status(404).send('File not found');
    }

    const fpath = path.join(ROOT_PATH, 'uploads/sports/awards', ann!.filePath);
    const ext = path.extname(ann!.fileName).toLowerCase();
    const previewable = ['.pdf', '.jpg', '.jpeg', '.png'];

    res.setHeader(
      'Content-Disposition',
      previewable.includes(ext)
        ? `inline; filename="${ann.fileName}"`
        : `attachment; filename="${ann.fileName}"`,
    );

    res.sendFile(fpath);
  }
}

export const awardsController: AwardsController = new AwardsController();
