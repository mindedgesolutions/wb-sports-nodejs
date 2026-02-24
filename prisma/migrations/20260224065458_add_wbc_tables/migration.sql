-- CreateEnum
CREATE TYPE "BoardTypes" AS ENUM ('advisory-board', 'working-committee');

-- CreateTable
CREATE TABLE "SpWbsCouncilDesignations" (
    "id" SERIAL NOT NULL,
    "boardType" "BoardTypes" NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SpWbsCouncilDesignations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpAdvisoryWoringCommittee" (
    "id" SERIAL NOT NULL,
    "designationId" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "designation" VARCHAR(255),
    "address" VARCHAR(255),
    "phone" VARCHAR(20),
    "email" VARCHAR(255),
    "fax" VARCHAR(20),
    "img" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SpAdvisoryWoringCommittee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpAdvisoryWoringCommittee" ADD CONSTRAINT "SpAdvisoryWoringCommittee_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "SpWbsCouncilDesignations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
