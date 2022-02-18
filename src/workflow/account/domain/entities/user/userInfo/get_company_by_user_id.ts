import { GetCompanyInfoByUserIdDB } from '@account/domain/contracts/User/UserInfo/CreateCompanyInfo'
import { prisma } from '@account/infra/prisma/client'

export const getCompanyInfoByUserIdDB: GetCompanyInfoByUserIdDB = async (adminId) => {
  const company = await prisma.company.findUnique({
    where: { adminId }
  })

  return company
}
