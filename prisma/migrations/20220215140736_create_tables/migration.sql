/*
  Warnings:

  - You are about to drop the `_BillToService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `services` to the `bills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BillToService" DROP CONSTRAINT "_BillToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_BillToService" DROP CONSTRAINT "_BillToService_B_fkey";

-- AlterTable
ALTER TABLE "bills" ADD COLUMN     "services" JSONB NOT NULL;

-- DropTable
DROP TABLE "_BillToService";

-- DropTable
DROP TABLE "services";
