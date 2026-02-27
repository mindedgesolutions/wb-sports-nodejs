import { AnnouncementTypes } from '@/generated/prisma/enums';
import { SpAnnouncementsWhereInput } from '@/generated/prisma/models';
import { getMeta } from '@/globals/helpers/meta.helper';
import { getPaginationAndFilters } from '@/globals/helpers/simple.pagination.helper';
import { prisma } from '@/prisma';

class AnnouncementsService {
  public async add({
    requestBody,
    file,
  }: {
    requestBody: any;
    file: Express.Multer.File;
  }) {}

  // ------------------------

  public async getPaginated({
    page,
    search,
  }: {
    page: number;
    search: string;
  }) {
    const normalized = search?.trim();
    let where: SpAnnouncementsWhereInput = {};

    if (normalized) {
      const enumMatches = Object.values(AnnouncementTypes).filter((v) =>
        v.toLowerCase().includes(normalized.toLowerCase()),
      );

      where = {
        OR: [
          { annNo: { contains: search, mode: 'insensitive' } },
          { subject: { contains: search, mode: 'insensitive' } },
          ...(enumMatches.length ? [{ type: { in: enumMatches } }] : []),
        ],
      };
    }

    const { meta, safeSkip, safeLimit } = await getMeta({
      limit: 10,
      model: 'spAnnouncements',
      where,
      page,
    });

    const data = await prisma.spAnnouncements.findMany({
      where,
      skip: safeSkip,
      take: safeLimit,
      orderBy: [{ type: 'asc' }, { createdAt: 'desc' }, { id: 'desc' }],
    });
    return { data, meta };
  }

  // ------------------------

  public async update({
    id,
    requestBody,
    file,
  }: {
    id: number;
    requestBody: any;
    file: Express.Multer.File | null;
  }) {}

  // ------------------------

  public async delete(id: number) {
    await prisma.spAnnouncements.delete({ where: { id } });
    return;
  }

  // ------------------------

  public async toggleActive({ id, active }: { id: number; active: boolean }) {}
}

export const announcementsService: AnnouncementsService =
  new AnnouncementsService();
