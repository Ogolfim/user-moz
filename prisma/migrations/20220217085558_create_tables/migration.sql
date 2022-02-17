/*
  Warnings:

  - You are about to drop the column `verifyed` on the `employee_info` table. All the data in the column will be lost.
  - You are about to drop the column `verifyed` on the `student_info` table. All the data in the column will be lost.
  - Added the required column `verified` to the `employee_info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verified` to the `student_info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employee_info" DROP COLUMN "verifyed",
ADD COLUMN     "verified" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "student_info" DROP COLUMN "verifyed",
ADD COLUMN     "verified" BOOLEAN NOT NULL;
