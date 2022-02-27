/*
  Warnings:

  - The primary key for the `bills` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_billId_fkey";

-- AlterTable
ALTER TABLE "bills" DROP CONSTRAINT "bills_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "bills_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "bills_id_seq";

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "paymentStartedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "billId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_billId_fkey" FOREIGN KEY ("billId") REFERENCES "bills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
