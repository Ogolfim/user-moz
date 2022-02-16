import { prisma } from '@account/infra/prisma/client'
import { CreateOrFindUserDB } from '@account/domain/contracts/User/Login/CreateOrFindUser'

export const createOrFindUserDB: CreateOrFindUserDB = async ({ name, email, serverName, accountType }) => {
  const userFound = await prisma.user.findUnique({
    where: { email },
    include: {
      bill: {
        include: {
          payment: true
        }
      }
    }
  })

  if (userFound) return userFound

  return await prisma.user.create({
    data: {
      name,
      serverName,
      email,
      accountType
    },
    include: {
      bill: {
        include: {
          payment: true
        }
      }
    }
  })
}
