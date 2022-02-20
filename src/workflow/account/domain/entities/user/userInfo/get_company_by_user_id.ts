import { GetCompanyInfoByUserIdDB } from '@account/domain/contracts/User/UserInfo/CreateCompanyInfo'
import { prisma } from '@core/infra/prisma/client'

export const getCompanyInfoByUserIdDB: GetCompanyInfoByUserIdDB = async (adminId) => {
  const company = await prisma.business.findUnique({
    where: { adminId }
  })

  return company
}
