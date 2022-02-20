import { prisma } from '@core/infra/prisma/client'
import { CreateUserDB } from '@account/domain/contracts/User/CreateUser/create_user'

export const createUserDB: CreateUserDB = async ({ name, email, hash, accountType }) => {
  return await prisma.user.create({
    data: {
      name,
      email,
      hash,
      accountType,
      userServices: {
        create: {}
      }
    },
    include: {
      userServices: true
    }
  })
}
