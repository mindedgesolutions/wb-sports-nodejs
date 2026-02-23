import { getPaginationAndFilters } from '@/globals/helpers/simple.pagination.helper';
import { prisma } from '@/prisma';
import { SportsPersonnelDTO } from '../interfaces';

class SportsPersonnelService {
  public async add(requestBody: SportsPersonnelDTO) {
    const { sport, name, address, dob, contactOne, contactTwo } = requestBody;
    const formattedDate = dob ? new Date(dob) : null;

    const data = await prisma.spSportsPersonnel.create({
      data: {
        sport,
        name,
        address: address || null,
        dob: formattedDate,
        contactOne: contactOne || null,
        contactTwo: contactTwo || null,
      },
    });

    return data;
  }

  // -------------------------------------

  public async getAll({ page, search }: { page: number; search?: string }) {
    const data = await getPaginationAndFilters({
      page,
      quickFilter: search,
      quickFilterFields: [
        'sport',
        'name',
        'address',
        'contactOne',
        'contactTwo',
      ],
      baseWhere: {},
      model: 'spSportsPersonnel',
      sortBy: [{ sport: 'asc' }, { name: 'asc' }],
    });
    return data;
  }

  // -------------------------------------

  public async update({
    id,
    requestBody,
  }: {
    id: number;
    requestBody: SportsPersonnelDTO;
  }) {
    const { sport, name, address, dob, contactOne, contactTwo } = requestBody;
    const formattedDate = dob ? new Date(dob) : null;

    const data = await prisma.spSportsPersonnel.update({
      where: { id },
      data: {
        sport,
        name,
        address: address || null,
        dob: formattedDate,
        contactOne: contactOne || null,
        contactTwo: contactTwo || null,
      },
    });

    return data;
  }

  // -------------------------------------

  public async delete(id: number) {
    await prisma.spSportsPersonnel.delete({ where: { id } });
    return;
  }

  // -------------------------------------

  public async toggleActive({ id, active }: { id: number; active: boolean }) {
    const data = await prisma.spSportsPersonnel.update({
      where: { id },
      data: { isActive: active },
    });
    return data;
  }
}

export const sportsPersonnelService: SportsPersonnelService =
  new SportsPersonnelService();
