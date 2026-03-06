import { Request, Response } from 'express';
import { announcementsService } from '../services/announcements.service';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '@/prisma';
import path from 'path';
import { ROOT_PATH } from '@/globals/constants';

class AnnouncementsController {
  public async add(req: Request, res: Response) {
    const file = req.file;
    const data = await announcementsService.add({
      requestBody: req.body,
      file: file as Express.Multer.File,
    });

    return res.status(StatusCodes.CREATED).json({ message: 'success', data });
  }

  // ------------------------

  public async getPaginated(req: Request, res: Response) {
    const { page, search } = req.query;
    const data = await announcementsService.getPaginated({
      page: Number(page) || 1,
      search: String(search || ''),
    });

    return res.status(StatusCodes.OK).json({ message: 'success', data });
  }

  // ------------------------

  public async update(req: Request, res: Response) {
    const { id } = req.params;
    const file = req.file || null;
    const data = await announcementsService.update({
      id: Number(id),
      requestBody: req.body,
      file: file as Express.Multer.File | null,
    });

    return res.status(StatusCodes.OK).json({ message: 'success', data });
  }

  // ------------------------

  public async delete(req: Request, res: Response) {
    const { id } = req.params;
    await announcementsService.delete(Number(id));

    return res.status(StatusCodes.OK).json({ message: 'success' });
  }

  // ------------------------

  public async toggleActive(req: Request, res: Response) {
    const { id } = req.params;
    const { checked } = req.body;
    await announcementsService.toggleActive({
      id: Number(id),
      active: Boolean(checked),
    });

    return res.status(StatusCodes.OK).json({ message: 'success' });
  }

  // ------------------------

  public async download(req: Request, res: Response) {
    const { filePath } = req.params;
    const ann = await prisma.spAnnouncements.findFirst({
      where: { filePath: filePath as string },
      select: { fileName: true, filePath: true },
    });

    if (!ann) {
      return res.status(404).send('File not found');
    }

    const fpath = path.join(
      ROOT_PATH,
      'uploads/sports/announcements',
      ann!.filePath,
    );
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

export const announcementsController: AnnouncementsController =
  new AnnouncementsController();
