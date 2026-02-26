/*
  Warnings:

  - You are about to drop the column `designation` on the `SpAdvisoryWoringCommittee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SpAdvisoryWoringCommittee" DROP COLUMN "designation",
ADD COLUMN     "designationLabel" VARCHAR(255);
