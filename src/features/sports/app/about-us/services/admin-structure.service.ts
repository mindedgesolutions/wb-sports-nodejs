import { prisma } from '@/prisma';
import { AdminStructureDTO, AdminStructureShowOrderDTO } from '../interfaces';
import { getPaginationAndFilters } from '@/globals/helpers/simple.pagination.helper';
import generateSlug from '@/globals/helpers/slug.helper';
import { BadRequestException } from '@/globals/core/error.core';

class AdminStructureService {
  public async checkExist(value: string, id?: number) {
    const slug = generateSlug(value);
    let isExist = null;
    if (id) {
      isExist = await prisma.spAdminStructure.findFirst({
        where: { slug, NOT: { id } },
        select: { id: true },
      });
    } else {
      isExist = await prisma.spAdminStructure.findFirst({
        where: { slug },
        select: { id: true },
      });
    }
    return !!isExist;
  }

  // ----------------------

  public async create(requestBody: AdminStructureDTO) {
    const { name } = requestBody;

    const isExist = await this.checkExist(name);
    if (isExist)
      throw new BadRequestException(
        'Admin structure with this name already exists',
      );

    const data = await prisma.spAdminStructure.create({
      data: { name, slug: generateSlug(name) },
    });

    return data;
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
      quickFilterFields: ['name'],
      baseWhere: {},
      model: 'spAdminStructure',
      sortBy: [{ show: 'asc' }, { id: 'desc' }],
    });

    return { data, meta };
  }

  // ----------------------

  public async getAll() {
    const data = await prisma.spAdminStructure.findMany({
      orderBy: [{ show: 'asc' }, { id: 'desc' }],
    });
    return data;
  }

  // ----------------------

  public async update({
    id,
    requestBody,
  }: {
    id: number;
    requestBody: AdminStructureDTO;
  }) {
    const { name } = requestBody;

    const isExist = await this.checkExist(name, id);
    if (isExist)
      throw new BadRequestException(
        'Admin structure with this name already exists',
      );

    const data = await prisma.spAdminStructure.update({
      where: { id },
      data: { name, slug: generateSlug(name) },
    });

    return data;
  }

  // ----------------------

  public async delete(id: number) {
    await prisma.spAdminStructure.delete({
      where: { id },
    });

    return;
  }

  // ----------------------

  public async toggleActive({ id, active }: { id: number; active: boolean }) {
    const data = await prisma.spAdminStructure.update({
      where: { id },
      data: { isActive: active },
    });

    return data;
  }

  // ----------------------

  public async sortShowOrder(requestBody: AdminStructureShowOrderDTO[]) {
    const data = await prisma.$transaction(async (tx) => {
      await Promise.all(
        requestBody.map((item) =>
          tx.spAdminStructure.update({
            where: { id: item.id },
            data: { show: item.show },
          }),
        ),
      );
    });
    return data;
  }
}

export const adminStructureService: AdminStructureService =
  new AdminStructureService();
