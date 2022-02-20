/*
  Warnings:

  - You are about to drop the column `totalAmount` on the `bills` table. All the data in the column will be lost.
  - Added the required column `totalAmountToPay` to the `bills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bills" DROP COLUMN "totalAmount",
ADD COLUMN     "totalAmountToPay" DECIMAL(65,30) NOT NULL;
