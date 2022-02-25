import { FindBusinessByAdminIdDB } from '@bills/domain/Contracts/Business/CreateBusinessBill'
import { prisma } from '@core/infra/prisma/client'

export const findBusinessByAdminIdDB: FindBusinessByAdminIdDB = async (adminId) => {
  return await prisma.business.findUnique({
    where: { adminId }
  })
}
