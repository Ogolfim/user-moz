import { prisma } from '@core/infra/prisma/client'
import { UpdateUserPasswordDB } from '@account/domain/contracts/User/UpdateUser/reset_password'

export const resetPasswordDB: UpdateUserPasswordDB = async ({ userId, hash }) => {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      hash
    }
  })
}
