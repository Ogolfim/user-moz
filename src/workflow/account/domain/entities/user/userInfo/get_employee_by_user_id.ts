import { GetEmployeeInfoByUserIdDB } from '@account/domain/contracts/User/UserInfo/CreateEmployeeInfo'
import { prisma } from '@account/infra/prisma/client'

export const getEmployeeInfoByUserIdDB: GetEmployeeInfoByUserIdDB = async (companyId) => {
  const employee = await prisma.employee.findUnique({
    where: { companyId }
  })

  return employee
}
