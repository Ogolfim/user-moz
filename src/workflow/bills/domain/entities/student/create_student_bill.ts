import { prisma } from '@core/infra/prisma/client'
import { CreateStudentBillDB } from '@bills/domain/Contracts/Student/CreateStudentBill'

export const createStudentBillDB: CreateStudentBillDB = async (billInfo) => {
  const { services, totalAmountToPay, nextBillableDay, note, studentId } = billInfo

  await prisma.bill.deleteMany({
    where: { studentId }
  })

  const newBill = await prisma.bill.create({
    data: {
      services,
      totalAmountToPay,
      nextBillableDay,
      note,
      studentId
    }
  })

  return newBill
}
