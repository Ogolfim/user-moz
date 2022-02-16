import dayjs from 'dayjs'
import { prisma } from '@account/infra/prisma/client'
import { CreateRefreshTokenDB } from '@account/domain/contracts/Token/create_refresh_token'

export const createRefreshTokenDB: CreateRefreshTokenDB = async (userId) => {
  await prisma.userRefreshToken.deleteMany({
    where: { userId }
  })

  const expiresIn = dayjs().add(2, 'days').unix()

  const refreshToken = await prisma.userRefreshToken.create({
    data: {
      userId,
      expiresIn
    }
  })

  return refreshToken
}
