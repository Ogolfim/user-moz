import { GetUnipersonalInfoByUserIdDB } from '@account/domain/contracts/User/UserInfo/CreateUnipersonalInfo'
import { prisma } from '@account/infra/prisma/client'

export const getUnipersonalInfoByUserIdDB: GetUnipersonalInfoByUserIdDB = async (userId) => {
  const unipersonal = await prisma.unipersonal.findUnique({
    where: { userId }
  })

  return unipersonal
}
