import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { UUID } from 'io-ts-types'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError, fail, forbidden } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { findRefreshTokenByIdDB } from '@account/domain/entities/token/find_refresh_token_by_id'
import { userRefreshTokenPropsValidate } from '@account/services/validate/token/refresh_token_props'
import { createAccessToken } from '@account/services/tokens/token/access'
import { createRefreshTokenDB } from '@account/domain/entities/token/create_refresh_token'

import { createRefreshTokenService } from '@account/services/tokens/create_refresh_token'
import { findUserByIdDB } from '@account/domain/entities/user/findUser/find_user_by_id'
import { userServices } from '@account/services/bill/user_service'

export const refreshTokenUseCase: Middleware = (_httpRequest, httpBody) => {
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

        TE.chain(({ userId }) => pipe(
          userId as UUID,
          createRefreshTokenService(createRefreshTokenDB),
          TE.chain(refreshToken => {
            return pipe(
              TE.tryCatch(
                async () => {
                  const user = await findUserByIdDB(userId as UUID)

                  return { user, refreshToken }
                },
                err => {
                  console.log(err)
                  return fail(new Error('Oops! Erro. Por favor contacte suporte'))
                }
              ),
              TE.chain(({ user, refreshToken }) => {
                return TE.tryCatch(
                  async () => {
                    const services = userServices({
                      ...user.bill,
                      services: user.bill.services as string[]
                    })

                    const token = await createAccessToken({ ...user, services })

                    return ok({
                      token,
                      refreshToken
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
        ))
      )
    })
  )

  return httpResponse
}
