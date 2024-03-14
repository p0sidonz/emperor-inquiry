-- CreateEnum
CREATE TYPE "packageType" AS ENUM ('GENERAL', 'PERSONAL');

-- CreateTable
CREATE TABLE "UserInquiry" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT,
    "isMember" BOOLEAN,
    "isReturning" BOOLEAN,
    "convertedDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Userpackage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "packageType" NOT NULL DEFAULT 'GENERAL',
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Userpackage_pkey" PRIMARY KEY ("id")
);
