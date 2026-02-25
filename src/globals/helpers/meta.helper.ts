import { prisma } from '@/prisma';

type MetaInput = {
  limit: number;
  model: any;
  where?: any;
  page: number;
};

type ReturnType = {
  meta: {
    currentPage: number;
    total: number;
    totalPages: number;
  };
  safeSkip: number;
  safeLimit: number;
};

export const getMeta = async ({
  limit = 10,
  model,
  where,
  page = 1,
}: MetaInput): Promise<ReturnType> => {
  const safeLimit = Math.min(Math.max(limit, 1), 100);
  const total = await (prisma[model] as any).count({ where });
  const totalPage = Math.max(Math.ceil(total / safeLimit), 1);
  const safePage = Math.min(Math.max(page, 1), totalPage);
  const safeSkip = (safePage - 1) * safeLimit;

  const meta = {
    currentPage: safePage,
    total: total,
    totalPages: totalPage,
  };

  return { meta, safeSkip, safeLimit };
};
