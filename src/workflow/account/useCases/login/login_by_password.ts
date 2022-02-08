import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { createAccessToken } from '@account/services/token/create_access_token'
import { userLoggerByPasswordPropsValidate } from '@account/services/validate/login/login_by_password_props'
import { findUserByEmailDB } from '@account/domain/entities/findUser/find_user_by_email'
import { verifyPassword } from '@account/services/password/verify'
import { UUID } from 'io-ts-types'
import { createRefreshTokenDB } from '@account/domain/entities/token/create_refresh_token'
import { createRefreshAccessToken } from '@account/services/token/create_refresh_access_token'

export const userLoggerByPassword: Middleware = (_httpRequest, httpBody) => {
  const { email, password } = httpBody

  const unValidatedUser = { email, password }

  const httpResponse = pipe(
    unValidatedUser,
    userLoggerByPasswordPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(({ email, password }) => {
      return pipe(
        email,
        findUserByEmailDB,
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
            createRefreshTokenDB,
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

              const token = createAccessToken(user)

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
