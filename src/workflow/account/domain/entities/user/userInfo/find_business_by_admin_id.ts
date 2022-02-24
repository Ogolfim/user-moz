import { FindBusinessByAdminIdDB } from '@account/domain/contracts/User/UserInfo/GetEmployees'
import { prisma } from '@core/infra/prisma/client'

export const findBusinessByAdminIdDB: FindBusinessByAdminIdDB = async (adminId) => {
  return await prisma.business.findUnique({
    where: { adminId }
  })
}
