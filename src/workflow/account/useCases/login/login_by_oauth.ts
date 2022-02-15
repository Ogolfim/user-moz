import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UUID } from 'io-ts-types'
import { findOrCreateUserDB } from '@account/domain/entities/user/findUser/find_or_create_oauth_user'
import { Middleware } from '@core/infra/middleware'
import { userLoggerByOauthPropsValidate } from '@account/services/validate/user/login/login_by_oauth_props'
import { clientError, fail } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { createAccessToken } from '@account/services/tokens/token/access'
import { createRefreshTokenDB } from '@account/domain/entities/token/create_refresh_token'
import { createRefreshAccessToken } from '@account/services/tokens/token/refresh'

export const userLoggerByOauth: Middleware = (httpRequest, httpBody) => {
  const { name, email } = httpBody
  const { serverName } = httpRequest.params

  const unValidatedUser = { name, email, serverName }

  const httpResponse = pipe(
    unValidatedUser,
    userLoggerByOauthPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validUser => {
      return pipe(
        validUser,
        findOrCreateUserDB,
        TE.chain(user => {
          return pipe(
            user.id as UUID,
            createRefreshTokenDB,
            TE.chain(refreshToken => {
              return TE.tryCatch(
                async () => {
                  const token = await createAccessToken(user)

                  const refreshAccessToken = await createRefreshAccessToken(refreshToken)

                  return ok({
                    name: user.name,
                    token,
                    refreshToken: refreshAccessToken
                  })
                },

                (err) => {
                  console.log(err)
                  return fail(new Error('Oops! Token não foi criado'))
                }
              )
            })
          )
        })
      )
    })
  )

  return httpResponse
}
