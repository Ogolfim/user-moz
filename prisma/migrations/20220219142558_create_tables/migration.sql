/*
  Warnings:

  - Changed the type of `bornAt` on the `student_info` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "student_info" DROP COLUMN "bornAt",
ADD COLUMN     "bornAt" TIMESTAMP(3) NOT NULL;
