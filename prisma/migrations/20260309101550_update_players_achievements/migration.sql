/*
  Warnings:

  - Changed the type of `sport` on the `SpPlayersAchievements` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SpPlayersAchievements" DROP COLUMN "sport",
ADD COLUMN     "sport" VARCHAR(255) NOT NULL;

-- DropEnum
DROP TYPE "AchievementSports";
