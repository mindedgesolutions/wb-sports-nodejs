import { getPaginationAndFilters } from '@/globals/helpers/simple.pagination.helper';
import { KeyPersonnelDTO, KeyPersonnelShowOrderDTO } from '../interfaces';
import { prisma } from '@/prisma';
import { ROOT_PATH } from '@/globals/constants';
import fs from 'fs/promises';
import path from 'path';
import generateSlug from '@/globals/helpers/slug.helper';
import { BadRequestException } from '@/globals/core/error.core';

class KeyPersonnelService {
  public async checkExist(value: string, id?: number) {
    const slug = generateSlug(value);
    let isExist = null;
    if (id) {
      isExist = await prisma.spKeyPersonnel.findFirst({
        where: { slug, NOT: { id } },
        select: { id: true },
      });
    } else {
      isExist = await prisma.spKeyPersonnel.findFirst({
        where: { slug },
        select: { id: true },
      });
    }
    return !!isExist;
  }

  // ----------------------

  public async create(
    requestBody: KeyPersonnelDTO,
    file: Express.Multer.File | null,
  ) {
    const { name, rank, designation } = requestBody;
    const value = name + '-' + designation;

    const isExist = await this.checkExist(value);
    if (isExist)
      throw new BadRequestException(
        'Key personnel with similar name and designation already exists.',
      );

    const relative = file?.path.replace(ROOT_PATH, '');
    const normalized = relative
      ? relative.split(path.sep).join(path.posix.sep)
      : null;

    try {
      const data = await prisma.$transaction(async (tx) => {
        await tx.spKeyPersonnel.create({
          data: {
            name,
            rank: rank || '',
            designation,
            img: normalized,
            slug: generateSlug(value),
          },
        });
      });
      return data;
    } catch (error) {
      if (file?.path) {
        await fs.unlink(file.path).catch(() => {});
      }
      throw error;
    }
  }

  // ----------------------

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
      quickFilterFields: ['name', 'designation', 'rank'],
      baseWhere: {},
      model: 'spKeyPersonnel',
      sortBy: [{ show: 'asc' }, { id: 'desc' }],
    });

    return { data, meta };
  }

  // ----------------------

  public async getAll() {
    const data = await prisma.spKeyPersonnel.findMany({
      select: { id: true, name: true, designation: true, img: true },
      orderBy: [{ show: 'asc' }, { id: 'desc' }],
    });

    return { data };
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

    const value = name + '-' + designation;

    const isExist = await this.checkExist(value, id);
    if (isExist)
      throw new BadRequestException(
        'Key personnel with similar name and designation already exists.',
      );

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
        slug: generateSlug(value),
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

  // ----------------------

  public async sortShowOrder(requestBody: KeyPersonnelShowOrderDTO[]) {
    const data = await prisma.$transaction(async (tx) => {
      await Promise.all(
        requestBody.map((item: KeyPersonnelShowOrderDTO) =>
          tx.spKeyPersonnel.update({
            where: { id: item.id },
            data: { show: item.show },
          }),
        ),
      );
    });
    return data;
  }
}

export const keyPersonnelService: KeyPersonnelService =
  new KeyPersonnelService();
