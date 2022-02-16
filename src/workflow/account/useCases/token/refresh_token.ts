import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError, fail } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { userRefreshTokenPropsValidate } from '@account/services/validate/token/refresh_token_props'
import { createAccessToken } from '@account/services/tokens/token/access'
import { createRefreshTokenDB } from '@account/domain/entities/token/create_refresh_token'

import { createRefreshTokenService } from '@account/services/tokens/create_refresh_token'
import { findUserByIdDB } from '@account/domain/entities/user/findUser/find_user_by_id'
import { userServices } from '@account/services/bill/user_service'

export const refreshTokenUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId } = httpBody

  const httpResponse = pipe(
    userId,
    userRefreshTokenPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(userId => pipe(
      userId,
      createRefreshTokenService(createRefreshTokenDB)(findUserByIdDB),
      TE.chain(data => {
        const { user, refreshToken } = data

        return TE.tryCatch(
          async () => {
            const services = userServices(user.bill)

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
    ))
  )

  return httpResponse
}
