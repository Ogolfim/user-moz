import { prisma } from '@core/infra/prisma/client'
import { CreateStudentInfoDB } from '@account/domain/contracts/User/UserInfo/CreateStudentInfo'

export const createStudentInfoDB: CreateStudentInfoDB = async ({ userId, address, phone, bornAt, schoolName, studentId }) => {
  return await prisma.student.create({
    data: {
      userId,
      phone,
      bornAt,
      schoolName,
      studentId,
      address: {
        create: address
      }
    }
  })
}
