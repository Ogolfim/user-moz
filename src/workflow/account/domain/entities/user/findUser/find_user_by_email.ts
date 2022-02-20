import { prisma } from '@core/infra/prisma/client'
import { FindUserByEmailDB } from '@account/domain/contracts/User/FindUserByEmail'

export const findUserByEmailDB: FindUserByEmailDB = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      userServices: true
    }
  })

  return user
}
