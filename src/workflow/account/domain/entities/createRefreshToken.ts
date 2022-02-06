import * as TE from 'fp-ts/lib/TaskEither'
import dayjs from 'dayjs'
import { fail } from '../../../../core/infra/HttpErrorResponse'
import { prisma } from '../../infra/prisma/client'
import { RefreshTokenSaver } from '../contracts/RefreshTokenSaver'
import { pipe } from 'fp-ts/lib/function'

export const createRefreshToken: RefreshTokenSaver = (userId) => {
  const refreshToken = pipe(
    TE.tryCatch(
      async () => {
        await prisma.userRefreshToken.deleteMany({
          where: { userId }
        })

        return userId
      },

      (err) => {
        console.log(err)
        return fail(new Error('Oops! Erro. Por favor contacte suporte'))
      }
    ),
    TE.chain(userId => {
      const expiresIn = dayjs().add(2, 'days').unix()

      return TE.tryCatch(
        async () => {
          const refreshToken = await prisma.userRefreshToken.create({
            data: {
              userId,
              expiresIn
            }
          })

          return refreshToken
        },

        (err) => {
          console.log(err)
          return fail(new Error('Oops! Erro. Por favor contacte suporte'))
        }
      )
    })
  )

  return refreshToken
}
