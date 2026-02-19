/*
  Warnings:

  - You are about to alter the column `contactOne` on the `SpSportsPersonnel` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `contactTwo` on the `SpSportsPersonnel` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "SpSportsPersonnel" ALTER COLUMN "contactOne" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "contactTwo" SET DATA TYPE VARCHAR(20);
