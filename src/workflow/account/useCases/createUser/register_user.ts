import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UUID } from 'io-ts-types'
import { Middleware } from '@core/infra/middleware'
import { clientError, fail } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { createAccessToken } from '@account/services/token/access'
import { createUserPropsValidate } from '@account/services/validate/user/register_user_props'
import { createUserDB } from '@account/domain/entities/user/create_user'
import { createUserService } from '@account/services/user/create_user'
import { findUserByEmailDB } from '@account/domain/entities/user/findUser/find_user_by_email'
import { createRefreshAccessToken } from '@account/services/token/refresh'
import { userServiceView } from '@account/services/views/user_services'

export const userRegister: Middleware = (_httpRequest, httpBody) => {
  const { name, email, password, accountType } = httpBody

  const unValidatedUser = { name, email, password, accountType }

  const httpResponse = pipe(
    unValidatedUser,
    createUserPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validUser => pipe(
      validUser,
      createUserService(createUserDB)(findUserByEmailDB),
      TE.chain(user => TE.tryCatch(
        async () => {
          const services = userServiceView(user.userServices)

          const refreshToken = await createRefreshAccessToken(user.id as UUID)
          const token = await createAccessToken({ ...user, services })

          return ok({
            name: user.name,
            token,
            refreshToken
          })
        },
        (_err) => fail(new Error('Oops! Token não foi criado'))
      )
      ))
    )
  )
  return httpResponse
}
