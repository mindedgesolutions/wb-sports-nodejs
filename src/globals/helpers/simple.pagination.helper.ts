import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/prisma';

export async function getPaginationAndFilters({
  page = 1,
  limit = 10,
  quickFilter,
  quickFilterFields = [],
  baseWhere = {},
  model,
  sortBy = {},
}: any) {
  const normalizedFilter = quickFilter?.trim();

  const where = normalizedFilter
    ? {
        ...baseWhere,
        OR: quickFilterFields.map((field: string) => ({
          [field]: {
            contains: normalizedFilter,
            mode: Prisma.QueryMode.insensitive,
          },
        })),
      }
    : { ...baseWhere };

  const safeLimit = Math.min(Math.max(limit, 1), 100);

  const total = await (prisma[model] as any).count({ where });

  const totalPages = Math.max(Math.ceil(total / safeLimit), 1);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const safeSkip = (safePage - 1) * safeLimit;

  const data = await (prisma as any)[model].findMany({
    where,
    orderBy: sortBy,
    skip: safeSkip,
    take: safeLimit,
  });

  const meta = { currentPage: safePage, total: total, totalPages };

  return { data, meta };
}
