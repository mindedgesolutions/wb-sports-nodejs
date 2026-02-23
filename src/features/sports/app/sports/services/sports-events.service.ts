import { prisma } from '@/prisma';
import { SportsEventsDTO } from '../interfaces';
import { getPaginationAndFilters } from '@/globals/helpers/simple.pagination.helper';

class SportsEventsService {
  public async add(requestBody: SportsEventsDTO) {
    const { title, startDate } = requestBody;
    const formatted = startDate ? new Date(startDate) : null;

    const data = await prisma.spSportsEvents.create({
      data: { title: title.trim(), startDate: formatted },
    });

    return data;
  }

  // --------------------------------

  public async getAll({ page, search }: { page: number; search?: string }) {
    const data = await getPaginationAndFilters({
      page,
      quickFilter: search,
      quickFilterFields: ['title'],
      baseWhere: {},
      model: 'spSportsEvents',
      sortBy: [{ startDate: 'desc' }, { id: 'desc' }],
    });

    return data;
  }

  // --------------------------------

  public async update({
    id,
    requestBody,
  }: {
    id: number;
    requestBody: SportsEventsDTO;
  }) {
    const { title, startDate } = requestBody;
    const formatted = startDate ? new Date(startDate) : null;

    const data = await prisma.spSportsEvents.update({
      where: { id },
      data: { title: title.trim(), startDate: formatted },
    });

    return data;
  }

  // --------------------------------

  public async delete(id: number) {
    await prisma.spSportsEvents.delete({ where: { id } });

    return;
  }

  // --------------------------------

  public async toggleActive({ id, active }: { id: number; active: boolean }) {
    const data = await prisma.spSportsEvents.update({
      where: { id },
      data: { isActive: active },
    });
    return data;
  }
}

export const sportsEventsService: SportsEventsService =
  new SportsEventsService();
