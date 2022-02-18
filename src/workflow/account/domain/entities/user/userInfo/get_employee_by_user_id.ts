import { GetEmployeeInfoByUserIdDB } from '@account/domain/contracts/User/UserInfo/CreateEmployeeInfo'
import { prisma } from '@account/infra/prisma/client'

export const getEmployeeInfoByUserIdDB: GetEmployeeInfoByUserIdDB = async (userId) => {
  const employee = await prisma.employee.findUnique({
    where: { userId }
  })

  return employee
}
