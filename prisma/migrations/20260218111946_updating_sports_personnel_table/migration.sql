/*
  Warnings:

  - You are about to alter the column `sport` on the `SpSportsPersonnel` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `SpSportsPersonnel` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "SpSportsPersonnel" ALTER COLUMN "sport" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);
