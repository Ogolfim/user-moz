import { prisma } from '@core/infra/prisma/client'
import { CreateCompanyInfoDB } from '@account/domain/contracts/User/UserInfo/CreateCompanyInfo'

export const createCompanyInfoDB: CreateCompanyInfoDB = async ({ adminId, address, name, phone }) => {
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
