/*
  Warnings:

  - The values [news] on the enum `AnnouncementTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AnnouncementTypes_new" AS ENUM ('notice', 'tender', 'circular');
ALTER TABLE "SpAnnouncements" ALTER COLUMN "type" TYPE "AnnouncementTypes_new" USING ("type"::text::"AnnouncementTypes_new");
ALTER TYPE "AnnouncementTypes" RENAME TO "AnnouncementTypes_old";
ALTER TYPE "AnnouncementTypes_new" RENAME TO "AnnouncementTypes";
DROP TYPE "public"."AnnouncementTypes_old";
COMMIT;
