import { prisma } from '@account/infra/prisma/client'
import { CreateEmployeeInfoDB } from '@account/domain/contracts/User/UserInfo/CreateEmployeeInfo'

export const createEmployeeInfoDB: CreateEmployeeInfoDB = async ({ email, companyId }) => {
  const { id } = await prisma.user.findUnique({
    where: { email },
    select: { id: true }
  })

  return await prisma.employee.create({
    data: {
      companyId,
      userId: id
    }
  })
}
