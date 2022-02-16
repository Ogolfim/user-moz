import { prisma } from '@account/infra/prisma/client'
import { UpdateUserEmailDB } from '@account/domain/contracts/User/UpdateUser/update_user_email'

export const updateUserEmailDB: UpdateUserEmailDB = async ({ email, userId }) => {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      email
    }
  })
}
