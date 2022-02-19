import { prisma } from '@account/infra/prisma/client'
import { CreateStudentBillDB } from '@bills/domain/Contracts/Student/CreateStudentBill'

export const createStudentBillDB: CreateStudentBillDB = async (billInfo) => {
  const { services, totalAmount, nextBillableDay, note, studentId } = billInfo

  await prisma.bill.deleteMany({
    where: { studentId }
  })

  const newBill = await prisma.bill.create({
    data: {
      services,
      totalAmount,
      nextBillableDay,
      note,
      studentId
    }
  })

  return newBill
}
