-- CreateEnum
CREATE TYPE "AnnouncementTypes" AS ENUM ('news', 'tender', 'circular');

-- CreateTable
CREATE TABLE "SpAnnouncements" (
    "id" SERIAL NOT NULL,
    "type" "AnnouncementTypes" NOT NULL,
    "annNo" VARCHAR(255) NOT NULL,
    "subject" TEXT NOT NULL,
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    "startDate" DATE,
    "endDate" DATE,
    "filePath" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpAnnouncements_pkey" PRIMARY KEY ("id")
);
