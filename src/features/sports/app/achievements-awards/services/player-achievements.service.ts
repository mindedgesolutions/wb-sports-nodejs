import { BadRequestException } from '@/globals/core/error.core';
import { validDate } from '@/globals/helpers/formats.helper';
import { getPaginationAndFilters } from '@/globals/helpers/simple.pagination.helper';
import generateSlug from '@/globals/helpers/slug.helper';
import { prisma } from '@/prisma';
import { PlayerAchievementsDTO } from '../interfaces';

class PlayerAchievementsService {
  public async checkExists(name: string, id?: number) {
    const nameSlug = generateSlug(name);
    let exists = null;

    if (id) {
      exists = await prisma.spPlayersAchievements.findFirst({
        where: { slug: nameSlug, NOT: { id } },
      });
    } else {
      exists = await prisma.spPlayersAchievements.findFirst({
        where: { slug: nameSlug },
      });
    }
    return !!exists;
  }

  // ---------------------------

  public async add(requestBody: PlayerAchievementsDTO) {
    const { sport, name, description, achievementDate } = requestBody;

    const exists = await this.checkExists(name as string);

    if (exists) throw new BadRequestException('Player exists');

    const slug = generateSlug(name as string);

    const data = await prisma.spPlayersAchievements.create({
      data: {
        sport: sport.trim(),
        name: name.trim(),
        slug,
        description: description.trim(),
        achievementDate: achievementDate ? validDate(achievementDate) : null,
      },
    });
    return data;
  }

  // ---------------------------

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
      quickFilterFields: ['sport', 'name', 'description'],
      baseWhere: {},
      model: 'spPlayersAchievements',
      sortBy: [{ achievementDate: 'desc' }, { sport: 'asc' }, { name: 'asc' }],
    });
    return { data, meta };
  }

  // ---------------------------

  public async update({
    id,
    requestBody,
  }: {
    id: number;
    requestBody: PlayerAchievementsDTO;
  }) {
    const { sport, name, description, achievementDate } = requestBody;

    const exists = await this.checkExists(name as string, id);

    if (exists) throw new BadRequestException('Player exists');

    const slug = generateSlug(name as string);

    const data = await prisma.spPlayersAchievements.update({
      where: { id },
      data: {
        sport: sport.trim(),
        name: name.trim(),
        slug,
        description: description.trim(),
        achievementDate: achievementDate ? validDate(achievementDate) : null,
      },
    });
    return data;
  }

  // ---------------------------

  public async delete(id: number) {
    await prisma.spPlayersAchievements.delete({ where: { id } });
    return;
  }

  // ---------------------------

  public async toggleActive({ id, checked }: { id: number; checked: boolean }) {
    await prisma.spPlayersAchievements.update({
      where: { id },
      data: { isActive: checked },
    });
    return;
  }
}

export const playerAchievementsService: PlayerAchievementsService =
  new PlayerAchievementsService();
