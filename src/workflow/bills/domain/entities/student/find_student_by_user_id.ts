import { FindStudentByUserIdDB } from '@bills/domain/Contracts/Student/CreateStudentBill'
import { prisma } from '@core/infra/prisma/client'

export const findStudentByUserIdDB: FindStudentByUserIdDB = async (userId) => {
  return await prisma.student.findUnique({
    where: { userId }
  })
}
