/*
  Warnings:

  - Added the required column `boardType` to the `SpAdvisoryWoringCommittee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SpAdvisoryWoringCommittee" ADD COLUMN     "boardType" "BoardTypes" NOT NULL;
