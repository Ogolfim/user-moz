import { prisma } from '@account/infra/prisma/client'
import { CreateEmployeeInfoDB } from '@account/domain/contracts/User/UserInfo/CreateEmployeeInfo'

export const createEmployeeInfoDB: CreateEmployeeInfoDB = async ({ userId, companyId }) => {
  return await prisma.employee.create({
    data: {
      userId,
      companyId
    }
  })
}
