import { prisma } from '@account/infra/prisma/client'
import { FindUserByIdDB } from '@account/domain/contracts/User/FindUserById'

export const findUserByIdDB: FindUserByIdDB = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
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
