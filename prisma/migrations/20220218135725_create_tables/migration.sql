/*
  Warnings:

  - You are about to drop the column `userId` on the `conpany_info` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminId]` on the table `conpany_info` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `conpany_info` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "conpany_info" DROP CONSTRAINT "conpany_info_userId_fkey";

-- DropIndex
DROP INDEX "conpany_info_userId_key";

-- AlterTable
ALTER TABLE "conpany_info" DROP COLUMN "userId",
ADD COLUMN     "adminId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "conpany_info_adminId_key" ON "conpany_info"("adminId");

-- AddForeignKey
ALTER TABLE "conpany_info" ADD CONSTRAINT "conpany_info_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
