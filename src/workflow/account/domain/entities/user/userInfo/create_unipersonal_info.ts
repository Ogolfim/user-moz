import { prisma } from '@account/infra/prisma/client'
import { CreateUnipersonalInfoDB } from '@account/domain/contracts/User/UserInfo/CreateUnipersonalInfo'

export const createUnipersonalInfoDB: CreateUnipersonalInfoDB = async ({ userId, address, phone }) => {
  return await prisma.unipersonal.create({
    data: {
      phone,
      userId,
      address: {
        create: address
      }
    }
  })
}
