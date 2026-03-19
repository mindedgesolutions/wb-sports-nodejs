import { getPaginationAndFilters } from '@/globals/helpers/simple.pagination.helper';
import { prisma } from '@/prisma';
import { SportsPersonnelDTO } from '../interfaces';
import { validDate } from '@/globals/helpers/formats.helper';
import { getIO } from '@/socket.io';

class SportsPersonnelService {
  public async add(requestBody: SportsPersonnelDTO) {
    const { sport, name, address, dob, contactOne, contactTwo } = requestBody;
    const formattedDate = dob ? validDate(dob) : null;

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

    getIO().emit('sportsPersonnelCreated', data);

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
    const formattedDate = dob ? validDate(dob) : null;

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

    getIO().emit('sportsPersonnelUpdated', { id });

    return data;
  }

  // -------------------------------------

  public async delete(id: number) {
    await prisma.spSportsPersonnel.delete({ where: { id } });

    getIO().emit('sportsPersonnelDeleted', { id });

    return;
  }

  // -------------------------------------

  public async toggleActive({ id, active }: { id: number; active: boolean }) {
    const data = await prisma.spSportsPersonnel.update({
      where: { id },
      data: { isActive: active },
    });

    getIO().emit('sportsPersonnelToggled', { id });

    return data;
  }
}

export const sportsPersonnelService: SportsPersonnelService =
  new SportsPersonnelService();
