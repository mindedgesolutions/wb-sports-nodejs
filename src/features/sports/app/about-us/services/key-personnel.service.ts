import { getPaginationAndFilters } from '@/globals/helpers/simple.pagination.helper';
import { KeyPersonnelDTO } from '../interfaces';
import { prisma } from '@/prisma';
import { ROOT_PATH } from '@/globals/constants';
import fs from 'fs/promises';
import path from 'path';

class KeyPersonnelService {
  public async create(requestBody: KeyPersonnelDTO, file: Express.Multer.File) {
    const { name, rank, designation } = requestBody;
    const relative = file.path.replace(ROOT_PATH, '');
    const normalized = relative.split(path.sep).join(path.posix.sep);

    try {
      const data = await prisma.$transaction(async (tx) => {
        await tx.spKeyPersonnel.create({
          data: { name, rank: rank || '', designation, img: normalized },
        });
      });
      return data;
    } catch (error) {
      if (file?.path) {
        await fs.unlink(file.path).catch(() => {});
        return;
      }
    }
  }

  // ----------------------

  public async getAll({ page, search }: { page: number; search?: string }) {
    const { data, meta } = await getPaginationAndFilters({
      page,
      quickFilter: search,
      quickFilterFields: ['name', 'designation', 'rank'],
      baseWhere: {},
      model: 'spKeyPersonnel',
      sortBy: [{ id: 'desc' }],
    });

    return { data, meta };
  }

  // ----------------------

  public async update({
    id,
    requestBody,
    file,
  }: {
    id: number;
    requestBody: KeyPersonnelDTO;
    file?: Express.Multer.File;
  }) {
    const { name, rank, designation } = requestBody;
    let normalized = '';

    if (file) {
      const prevImg = await prisma.spKeyPersonnel.findUnique({
        where: { id },
        select: { img: true },
      });
      if (prevImg?.img) {
        const path = ROOT_PATH + prevImg.img;
        await fs.unlink(path).catch(() => {});
      }
      const relative = file.path.replace(ROOT_PATH, '');
      normalized = relative.split(path.sep).join(path.posix.sep);
    }
    const data = await prisma.spKeyPersonnel.update({
      where: { id },
      data: {
        name,
        rank: rank || '',
        designation,
        ...(file && { img: normalized }),
      },
    });

    return data;
  }

  // ----------------------

  public async delete(id: number) {
    const getImg = await prisma.spKeyPersonnel.findUnique({
      where: { id },
      select: { img: true },
    });

    if (getImg?.img) {
      const path = ROOT_PATH + getImg.img;
      await fs.unlink(path).catch(() => {});
    }

    await prisma.spKeyPersonnel.delete({ where: { id } });

    return;
  }

  // ----------------------

  public async toggleActive({ id, active }: { id: number; active: boolean }) {
    await prisma.spKeyPersonnel.update({
      where: { id },
      data: { isActive: active },
    });
    return;
  }
}

export const keyPersonnelService: KeyPersonnelService =
  new KeyPersonnelService();
