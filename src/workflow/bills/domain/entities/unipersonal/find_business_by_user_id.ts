import { FindUnipersonalByUserIdDB } from '@bills/domain/Contracts/Unipersonal/CreateUnipersonalBill'
import { prisma } from '@core/infra/prisma/client'

export const findUnipersonalByUserIdDB: FindUnipersonalByUserIdDB = async (userId) => {
  return await prisma.unipersonal.findUnique({
    where: { userId }
  })
}
