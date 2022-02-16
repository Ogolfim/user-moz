import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { UUID } from 'io-ts-types'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError, fail } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { createRefreshTokenPropsValidator } from '@account/services/validate/token/refresh_token_props'
import { createAccessToken } from '@account/services/token/access'

import { userServices } from '@account/services/bill/user_service'
import { createRefreshAccessToken } from '@account/services/token/refresh'
import { findUserByIdDB } from '@account/domain/entities/user/findUser/find_user_by_id'
import { DatabaseFailError, EntityNotFoundError } from '@account/domain/entities/errors/db_error'

export const refreshTokenUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId } = httpBody

  const httpResponse = pipe(
    userId,
    createRefreshTokenPropsValidator,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(userId => TE.tryCatch(
      async () => await findUserByIdDB(userId),
      () => fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
    )),
    TE.chain(user => TE.tryCatch(
      async () => {
        if (!user) {
          throw new EntityNotFoundError('Oops! A sua conta não foi encontrada')
        }

        return user
      },

      (err) => clientError(err as Error)
    )),
    TE.chain(user => TE.tryCatch(
      async () => {
        const services = userServices(user.bill)

        const refreshToken = await createRefreshAccessToken(user.id as UUID)
        const token = await createAccessToken({ ...user, services })

        return ok({
          token,
          refreshToken
        })
      },
      (_err) => fail(new Error('Oops! Token não foi criado'))
    ))
  )

  return httpResponse
}
