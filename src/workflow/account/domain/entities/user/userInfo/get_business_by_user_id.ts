import { GetBusinessInfoByUserIdDB } from '@account/domain/contracts/User/UserInfo/CreateBusinessInfo'
import { prisma } from '@core/infra/prisma/client'

export const getBusinessInfoByUserIdDB: GetBusinessInfoByUserIdDB = async (adminId) => {
  const business = await prisma.business.findUnique({
    where: { adminId }
  })

  return business
}
