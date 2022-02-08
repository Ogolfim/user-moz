import * as TE from 'fp-ts/lib/TaskEither'
import dayjs from 'dayjs'
import { fail } from '../../../../../core/infra/http_error_response'
import { prisma } from '../../../infra/prisma/client'
import { CreateRefreshTokenDB } from '../../contracts/token/create_refresh_token'
import { pipe } from 'fp-ts/lib/function'

export const createRefreshTokenDB: CreateRefreshTokenDB = (userId) => {
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
            },
            include: {
              user: {
                include: {
                  services: true
                }
              }
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
