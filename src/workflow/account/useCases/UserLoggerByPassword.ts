import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../core/infra/Middleware'
import { clientError } from '../../../core/infra/HttpErrorResponse'
import { ok } from '../../../core/infra/HttpSuccessResponse'
import { createAccessToken } from '../services/token/createAccessToken'
import { UserLoggerByPasswordPropsValidate } from '../services/validate/UserLoggerByPasswordProps'
import { findUserByEmail } from '../domain/entities/findUserByEmail'
import { verifyPassword } from '../services/password/verify'
import { UUID } from 'io-ts-types'
import { createRefreshToken } from '../domain/entities/createRefreshToken'
import { createRefreshAccessToken } from '../services/token/createRefreshAccessToken'

export const userLoggerByPassword: Middleware = (_httpRequest, httpBody) => {
  const { email, password } = httpBody

  const unValidatedUser = { email, password }

  const httpResponse = pipe(
    unValidatedUser,
    UserLoggerByPasswordPropsValidate,
    E.mapLeft(error => clientError(new Error(error.message))),
    TE.fromEither,
    TE.chain(({ email, password }) => {
      return pipe(
        email,
        findUserByEmail,
        TE.chain(user => {
          return TE.tryCatch(
            async () => {
              if (!user) {
                throw new Error(`Oops! Nenhuma conta com o email ${email} encontrada`)
              }

              return user
            },

            notFoundUserError => clientError(notFoundUserError as Error)
          )
        }),
        TE.chain(user => {
          return pipe(
            user.id as UUID,
            createRefreshToken,
            TE.map(refreshToken => {
              return {
                user,
                refreshToken
              }
            })
          )
        }),
        TE.chain(({ user, refreshToken }) => {
          return TE.tryCatch(
            async () => {
              if (!user.hash) throw new Error('Oops! Senha incorreta')

              const result = await verifyPassword(password, user.hash)

              if (!result) throw new Error('Oops! Senha incorreta')

              const token = createAccessToken(user.id as UUID)

              const refreshAccessToken = createRefreshAccessToken(refreshToken)

              return ok({
                token,
                refreshToken: refreshAccessToken
              })
            },
            (err) => clientError(err as Error)
          )
        })
      )
    })
  )

  return httpResponse
}
