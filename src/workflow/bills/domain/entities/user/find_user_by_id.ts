import { prisma } from '@core/infra/prisma/client'
import { FindUserByIdDB } from '@bills/domain/contracts/User/FindUserById'

export const findUserByIdDB: FindUserByIdDB = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id }
  })

  return user
}
