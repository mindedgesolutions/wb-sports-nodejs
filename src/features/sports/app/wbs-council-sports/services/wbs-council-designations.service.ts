import { prisma } from '@/prisma';
import {
  WbsCouncilDesignationsDTO,
  WbsCouncilDesignationsShowOrderDTO,
} from '../interfaces';
import generateSlug from '@/globals/helpers/slug.helper';
import { BoardTypes } from '@/generated/prisma/enums';
import { SpWbsCouncilDesignationsWhereInput } from '@/generated/prisma/models';
import { getMeta } from '@/globals/helpers/meta.helper';
import { getIO } from '@/socket.io';

class WbsCouncilDesignationsService {
  public async add(requestBody: WbsCouncilDesignationsDTO) {
    const { boardType, name } = requestBody;

    const data = await prisma.spWbsCouncilDesignations.create({
      data: {
        boardType: boardType as BoardTypes,
        name,
        slug: generateSlug(name),
      },
    });

    getIO().emit('wcsDesignationCreated', data);

    return data;
  }

  // ---------------------------------

  public async getPaginated({
    page,
    search,
  }: {
    page: number;
    search?: string;
  }) {
    const normalized = search?.trim();
    let where: SpWbsCouncilDesignationsWhereInput = {};

    if (normalized) {
      const enumMatches = Object.values(BoardTypes).filter((v) =>
        v.toLowerCase().includes(normalized.toLowerCase()),
      );

      where = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          ...(enumMatches.length ? [{ boardType: { in: enumMatches } }] : []),
        ],
      };
    }

    const { meta, safeSkip, safeLimit } = await getMeta({
      limit: 10,
      model: 'spWbsCouncilDesignations',
      where,
      page,
    });

    const data = await prisma.spWbsCouncilDesignations.findMany({
      where,
      orderBy: [{ boardType: 'asc' }, { show: 'asc' }, { name: 'asc' }],
      skip: safeSkip,
      take: safeLimit,
    });

    return { data, meta };
  }

  // ---------------------------------

  public async getAll() {
    const data = await prisma.spWbsCouncilDesignations.findMany();
    return data;
  }

  // ---------------------------------

  public async update(id: number, requestBody: WbsCouncilDesignationsDTO) {
    const { boardType, name } = requestBody;

    const data = await prisma.spWbsCouncilDesignations.update({
      where: { id },
      data: {
        boardType: boardType as BoardTypes,
        name,
        slug: generateSlug(name),
      },
    });

    getIO().emit('wcsDesignationUpdated', { id });

    return data;
  }

  // ---------------------------------

  public async delete(id: number) {
    await prisma.spWbsCouncilDesignations.delete({ where: { id } });

    getIO().emit('wcsDesignationDeleted', { id });

    return;
  }

  // ---------------------------------

  public async toggleActive({ id, active }: { id: number; active: boolean }) {
    const data = await prisma.spWbsCouncilDesignations.update({
      where: { id },
      data: { isActive: active },
    });

    getIO().emit('wcsDesignationToggled', { id });

    return data;
  }

  // ---------------------------------

  public async sortShowOrder(
    requestBody: WbsCouncilDesignationsShowOrderDTO[],
  ) {
    const data = await prisma.$transaction(async (tx) => {
      await Promise.all(
        requestBody.map((item: WbsCouncilDesignationsShowOrderDTO) =>
          tx.spWbsCouncilDesignations.update({
            where: { id: item.id },
            data: { show: item.show },
          }),
        ),
      );
    });
    return data;
  }
}

export const wbsCouncilDesignationsService: WbsCouncilDesignationsService =
  new WbsCouncilDesignationsService();
