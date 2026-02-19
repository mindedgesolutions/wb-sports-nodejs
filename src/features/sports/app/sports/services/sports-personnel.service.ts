import { getPaginationAndFilters } from '@/globals/helpers/simple.pagination.helper';
import { prisma } from '@/prisma';

class SportsPersonnelService {
  public async add(requestBody: any) {
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

  public async update({ id, requestBody }: { id: number; requestBody: any }) {
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

  public async delete(id: number) {}

  // -------------------------------------

  public async toggleActive({ id, active }: { id: number; active: boolean }) {}
}

export const sportsPersonnelService: SportsPersonnelService =
  new SportsPersonnelService();
