/*
  Warnings:

  - You are about to drop the column `customerId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `customer_services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_services` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[unipessoalId]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyId]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentId]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[employeeId]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountType` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_customerId_fkey";

-- DropForeignKey
ALTER TABLE "customer_services" DROP CONSTRAINT "customer_services_customerId_fkey";

-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_userId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_serviceId_fkey";

-- DropIndex
DROP INDEX "addresses_customerId_key";

-- DropIndex
DROP INDEX "addresses_provinceOrState_key";

-- DropIndex
DROP INDEX "users_serviceId_key";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "customerId",
ADD COLUMN     "companyId" TEXT,
ADD COLUMN     "employeeId" TEXT,
ADD COLUMN     "studentId" TEXT,
ADD COLUMN     "unipessoalId" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "serviceId",
ADD COLUMN     "accountType" TEXT NOT NULL;

-- DropTable
DROP TABLE "customer_services";

-- DropTable
DROP TABLE "customers";

-- DropTable
DROP TABLE "user_services";

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bills" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "nextBillableDay" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "paymentStartedAt" TIMESTAMP(3) NOT NULL,
    "paymentDeadline" TIMESTAMP(3) NOT NULL,
    "billId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unipessoal_info" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "unipessoal_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conpany_info" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conpany_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_info" (
    "id" TEXT NOT NULL,
    "verifyed" BOOLEAN NOT NULL,
    "phone" TEXT NOT NULL,
    "bornAt" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "student_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_info" (
    "id" TEXT NOT NULL,
    "verifyed" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "hash" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BillToService" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "bills_userId_key" ON "bills"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_billId_key" ON "payments"("billId");

-- CreateIndex
CREATE UNIQUE INDEX "unipessoal_info_userId_key" ON "unipessoal_info"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "conpany_info_userId_key" ON "conpany_info"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "student_info_userId_key" ON "student_info"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "employee_info_email_key" ON "employee_info"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_BillToService_AB_unique" ON "_BillToService"("A", "B");

-- CreateIndex
CREATE INDEX "_BillToService_B_index" ON "_BillToService"("B");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_unipessoalId_key" ON "addresses"("unipessoalId");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_companyId_key" ON "addresses"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_studentId_key" ON "addresses"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_employeeId_key" ON "addresses"("employeeId");

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_billId_fkey" FOREIGN KEY ("billId") REFERENCES "bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unipessoal_info" ADD CONSTRAINT "unipessoal_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conpany_info" ADD CONSTRAINT "conpany_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_info" ADD CONSTRAINT "student_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_info" ADD CONSTRAINT "employee_info_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "conpany_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_unipessoalId_fkey" FOREIGN KEY ("unipessoalId") REFERENCES "unipessoal_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "conpany_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employee_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BillToService" ADD FOREIGN KEY ("A") REFERENCES "bills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BillToService" ADD FOREIGN KEY ("B") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
