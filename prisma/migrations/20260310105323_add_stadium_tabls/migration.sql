-- CreateTable
CREATE TABLE "SpStadiums" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255),
    "address" TEXT,
    "coverPhoto" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpStadiums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpStadiumHighlights" (
    "id" SERIAL NOT NULL,
    "stadiumId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpStadiumHighlights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpStadiumImages" (
    "id" SERIAL NOT NULL,
    "stadiumId" INTEGER NOT NULL,
    "imagePath" TEXT NOT NULL,

    CONSTRAINT "SpStadiumImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpStadiumHighlights" ADD CONSTRAINT "SpStadiumHighlights_stadiumId_fkey" FOREIGN KEY ("stadiumId") REFERENCES "SpStadiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpStadiumImages" ADD CONSTRAINT "SpStadiumImages_stadiumId_fkey" FOREIGN KEY ("stadiumId") REFERENCES "SpStadiums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
