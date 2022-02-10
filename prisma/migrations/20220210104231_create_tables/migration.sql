/*
  Warnings:

  - You are about to drop the column `addressId` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `customers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customerId]` on the table `customer_services` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `customer_services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_addressId_fkey";

-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_serviceId_fkey";

-- DropIndex
DROP INDEX "customers_addressId_key";

-- DropIndex
DROP INDEX "customers_email_key";

-- DropIndex
DROP INDEX "customers_serviceId_key";

-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "customerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "customer_services" ADD COLUMN     "customerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "addressId",
DROP COLUMN "serviceId";

-- CreateIndex
CREATE UNIQUE INDEX "addresses_customerId_key" ON "addresses"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "customer_services_customerId_key" ON "customer_services"("customerId");

-- AddForeignKey
ALTER TABLE "customer_services" ADD CONSTRAINT "customer_services_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
