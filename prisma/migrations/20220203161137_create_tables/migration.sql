-- CreateTable
CREATE TABLE "tag_user" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "tag_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tag_user" ADD CONSTRAINT "tag_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_user" ADD CONSTRAINT "tag_user_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
