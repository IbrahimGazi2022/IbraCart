-- CreateTable
CREATE TABLE "HeroBanner" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "badgeText" TEXT,
    "badgeDiscount" TEXT,
    "headingLine1" TEXT,
    "headingLine2" TEXT,
    "headingLine3" TEXT,
    "buttonText" TEXT,
    "discount" TEXT,
    "title" TEXT,
    "description1" TEXT,
    "description2" TEXT,
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroBanner_pkey" PRIMARY KEY ("id")
);
