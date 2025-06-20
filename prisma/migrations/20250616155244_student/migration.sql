/*
  Warnings:

  - You are about to drop the column `experience` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "experience",
ADD COLUMN     "language" TEXT,
ADD COLUMN     "skills" TEXT;
