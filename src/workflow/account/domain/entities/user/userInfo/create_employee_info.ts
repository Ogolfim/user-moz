import { prisma } from '@core/infra/prisma/client'
import { CreateEmployeeInfoDB } from '@account/domain/contracts/User/UserInfo/CreateEmployeeInfo'

export const createEmployeeInfoDB: CreateEmployeeInfoDB = async ({ email, businessAdminId }) => {
  const employee = await prisma.user.findUnique({
    where: { email },
    select: { id: true }
  })

  if (!employee) return null

  const employeeInfo = await prisma.employee.findUnique({
    where: { userId: employee.id }
  })

  if (employeeInfo) return employeeInfo

  const business = await prisma.business.findUnique({
    where: { adminId: businessAdminId }
  })

  if (!business) return null

  return await prisma.employee.create({
    data: {
      businessId: business.id,
      userId: employee.id
    }
  })
}
