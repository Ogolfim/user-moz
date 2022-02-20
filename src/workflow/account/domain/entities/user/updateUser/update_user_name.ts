import { prisma } from '@core/infra/prisma/client'
import { UpdateUserNameDB } from '@account/domain/contracts/User/UpdateUser/update_user_name'

export const updateUserNameDB: UpdateUserNameDB = async ({ name, userId }) => {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      name
    }
  })
}
