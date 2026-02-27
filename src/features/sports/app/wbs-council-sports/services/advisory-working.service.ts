import { ROOT_PATH } from '@/globals/constants';
import { BadRequestException } from '@/globals/core/error.core';
import generateSlug from '@/globals/helpers/slug.helper';
import { prisma } from '@/prisma';
import path from 'path';
import fs from 'fs/promises';
import { BoardTypes } from '@/generated/prisma/enums';
import { WbsCouncilMemberDTO } from '../interfaces';
import { SpAdvisoryWoringCommitteeWhereInput } from '@/generated/prisma/models';
import { getMeta } from '@/globals/helpers/meta.helper';

class AdvisoryWorkingService {
  public async checkExist(value: string, id?: number) {
    const slug = generateSlug(value);
    let isExist = null;
    if (id) {
      isExist = await prisma.spAdvisoryWoringCommittee.findFirst({
        where: { slug, NOT: { id } },
        select: { id: true },
      });
    } else {
      isExist = await prisma.spAdvisoryWoringCommittee.findFirst({
        where: { slug },
        select: { id: true },
      });
    }
    return !!isExist;
  }

  // ----------------------

  public async add({
    requestBody,
    file,
  }: {
    requestBody: WbsCouncilMemberDTO;
    file: Express.Multer.File | null;
  }) {
    const {
      boardType,
      designationId,
      name,
      designationLabel,
      address,
      phone,
      email,
      fax,
    } = requestBody;
    const value = name + '-' + boardType + '-' + designationId;

    const isExist = await this.checkExist(value);
    if (isExist)
      throw new BadRequestException(
        'Member from same board and designation already exists',
      );

    const relative = file?.path.replace(ROOT_PATH, '');
    const normalized = relative
      ? relative.split(path.sep).join(path.posix.sep)
      : null;

    try {
      const data = await prisma.$transaction(async (tx) => {
        await tx.spAdvisoryWoringCommittee.create({
          data: {
            boardType: boardType as BoardTypes,
            designationId: Number(designationId),
            name: name.trim(),
            designationLabel: designationLabel?.trim() || null,
            address: address?.trim() || null,
            phone: phone?.trim() || null,
            email: email?.trim() || null,
            fax: fax?.trim() || null,
            slug: generateSlug(value),
            img: normalized,
          },
        });
      });
      return data;
    } catch (error) {
      if (file?.path) {
        await fs.unlink(file.path).catch(() => {});
      }
      throw error;
    }
  }

  // ----------------------------

  public async getPaginated({
    page,
    search,
  }: {
    page: number;
    search: string;
  }) {
    const normalized = search?.trim();
    let where: SpAdvisoryWoringCommitteeWhereInput = {};

    if (normalized) {
      const enumMatches = Object.values(BoardTypes).filter((v) =>
        v.toLowerCase().includes(normalized.toLowerCase()),
      );

      where = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
          { designationLabel: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { fax: { contains: search, mode: 'insensitive' } },
          {
            cDesignation: {
              name: { contains: search, mode: 'insensitive' },
            },
          },
          ...(enumMatches.length ? [{ boardType: { in: enumMatches } }] : []),
        ],
      };
    }

    const { meta, safeSkip, safeLimit } = await getMeta({
      limit: 10,
      model: 'spAdvisoryWoringCommittee',
      where,
      page,
    });

    const data = await prisma.spAdvisoryWoringCommittee.findMany({
      where,
      skip: safeSkip,
      take: safeLimit,
      include: {
        cDesignation: {
          select: { name: true },
        },
      },
      orderBy: [
        { boardType: 'asc' },
        { cDesignation: { show: 'asc' } },
        { name: 'asc' },
      ],
    });
    return { data, meta };
  }

  // ----------------------------

  public async update({
    id,
    requestBody,
    file,
  }: {
    id: number;
    requestBody: WbsCouncilMemberDTO;
    file: Express.Multer.File | null;
  }) {
    const {
      boardType,
      designationId,
      name,
      designationLabel,
      address,
      phone,
      email,
      fax,
    } = requestBody;
    const value = name + '-' + boardType + '-' + designationId;

    const isExist = await this.checkExist(value, id);
    if (isExist)
      throw new BadRequestException(
        'Member from same board and designation already exists',
      );
    console.log(file);
    const relative = file?.path.replace(ROOT_PATH, '');
    const normalized = relative
      ? relative.split(path.sep).join(path.posix.sep)
      : null;
    console.log(normalized);

    try {
      const data = await prisma.$transaction(async (tx) => {
        await tx.spAdvisoryWoringCommittee.update({
          where: { id },
          data: {
            boardType: boardType as BoardTypes,
            designationId: Number(designationId),
            name: name.trim(),
            designationLabel: designationLabel?.trim() || null,
            address: address?.trim() || null,
            phone: phone?.trim() || null,
            email: email?.trim() || null,
            fax: fax?.trim() || null,
            slug: generateSlug(value),
            img: normalized,
          },
        });
      });
      return data;
    } catch (error) {
      if (file?.path) {
        await fs.unlink(file.path).catch(() => {});
      }
      throw error;
    }
  }

  // ----------------------------

  public async delete(id: number) {
    const member = await prisma.spAdvisoryWoringCommittee.findFirst({
      where: { id },
      select: { img: true },
    });
    if (member?.img) {
      const path = ROOT_PATH + member.img;
      await fs.unlink(path).catch(() => {});
    }
    await prisma.spAdvisoryWoringCommittee.delete({ where: { id } });
    return;
  }

  // ----------------------------

  public async toggleActive({ id, active }: { id: number; active: boolean }) {
    await prisma.spAdvisoryWoringCommittee.update({
      where: { id },
      data: { isActive: active },
    });
    return;
  }
}

export const advisoryWorkingService: AdvisoryWorkingService =
  new AdvisoryWorkingService();
