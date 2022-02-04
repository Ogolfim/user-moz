/*
  Warnings:

  - You are about to drop the `tag_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tag_user" DROP CONSTRAINT "tag_user_tagId_fkey";

-- DropForeignKey
ALTER TABLE "tag_user" DROP CONSTRAINT "tag_user_userId_fkey";

-- DropTable
DROP TABLE "tag_user";

-- CreateTable
CREATE TABLE "tagUser" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "tagUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meAdmin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "meAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "meAdmin_email_key" ON "meAdmin"("email");

-- AddForeignKey
ALTER TABLE "tagUser" ADD CONSTRAINT "tagUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tagUser" ADD CONSTRAINT "tagUser_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
