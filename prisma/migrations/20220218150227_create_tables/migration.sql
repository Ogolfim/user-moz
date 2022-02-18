-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hash" TEXT,
    "serverName" TEXT,
    "email" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "userServiceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_services" (
    "id" SERIAL NOT NULL,
    "api" BOOLEAN NOT NULL DEFAULT false,
    "webDownload" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bills" (
    "id" SERIAL NOT NULL,
    "services" JSONB NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "nextBillableDay" TIMESTAMP(3) NOT NULL,
    "note" TEXT NOT NULL,
    "unipersonalId" TEXT,
    "companyId" TEXT,
    "studentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "paymentStartedAt" TIMESTAMP(3) NOT NULL,
    "paymentDeadline" TIMESTAMP(3) NOT NULL,
    "billId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "conpany_info" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conpany_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_info" (
    "id" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "phone" TEXT NOT NULL,
    "bornAt" TEXT NOT NULL,
    "schoolName" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "student_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_info" (
    "id" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employee_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "provinceOrState" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "unipersonalId" TEXT,
    "companyId" TEXT,
    "studentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "me_admins" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "me_admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_userServiceId_key" ON "users"("userServiceId");

-- CreateIndex
CREATE UNIQUE INDEX "bills_unipersonalId_key" ON "bills"("unipersonalId");

-- CreateIndex
CREATE UNIQUE INDEX "bills_companyId_key" ON "bills"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "bills_studentId_key" ON "bills"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_billId_key" ON "payments"("billId");

-- CreateIndex
CREATE UNIQUE INDEX "unipersonal_info_userId_key" ON "unipersonal_info"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "conpany_info_adminId_key" ON "conpany_info"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "student_info_userId_key" ON "student_info"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "employee_info_companyId_key" ON "employee_info"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "employee_info_userId_key" ON "employee_info"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_unipersonalId_key" ON "addresses"("unipersonalId");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_companyId_key" ON "addresses"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_studentId_key" ON "addresses"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "tags_title_key" ON "tags"("title");

-- CreateIndex
CREATE UNIQUE INDEX "me_admins_email_key" ON "me_admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToUser_AB_unique" ON "_TagToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToUser_B_index" ON "_TagToUser"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_userServiceId_fkey" FOREIGN KEY ("userServiceId") REFERENCES "user_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_unipersonalId_fkey" FOREIGN KEY ("unipersonalId") REFERENCES "unipersonal_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "conpany_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_billId_fkey" FOREIGN KEY ("billId") REFERENCES "bills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unipersonal_info" ADD CONSTRAINT "unipersonal_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conpany_info" ADD CONSTRAINT "conpany_info_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_info" ADD CONSTRAINT "student_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_info" ADD CONSTRAINT "employee_info_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_info" ADD CONSTRAINT "employee_info_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "conpany_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_unipersonalId_fkey" FOREIGN KEY ("unipersonalId") REFERENCES "unipersonal_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "conpany_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student_info"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToUser" ADD FOREIGN KEY ("A") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToUser" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
