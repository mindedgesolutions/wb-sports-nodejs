import { prisma } from '@/prisma';
import {
  WbsCouncilDesignationsDTO,
  WbsCouncilDesignationsShowOrderDTO,
} from '../interfaces';
import { getPaginationAndFilters } from '@/globals/helpers/simple.pagination.helper';
import generateSlug from '@/globals/helpers/slug.helper';
import { BoardTypes } from '@/generated/prisma/enums';
import { SpWbsCouncilDesignationsWhereInput } from '@/generated/prisma/models';
import { getMeta } from '@/globals/helpers/meta.helper';

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

  public async update(id: number, requestBody: WbsCouncilDesignationsDTO) {}

  // ---------------------------------

  public async delete(id: number) {}

  // ---------------------------------

  public async toggleActive({ id, active }: { id: number; active: boolean }) {
    const data = await prisma.spWbsCouncilDesignations.update({
      where: { id },
      data: { isActive: active },
    });
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
