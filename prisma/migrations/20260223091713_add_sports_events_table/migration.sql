-- CreateTable
CREATE TABLE "SpSportsEvents" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" DATE,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpSportsEvents_pkey" PRIMARY KEY ("id")
);
