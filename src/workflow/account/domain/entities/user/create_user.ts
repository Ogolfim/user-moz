import { prisma } from '@account/infra/prisma/client'
import { CreateUserDB } from '@account/domain/contracts/User/CreateUser/create_user'

export const createUserDB: CreateUserDB = ({ name, email, hash, accountType }) => {
  return prisma.user.create({
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
