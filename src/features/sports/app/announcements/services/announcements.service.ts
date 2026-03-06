import { AnnouncementTypes } from '@/generated/prisma/enums';
import { SpAnnouncementsWhereInput } from '@/generated/prisma/models';
import { ROOT_PATH } from '@/globals/constants';
import { getMeta } from '@/globals/helpers/meta.helper';
import { prisma } from '@/prisma';
import path from 'path';
import fs from 'fs/promises';
import { validDate } from '@/globals/helpers/formats.helper';
import { BadRequestException } from '@/globals/core/error.core';
import { AnnouncementDTO } from '../interfaces';

class AnnouncementsService {
  public async checkExist(annNo: string, id?: number) {
    const normalized = annNo.trim();
    let isExist = null;
    if (id) {
      isExist = await prisma.spAnnouncements.findFirst({
        where: { annNo: normalized, NOT: { id } },
        select: { id: true },
      });
    } else {
      isExist = await prisma.spAnnouncements.findFirst({
        where: { annNo: normalized },
        select: { id: true },
      });
    }
    return !!isExist;
  }

  // ------------------------

  private fpath() {
    return path.join(ROOT_PATH, 'uploads/sports/announcements/');
  }

  // ------------------------

  public async add({
    requestBody,
    file,
  }: {
    requestBody: AnnouncementDTO;
    file: Express.Multer.File;
  }) {
    const { annType, annNo, subject, isNew, startDate, endDate } = requestBody;

    const isExist = await this.checkExist(annNo);

    if (isExist)
      throw new BadRequestException(
        'Announcement with same refernce no. exists',
      );
    const formattedIsNew = isNew === 'true' ? true : false;

    try {
      const data = await prisma.spAnnouncements.create({
        data: {
          type: annType as AnnouncementTypes,
          annNo: annNo.trim(),
          subject: subject.trim(),
          isNew: formattedIsNew,
          startDate: startDate ? validDate(startDate) : null,
          endDate: endDate ? validDate(endDate) : null,
          fileName: file.originalname,
          filePath: file.filename,
        },
      });

      return data;
    } catch (error) {
      if (file?.path) {
        await fs.unlink(file.path).catch(() => {});
      }
      throw error;
    }
  }

  // ------------------------

  public async getPaginated({
    page,
    search,
  }: {
    page: number;
    search: string;
  }) {
    const normalized = search?.trim();
    let where: SpAnnouncementsWhereInput = {};

    if (normalized) {
      const enumMatches = Object.values(AnnouncementTypes).filter((v) =>
        v.toLowerCase().includes(normalized.toLowerCase()),
      );

      where = {
        OR: [
          { annNo: { contains: search, mode: 'insensitive' } },
          { subject: { contains: search, mode: 'insensitive' } },
          ...(enumMatches.length ? [{ type: { in: enumMatches } }] : []),
        ],
      };
    }

    const { meta, safeSkip, safeLimit } = await getMeta({
      limit: 10,
      model: 'spAnnouncements',
      where,
      page,
    });

    const data = await prisma.spAnnouncements.findMany({
      where,
      skip: safeSkip,
      take: safeLimit,
      orderBy: [{ type: 'asc' }, { createdAt: 'desc' }, { id: 'desc' }],
    });
    return { data, meta };
  }

  // ------------------------

  public async update({
    id,
    requestBody,
    file,
  }: {
    id: number;
    requestBody: AnnouncementDTO;
    file: Express.Multer.File | null;
  }) {
    const { annType, annNo, subject, isNew, startDate, endDate } = requestBody;

    const isExist = await this.checkExist(annNo, id);

    if (isExist)
      throw new BadRequestException(
        'Announcement with same refernce no. exists',
      );
    const formattedIsNew = isNew === 'true' ? true : false;

    try {
      const doc = await prisma.spAnnouncements.findFirst({
        where: { id },
        select: { filePath: true, fileName: true },
      });

      if (file && doc?.filePath) {
        const path = this.fpath() + doc.filePath;
        await fs.unlink(path).catch(() => {});
      }

      const data = await prisma.spAnnouncements.update({
        where: { id },
        data: {
          type: annType as AnnouncementTypes,
          annNo: annNo.trim(),
          subject: subject.trim(),
          isNew: formattedIsNew,
          startDate: startDate ? validDate(startDate) : null,
          endDate: endDate ? validDate(endDate) : null,
          fileName: file?.originalname,
          filePath: file?.filename,
        },
      });

      return data;
    } catch (error) {
      if (file?.path) {
        await fs.unlink(file.path).catch(() => {});
      }
      throw error;
    }
  }

  // ------------------------

  public async delete(id: number) {
    const getDoc = await prisma.spAnnouncements.findUnique({
      where: { id },
      select: { filePath: true },
    });

    if (getDoc?.filePath) {
      const path = this.fpath() + getDoc.filePath;
      console.log(path);
      await fs.unlink(path).catch(() => {});
    }

    await prisma.spAnnouncements.delete({ where: { id } });
    return;
  }

  // ------------------------

  public async toggleActive({ id, active }: { id: number; active: boolean }) {
    await prisma.spAnnouncements.update({
      where: { id },
      data: { isActive: active },
    });

    return;
  }
}

export const announcementsService: AnnouncementsService =
  new AnnouncementsService();
