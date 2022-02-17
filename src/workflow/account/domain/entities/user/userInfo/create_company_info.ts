import { prisma } from '@account/infra/prisma/client'
import { CreateCompanyInfoDB } from '@account/domain/contracts/User/UserInfo/CreateCompanyInfo'

export const createCompanyInfoDB: CreateCompanyInfoDB = async ({ userId, address, name, phone }) => {
  return await prisma.company.create({
    data: {
      userId,
      phone,
      name,
      address: {
        create: address
      }
    }
  })
}
