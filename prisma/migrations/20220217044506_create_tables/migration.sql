/*
  Warnings:

  - You are about to drop the column `unipessoalId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the `unipessoal_info` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[unipersonalId]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_unipessoalId_fkey";

-- DropForeignKey
ALTER TABLE "unipessoal_info" DROP CONSTRAINT "unipessoal_info_userId_fkey";

-- DropIndex
DROP INDEX "addresses_unipessoalId_key";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "unipessoalId",
ADD COLUMN     "unipersonalId" TEXT;

-- DropTable
DROP TABLE "unipessoal_info";

-- CreateTable
CREATE TABLE "unipersonal_info" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "unipersonal_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EmployeeToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "unipersonal_info_userId_key" ON "unipersonal_info"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeToTag_AB_unique" ON "_EmployeeToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeToTag_B_index" ON "_EmployeeToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_unipersonalId_key" ON "addresses"("unipersonalId");

-- AddForeignKey
ALTER TABLE "unipersonal_info" ADD CONSTRAINT "unipersonal_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_unipersonalId_fkey" FOREIGN KEY ("unipersonalId") REFERENCES "unipersonal_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToTag" ADD FOREIGN KEY ("A") REFERENCES "employee_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToTag" ADD FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
