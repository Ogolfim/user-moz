import { prisma } from '@account/infra/prisma/client'
import { FindUserByEmailDB } from '@account/domain/contracts/User/FindUserByEmail'

export const findUserByEmailDB: FindUserByEmailDB = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      bill: {
        include: {
          payment: true
        }
      }
    }
  })

  return user
}
