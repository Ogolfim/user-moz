import { prisma } from '@core/infra/prisma/client'
import { CreateBusinessInfoDB } from '@account/domain/contracts/User/UserInfo/CreateBusinessInfo'

export const createBusinessInfoDB: CreateBusinessInfoDB = async ({ adminId, address, name, phone }) => {
  return await prisma.business.create({
    data: {
      adminId,
      phone,
      name,
      address: {
        create: address
      }
    }
  })
}
