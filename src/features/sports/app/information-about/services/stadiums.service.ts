import { ROOT_PATH } from '@/globals/constants';
import { BadRequestException } from '@/globals/core/error.core';
import generateSlug from '@/globals/helpers/slug.helper';
import { prisma } from '@/prisma';
import path from 'path';
import fs from 'fs';

class StadiumService {
  public async checkExists(slug: string, id?: number) {
    let check = null;
    if (id) {
      check = await prisma.spStadiums.findFirst({
        where: { slug, NOT: { id } },
        select: { id: true },
      });
    } else {
      check = await prisma.spStadiums.findFirst({
        where: { slug },
        select: { id: true },
      });
    }
    return !!check;
  }

  // -------------------------------

  public async add({
    requestBody,
    cover,
    gallery,
  }: {
    requestBody: any;
    cover: Express.Multer.File;
    gallery: Express.Multer.File[];
  }) {
    const { name, location, address, highlights } = requestBody;
    const nameSlug = generateSlug(name);
    const check = await this.checkExists(nameSlug);
    if (check)
      throw new BadRequestException('Stadium with same name already exists');

    try {
      const master = await prisma.spStadiums.create({
        data: {
          name: name.trim(),
          slug: nameSlug,
          location: location.trim(),
          address: address ? address.trim() : null,
        },
      });
      const stadiumId = master.id;
      const dir = path.join(ROOT_PATH, `uploads/sports/stadiums/${stadiumId}`);
      fs.mkdirSync(dir, { recursive: true });

      const newPath = path.join(dir, cover.filename);
      fs.renameSync(cover.path, newPath);

      const galleryImg = gallery || [];
      galleryImg.forEach((file) => {
        fs.renameSync(file.path, path.join(dir, file.filename));
      });

      const parsedHighlights = JSON.parse(highlights);

      await prisma.spStadiumHighlights.createMany(
        parsedHighlights.map((h: string) => ({
          stadiumId,
          highlight: h,
        })),
      );
    } catch (error) {}
  }

  // -------------------------------

  public async getPaginated({
    page,
    search,
  }: {
    page: number;
    search?: string;
  }) {}

  // -------------------------------

  public async getById(id: number) {}

  // -------------------------------

  public async update({ id, requestBody }: { id: number; requestBody: any }) {}

  // -------------------------------

  public async delete(id: number) {}

  // -------------------------------

  public async toggleActive(req: Request, res: Response) {}
}

export const stadiumService: StadiumService = new StadiumService();
