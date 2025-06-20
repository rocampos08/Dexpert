/*
  Warnings:

  - You are about to drop the `StripeCustomer` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "level" TEXT,
ADD COLUMN     "pymeId" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3);

-- DropTable
DROP TABLE "StripeCustomer";

-- CreateTable
CREATE TABLE "Pyme" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "website" TEXT,
    "location" TEXT,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pyme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pyme_userId_key" ON "Pyme"("userId");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_pymeId_fkey" FOREIGN KEY ("pymeId") REFERENCES "Pyme"("id") ON DELETE SET NULL ON UPDATE CASCADE;
