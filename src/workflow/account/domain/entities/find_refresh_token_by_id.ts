import dayjs from 'dayjs'
import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '../../../../core/infra/http_error_response'
import { prisma } from '../../infra/prisma/client'
import { RefreshTokenById } from '../contracts/refresh_token_by_id'

export const findRefreshTokenById: RefreshTokenById = (id) => {
  const refreshToken = TE.tryCatch(

    async () => {
      const refreshToken = await prisma.userRefreshToken.findUnique({
        where: { id }
      })

      if (refreshToken && isExpiredDay(refreshToken.expiresIn)) {
        const { userId } = refreshToken

        await prisma.userRefreshToken.deleteMany({
          where: { userId }
        })

        const expiresIn = dayjs().add(2, 'days').unix()

        const newRefreshToken = await prisma.userRefreshToken.create({
          data: {
            userId,
            expiresIn
          }
        })

        return newRefreshToken
      }

      return refreshToken
    },

    (err) => {
      console.log(err)
      return fail(new Error('Oops! Erro. Por favor contacte suporte'))
    }
  )

  return refreshToken
}

const isExpiredDay = (expiresIn: number) => {
  return dayjs().isAfter(dayjs.unix(expiresIn))
}
