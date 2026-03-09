import { ROOT_PATH } from '@/globals/constants';
import { BadRequestException } from '@/globals/core/error.core';
import { validDate } from '@/globals/helpers/formats.helper';
import generateSlug from '@/globals/helpers/slug.helper';
import { prisma } from '@/prisma';
import path from 'path';
import fs from 'fs/promises';
import { AdvertisementDTO } from '../interfaces';
import { getPaginationAndFilters } from '@/globals/helpers/simple.pagination.helper';

class AdvertisementsService {
  public async checkExist(title: string, id?: number) {
    const normalized = title.trim();
    let isExist = null;
    if (id) {
      isExist = await prisma.spAdvertisements.findFirst({
        where: { slug: normalized, NOT: { id } },
        select: { id: true },
      });
    } else {
      isExist = await prisma.spAdvertisements.findFirst({
        where: { slug: normalized },
        select: { id: true },
      });
    }
    return !!isExist;
  }

  // ------------------------

  private fpath() {
    return path.join(ROOT_PATH, 'uploads/sports/advertisements/');
  }

  // ------------------------

  public async add({
    requestBody,
    file,
  }: {
    requestBody: AdvertisementDTO;
    file: Express.Multer.File;
  }) {
    const { title, description, adDate } = requestBody;
    const titleSlug = generateSlug(title);

    const isExist = await this.checkExist(titleSlug);

    if (isExist)
      throw new BadRequestException('Advertisement with same title exists');

    try {
      const data = await prisma.spAdvertisements.create({
        data: {
          title: title.trim(),
          slug: titleSlug,
          description: description?.trim() || null,
          adDate: adDate ? validDate(adDate) : null,
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

  // -----------------------------

  public async getPaginated({
    page,
    search,
  }: {
    page: number;
    search?: string;
  }) {
    const { data, meta } = await getPaginationAndFilters({
      page,
      quickFilter: search,
      quickFilterFields: ['title', 'description'],
      baseWhere: {},
      model: 'spAdvertisements',
      sortBy: [{ adDate: 'desc' }, { id: 'desc' }],
    });

    return { data, meta };
  }

  // -----------------------------

  public async update({
    id,
    requestBody,
    file,
  }: {
    id: number;
    requestBody: AdvertisementDTO;
    file: Express.Multer.File | null;
  }) {
    const { title, description, adDate } = requestBody;
    const titleSlug = generateSlug(title);

    const isExist = await this.checkExist(titleSlug, id);

    if (isExist)
      throw new BadRequestException('Advertisement with same title exists');

    try {
      const doc = await prisma.spAdvertisements.findFirst({
        where: { id },
        select: { filePath: true },
      });

      if (file && doc?.filePath) {
        const path = this.fpath() + doc.filePath;
        await fs.unlink(path).catch(() => {});
      }

      const data = await prisma.spAdvertisements.update({
        where: { id },
        data: {
          title: title.trim(),
          slug: titleSlug,
          description: description?.trim() || null,
          adDate: adDate ? validDate(adDate) : null,
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

  // -----------------------------

  public async delete(id: number) {
    const doc = await prisma.spAdvertisements.findFirst({
      where: { id },
      select: { filePath: true },
    });
    if (doc) {
      const filePath = path.join(this.fpath(), doc.filePath);
      await fs.unlink(filePath).catch(() => {});
    }
    await prisma.spAdvertisements.delete({ where: { id } });

    return;
  }

  // -----------------------------

  public async toggleActive({ id, checked }: { id: number; checked: boolean }) {
    await prisma.spAdvertisements.update({
      where: { id },
      data: { isActive: checked },
    });

    return;
  }
}

export const advertisementsService: AdvertisementsService =
  new AdvertisementsService();
