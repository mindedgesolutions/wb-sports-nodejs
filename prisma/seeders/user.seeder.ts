import { prisma } from '../../src/prisma';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { SALT_ROUNDS } from '../../src/globals/constants';
import { Department } from '../../src/generated/prisma/enums';

dotenv.config();

export async function seedUsers() {
  const fk = faker;
  const password = await bcrypt.hash('password', SALT_ROUNDS);
  const dept = ['services', 'sports'];

  let users = Array.from({ length: 50 }, () => ({
    name: fk.person.fullName(),
    email: fk.internet.email(),
    password,
    department: fk.helpers.arrayElement(dept) as Department,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await prisma.users.createMany({
    data: users,
  });
}
