import { prisma } from '@account/infra/prisma/client'
import { UserInfoDB } from '@account/domain/contracts/User/UserInfo/user_info'

export const findAllUserInfoDB: UserInfoDB = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
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
