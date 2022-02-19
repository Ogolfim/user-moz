/*
  Warnings:

  - You are about to drop the column `companyId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `bills` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `employee_info` table. All the data in the column will be lost.
  - You are about to drop the `conpany_info` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[businessId]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[businessId]` on the table `bills` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[businessId]` on the table `employee_info` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `businessId` to the `employee_info` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_companyId_fkey";

-- DropForeignKey
ALTER TABLE "bills" DROP CONSTRAINT "bills_companyId_fkey";

-- DropForeignKey
ALTER TABLE "conpany_info" DROP CONSTRAINT "conpany_info_adminId_fkey";

-- DropForeignKey
ALTER TABLE "employee_info" DROP CONSTRAINT "employee_info_companyId_fkey";

-- DropIndex
DROP INDEX "addresses_companyId_key";

-- DropIndex
DROP INDEX "bills_companyId_key";

-- DropIndex
DROP INDEX "employee_info_companyId_key";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "companyId",
ADD COLUMN     "businessId" TEXT;

-- AlterTable
ALTER TABLE "bills" DROP COLUMN "companyId",
ADD COLUMN     "businessId" TEXT;

-- AlterTable
ALTER TABLE "employee_info" DROP COLUMN "companyId",
ADD COLUMN     "businessId" TEXT NOT NULL;

-- DropTable
DROP TABLE "conpany_info";

-- CreateTable
CREATE TABLE "business_info" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_info_adminId_key" ON "business_info"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_businessId_key" ON "addresses"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "bills_businessId_key" ON "bills"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "employee_info_businessId_key" ON "employee_info"("businessId");

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_info" ADD CONSTRAINT "business_info_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_info" ADD CONSTRAINT "employee_info_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "business_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;
