import { prisma } from '@account/infra/prisma/client'
import { CreateEmployeeInfoDB } from '@account/domain/contracts/User/UserInfo/CreateEmployeeInfo'

export const createEmployeeInfoDB: CreateEmployeeInfoDB = async ({ email, companyAdminId }) => {
  const employee = await prisma.user.findUnique({
    where: { email },
    select: { id: true }
  })

  if (!employee) return null

  const employeeInfo = await prisma.employee.findUnique({
    where: { userId: employee.id }
  })

  if (employeeInfo) return employeeInfo

  const company = await prisma.business.findUnique({
    where: { adminId: companyAdminId }
  })

  if (!company) return null

  return await prisma.employee.create({
    data: {
      businessId: company.id,
      userId: employee.id
    }
  })
}
