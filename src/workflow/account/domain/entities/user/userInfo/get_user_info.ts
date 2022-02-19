import { prisma } from '@account/infra/prisma/client'
import { GetUserInfoDB } from '@account/domain/contracts/User/UserInfo/UserInfo'

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
      employee: true,
      business: {
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
