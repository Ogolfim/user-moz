import { prisma } from '@account/infra/prisma/client'
import { CreateCompanyInfoDB } from '@account/domain/contracts/User/UserInfo/CreateCompanyInfo'

export const createCompanyInfoDB: CreateCompanyInfoDB = async ({ adminId, address, name, phone }) => {
  return await prisma.company.create({
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
