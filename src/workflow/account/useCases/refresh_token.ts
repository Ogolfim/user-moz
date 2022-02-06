import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { UUID } from 'io-ts-types'
import { pipe } from 'fp-ts/lib/function'
import dayjs from 'dayjs'
import { Middleware } from '../../../core/infra/middleware'
import { clientError } from '../../../core/infra/http_error_response'
import { ok } from '../../../core/infra/http_success_response'
import { findRefreshTokenById } from '../domain/entities/find_refresh_token_by_id'
import { userRefreshTokenPropsValidate } from '../services/validate/refresh_token_props'
import { createAccessToken } from '../services/token/create_access_token'
import { createRefreshToken } from '../domain/entities/create_refresh_token'

export const refreshToken: Middleware = (_httpRequest, httpBody) => {
  const { id, userId } = httpBody

  const httpResponse = pipe(
    { id, userId },
    userRefreshTokenPropsValidate,
    E.mapLeft(error => clientError(new Error(error.message))),
    TE.fromEither,
    TE.chain(refreshTokenProps => {
      return pipe(
        refreshTokenProps.id,
        findRefreshTokenById,
        TE.chain(refreshToken => {
          return TE.tryCatch(
            async () => {
              if (!refreshToken) {
                throw new Error('Oops! Você não está autorizado')
              }

              return refreshToken
            },

            refreshTokenError => clientError(refreshTokenError as Error)
          )
        }),

        TE.chain(refreshToken => {
          const isExpiredDay = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

          if (!isExpiredDay) {
            return pipe(
              refreshToken.userId as UUID,
              createRefreshToken,
              TE.chain(newRefreshToken => pipe(
                newRefreshToken.userId as UUID,
                createRefreshToken,
                TE.map(newRefreshToken => {
                  const token = createAccessToken(newRefreshToken.userId as UUID)

                  return ok({
                    token,
                    refreshToken: newRefreshToken
                  })
                }
                ))
              ))
          }

          return pipe(
            userId as UUID,
            createRefreshToken,
            TE.map(refreshToken => {
              const token = createAccessToken(refreshToken.userId as UUID)

              return ok({
                token,
                refreshToken
              })
            })
          )
        })
      )
    })
  )

  return httpResponse
}
