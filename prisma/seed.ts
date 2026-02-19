import { prisma } from '../src/prisma';
import dotenv from 'dotenv';
import { seedUsers } from './seeders/user.seeder';

dotenv.config();

async function main() {
  await seedUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
