/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `employee_info` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "employee_info_companyId_key" ON "employee_info"("companyId");
