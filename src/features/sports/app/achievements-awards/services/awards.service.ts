import { ROOT_PATH } from '@/globals/constants';
import { BadRequestException } from '@/globals/core/error.core';
import generateSlug from '@/globals/helpers/slug.helper';
import { prisma } from '@/prisma';
import path from 'path';
import fs from 'fs/promises';
import { getPaginationAndFilters } from '@/globals/helpers/simple.pagination.helper';

class AwardsService {
  public async checkExist(slug: string, id?: number) {
    const normalized = slug.trim();
    let isExist = null;
    if (id) {
      isExist = await prisma.spAwards.findFirst({
        where: { slug: normalized, NOT: { id } },
        select: { id: true },
      });
    } else {
      isExist = await prisma.spAwards.findFirst({
        where: { slug: normalized },
        select: { id: true },
      });
    }
    return !!isExist;
  }

  // ------------------------

  private fpath() {
    return path.join(ROOT_PATH, 'uploads/sports/awards/');
  }

  // ------------------------

  public async add({
    requestBody,
    file,
  }: {
    requestBody: any;
    file: Express.Multer.File;
  }) {
    const { name } = requestBody;
    const titleSlug = generateSlug(name);

    const isExist = await this.checkExist(titleSlug);

    if (isExist) throw new BadRequestException('Award with same title exists');

    try {
      const data = await prisma.spAwards.create({
        data: {
          name: name.trim(),
          slug: titleSlug,
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

  // ----------------------------

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
      quickFilterFields: ['name'],
      baseWhere: {},
      model: 'spAwards',
      sortBy: [{ id: 'desc' }],
    });

    return { data, meta };
  }

  // ----------------------------

  public async update({
    id,
    requestBody,
    file,
  }: {
    id: number;
    requestBody: any;
    file?: Express.Multer.File;
  }) {
    const { name } = requestBody;
    const titleSlug = generateSlug(name);

    const isExist = await this.checkExist(titleSlug, id);

    if (isExist) throw new BadRequestException('Award with same title exists');

    try {
      const doc = await prisma.spAwards.findFirst({
        where: { id },
        select: { filePath: true },
      });

      if (file && doc?.filePath) {
        const path = this.fpath() + doc.filePath;
        await fs.unlink(path).catch(() => {});
      }

      const data = await prisma.spAwards.update({
        where: { id },
        data: {
          name: name.trim(),
          slug: titleSlug,
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

  // ----------------------------

  public async delete(id: number) {
    const file = await prisma.spAwards.findFirst({
      where: { id },
      select: { filePath: true },
    });
    if (file) {
      const filePath = path.join(this.fpath(), file.filePath);
      await fs.unlink(filePath).catch(() => {});
    }
    await prisma.spAwards.delete({ where: { id } });
    return;
  }

  // ----------------------------

  public async toggleActive({ id, checked }: { id: number; checked: boolean }) {
    await prisma.spAwards.update({
      where: { id },
      data: { isActive: checked },
    });
    return;
  }
}

export const awardsService: AwardsService = new AwardsService();
