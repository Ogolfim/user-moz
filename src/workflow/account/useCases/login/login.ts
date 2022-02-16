import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { UUID } from 'io-ts-types'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError, fail } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { createAccessToken } from '@account/services/token/access'
import { loginUserPropsValidate } from '@account/services/validate/user/login/login_by_password_props'
import { findUserByEmailDB } from '@account/domain/entities/user/findUser/find_user_by_email'
import { loginUserService } from '@account/services/user/login/login'
import { createRefreshAccessToken } from '@account/services/token/refresh'
import { userServices } from '@account/services/bill/user_service'

export const loginUseCase: Middleware = (_httpRequest, httpBody) => {
  const { email, password } = httpBody

  const unValidatedUser = { email, password }

  const httpResponse = pipe(
    unValidatedUser,
    loginUserPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validUser => {
      return pipe(
        validUser,
        loginUserService(findUserByEmailDB),
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
