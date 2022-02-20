import { prisma } from '@core/infra/prisma/client'
import { CreateOrFindUserDB } from '@account/domain/contracts/User/Login/CreateOrFindUser'

export const createOrFindUserDB: CreateOrFindUserDB = async ({ name, email, serverName, accountType }) => {
  const userFound = await prisma.user.findUnique({
    where: { email },
    include: {
      userServices: true
    }
  })

  if (userFound) return userFound

  return await prisma.user.create({
    data: {
      name,
      serverName,
      email,
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
