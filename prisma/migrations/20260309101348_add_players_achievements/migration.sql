-- CreateEnum
CREATE TYPE "AchievementSports" AS ENUM ('archery', 'paralympic-athletics', 'boxing', 'cricket', 'kabaddi-weightlifting', 'cycling', 'hockey', 'football', 'athletics', 'table-tennis', 'posthumous-award', 'lawn-tennis', 'weight-lifting', 'waterpolo', 'shooting', 'badminton', 'billiards-snooker', 'chess');

-- CreateTable
CREATE TABLE "SpPlayersAchievements" (
    "id" SERIAL NOT NULL,
    "sport" "AchievementSports" NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "achievementDate" DATE,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpPlayersAchievements_pkey" PRIMARY KEY ("id")
);
