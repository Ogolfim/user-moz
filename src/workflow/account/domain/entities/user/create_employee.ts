import { prisma } from '@core/infra/prisma/client'
import { CreateEmployeeDB } from '@account/domain/contracts/User/CreateUser/createEmployee'
import { accountTypes } from '@account/domain/entities/db'

export const createEmployeeDB: CreateEmployeeDB = async ({ name, email, hash, businessAdminId }) => {
  const business = await prisma.business.findUnique({
    where: { adminId: businessAdminId }
  })

  if (!business) return null

  return await prisma.user.create({
    data: {
      name,
      email,
      hash,
      accountType: accountTypes.employee,
      employee: {
        create: {
          businessId: business.id
        }
      },
      userServices: {
        create: {}
      }
    },
    include: {
      userServices: true
    }
  })
}
