import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UUID } from 'io-ts-types'
import { findOrCreateUserDB } from '../domain/entities/find_or_create_oauth_user'
import { Middleware } from '../../../core/infra/middleware'
import { userLoggerByOauthPropsValidate } from '../services/validate/login_by_oauth_props'
import { clientError } from '../../../core/infra/http_error_response'
import { ok } from '../../../core/infra/http_success_response'
import { createAccessToken } from '../services/token/create_access_token'
import { createRefreshTokenDB } from '../domain/entities/create_refresh_token'
import { createRefreshAccessToken } from '../services/token/create_refresh_access_token'

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
        findOrCreateUserDB,
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
        TE.map(({ user, refreshToken }) => {
          const token = createAccessToken(user)

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
