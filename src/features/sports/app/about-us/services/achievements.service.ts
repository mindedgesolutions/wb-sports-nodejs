import { prisma } from '@/prisma';
import { AchievementsDTO } from '../interfaces';
import { getPaginationAndFilters } from '@/globals/helpers/simple.pagination.helper';

class AchievementsService {
  public async create(requestBody: AchievementsDTO) {
    const { title, description, achievementDate } = requestBody;
    const formattedDate = achievementDate ? new Date(achievementDate) : null;

    const data = await prisma.spAchievements.create({
      data: { title, description, achievementDate: formattedDate },
    });

    return data;
  }

  // ----------------------

  public async getAll({ page, search }: { page: number; search?: string }) {
    const { data, meta } = await getPaginationAndFilters({
      page,
      quickFilter: search,
      quickFilterFields: ['title', 'description'],
      baseWhere: {},
      model: 'spAchievements',
      sortBy: [{ achievementDate: 'desc' }, { id: 'desc' }],
    });

    return { data, meta };
  }

  // ----------------------

  public async update({
    id,
    requestBody,
  }: {
    id: number;
    requestBody: AchievementsDTO;
  }) {
    const { title, description, achievementDate } = requestBody;
    const formattedDate = achievementDate ? new Date(achievementDate) : null;

    const data = await prisma.spAchievements.update({
      where: { id },
      data: { title, description, achievementDate: formattedDate },
    });

    return data;
  }

  // ----------------------

  public async delete(id: number) {
    await prisma.spAchievements.delete({
      where: { id },
    });

    return;
  }

  // ----------------------

  public async toggleActive({ id, active }: { id: number; active: boolean }) {
    const data = await prisma.spAchievements.update({
      where: { id },
      data: { isActive: active },
    });

    return data;
  }
}

export const achievementsService: AchievementsService =
  new AchievementsService();
