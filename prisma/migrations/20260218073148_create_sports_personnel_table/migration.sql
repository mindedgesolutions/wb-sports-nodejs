-- CreateTable
CREATE TABLE "SpSportsPersonnel" (
    "id" SERIAL NOT NULL,
    "sport" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "dob" DATE,
    "contactOne" TEXT,
    "contactTwo" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SpSportsPersonnel_pkey" PRIMARY KEY ("id")
);
