import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UUID } from 'io-ts-types'
import { Middleware } from '@core/infra/middleware'
import { clientError, fail } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { createAccessToken } from '@account/services/token/access'
import { createOrFindUserPropsValidate } from '@account/services/validate/user/login/login_by_oauth_props'
import { createOrFindUserDB } from '@account/domain/entities/user/create_or_find_user'
import { createOrFindUserService } from '@account/services/user/login/create_or_find_user'
import { userServices } from '@account/services/bill/user_service'
import { createRefreshAccessToken } from '@account/services/token/refresh'

export const createOrFindUserUseCase: Middleware = (httpRequest, httpBody) => {
  const { name, email, accountType } = httpBody
  const { serverName } = httpRequest.params

  const unValidatedUser = { name, email, serverName, accountType }

  const httpResponse = pipe(
    unValidatedUser,
    createOrFindUserPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validUser => {
      return pipe(
        validUser,
        createOrFindUserService(createOrFindUserDB),
        TE.chain(user => TE.tryCatch(
          async () => {
            const services = userServices(user.bill)

            const refreshToken = await createRefreshAccessToken(user.id as UUID)
            const token = await createAccessToken({ ...user, services })

            return ok({
              name: user.name,
              token,
              refreshToken
            })
          },

          (_err) => fail(new Error('Oops! Token não foi criado'))
        ))
      )
    })
  )

  return httpResponse
}
