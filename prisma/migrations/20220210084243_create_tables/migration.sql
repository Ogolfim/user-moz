/*
  Warnings:

  - You are about to drop the column `customerId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `customers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_customerId_fkey";

-- DropIndex
DROP INDEX "users_customerId_key";

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "customerId";

-- CreateIndex
CREATE UNIQUE INDEX "customers_userId_key" ON "customers"("userId");

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
