import { prisma } from '@core/infra/prisma/client'
import { CountEmployeesDB } from '@bills/domain/Contracts/Business/CreateBusinessBill'

export const countEmployeesDB: CountEmployeesDB = async (adminId) => {
  const business = await prisma.business.findUnique({
    where: { adminId }
  })

  if (!business) return null

  return await prisma.employee.count({
    where: { businessId: business.id }
  })
}
