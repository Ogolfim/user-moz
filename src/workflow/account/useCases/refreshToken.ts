import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../core/infra/Middleware'
import { clientError } from '../../../core/infra/HttpErrorResponse'
import { ok } from '../../../core/infra/HttpSuccessResponse'
import { findRefreshTokenById } from '../domain/entities/findRefreshTokenById'
import { UserRefreshTokenPropsValidate } from '../services/validate/RefreshTokenProps'
import { createAccessToken } from '../services/token/createAccessToken'
import { UUID } from 'io-ts-types'

export const refreshToken: Middleware = (_httpRequest, httpBody) => {
  const { id, userId } = httpBody

  const httpResponse = pipe(
    { id, userId },
    UserRefreshTokenPropsValidate,
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
        TE.map(refreshToken => {
          const token = createAccessToken(refreshToken.userId as UUID)

          return ok({
            token
          })
        })
      )
    })
  )

  return httpResponse
}
