/*
  Warnings:

  - You are about to alter the column `name` on the `SpAdminStructure` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `SpKeyPersonnel` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `rank` on the `SpKeyPersonnel` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `designation` on the `SpKeyPersonnel` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `mobile` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `password` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "SpAdminStructure" ADD COLUMN     "slug" VARCHAR(255),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "SpKeyPersonnel" ADD COLUMN     "slug" VARCHAR(255),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "rank" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "designation" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "SpSportsPersonnel" ADD COLUMN     "slug" VARCHAR(255);

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "mobile" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);
