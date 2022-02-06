import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UUID } from 'io-ts-types'
import { findOrSaveUser } from '../domain/entities/findOrSaveOauthUser'
import { Middleware } from '../../../core/infra/Middleware'
import { userLoggerByOauthPropsValidate } from '../services/validate/userLoggerByOauthProps'
import { clientError } from '../../../core/infra/HttpErrorResponse'
import { ok } from '../../../core/infra/HttpSuccessResponse'
import { createAccessToken } from '../services/token/createAccessToken'
import { createRefreshToken } from '../domain/entities/createRefreshToken'
import { createRefreshAccessToken } from '../services/token/createRefreshAccessToken'

export const userLoggerByOauth: Middleware = (_httpRequest, httpBody) => {
  const { name, email, serverName } = httpBody

  const unValidatedUser = { name, email, serverName }

  const httpResponse = pipe(
    unValidatedUser,
    userLoggerByOauthPropsValidate,
    E.mapLeft(error => clientError(new Error(error.message))),
    TE.fromEither,
    TE.chain(validUser => {
      return pipe(
        validUser,
        findOrSaveUser,
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
        TE.map(({ user, refreshToken }) => {
          const token = createAccessToken(user.id as UUID)

          const refreshAccessToken = createRefreshAccessToken(refreshToken)

          return ok({
            token,
            refreshToken: refreshAccessToken
          })
        })
      )
    })
  )

  return httpResponse
}
