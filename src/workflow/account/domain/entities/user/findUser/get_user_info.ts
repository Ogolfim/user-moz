import { prisma } from '@account/infra/prisma/client'
import { GetUserInfoDB } from '@account/domain/contracts/User/UserInfo/user_info'

export const getUserInfoDB: GetUserInfoDB = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      accountType: true,
      student: {
        include: {
          address: true
        }
      },
      company: {
        include: {
          employees: true,
          address: true
        }
      },
      unipersonal: {
        include: {
          address: true
        }
      }
    }
  })

  return user
}
