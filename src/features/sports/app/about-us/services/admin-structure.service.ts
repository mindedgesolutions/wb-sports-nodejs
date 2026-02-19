import { prisma } from '@/prisma';
import { AdminStructureDTO, AdminStructureShowOrderDTO } from '../interfaces';
import { getPaginationAndFilters } from '@/globals/helpers/simple.pagination.helper';

class AdminStructureService {
  public async create(requestBody: AdminStructureDTO) {
    const { name } = requestBody;

    const data = await prisma.spAdminStructure.create({
      data: { name },
    });

    return data;
  }

  // ----------------------

  public async getAll({ page, search }: { page: number; search?: string }) {
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

  public async update({
    id,
    requestBody,
  }: {
    id: number;
    requestBody: AdminStructureDTO;
  }) {
    const { name } = requestBody;
    const data = await prisma.spAdminStructure.update({
      where: { id },
      data: { name },
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
