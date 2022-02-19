/*
  Warnings:

  - You are about to drop the column `amount` on the `bills` table. All the data in the column will be lost.
  - Added the required column `totalAmount` to the `bills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bills" DROP COLUMN "amount",
ADD COLUMN     "totalAmount" DECIMAL(65,30) NOT NULL;
