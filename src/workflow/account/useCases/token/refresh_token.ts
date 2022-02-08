import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { UUID } from 'io-ts-types'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../../core/infra/middleware'
import { clientError, forbidden } from '../../../../core/infra/http_error_response'
import { ok } from '../../../../core/infra/http_success_response'
import { findRefreshTokenByIdDB } from '../../domain/entities/token/find_refresh_token_by_id'
import { userRefreshTokenPropsValidate } from '../../services/validate/token/refresh_token_props'
import { createAccessToken } from '../../services/token/create_access_token'
import { createRefreshTokenDB } from '../../domain/entities/token/create_refresh_token'
import { createRefreshAccessToken } from '../../services/token/create_refresh_access_token'

export const refreshToken: Middleware = (_httpRequest, httpBody) => {
  const { id, userId } = httpBody

  const httpResponse = pipe(
    { id, userId },
    userRefreshTokenPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validProps => {
      return pipe(
        validProps.id,
        findRefreshTokenByIdDB,
        TE.chain(refreshToken => {
          return TE.tryCatch(
            async () => {
              if (!refreshToken) {
                throw new Error('Não tem permissão')
              }

              return refreshToken
            },

            refreshTokenError => forbidden(refreshTokenError as Error)
          )
        }),

        TE.chain(refreshToken => pipe(
          refreshToken.userId as UUID,
          createRefreshTokenDB,
          TE.map(refreshToken => {
            const token = createAccessToken(refreshToken.user)

            const refreshAccessToken = createRefreshAccessToken(refreshToken)

            return ok({
              token,
              refreshToken: refreshAccessToken
            })
          })
        ))
      )
    })
  )

  return httpResponse
}
