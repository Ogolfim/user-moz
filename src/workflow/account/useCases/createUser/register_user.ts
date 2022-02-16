import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UUID } from 'io-ts-types'
import { Middleware } from '@core/infra/middleware'
import { clientError, fail } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { createAccessToken } from '@account/services/tokens/token/access'
import { createUserPropsValidate } from '@account/services/validate/user/register_user_props'
import { createUserDB } from '@account/domain/entities/user/create_user'
import { createRefreshTokenDB } from '@account/domain/entities/token/create_refresh_token'
import { userServices } from '@account/services/bill/user_service'
import { createUserService } from '@account/services/user/create_user'
import { createRefreshTokenService } from '@account/services/tokens/create_refresh_token'
import { findUserByEmailDB } from '@account/domain/entities/user/findUser/find_user_by_email'
import { findUserByIdDB } from '@account/domain/entities/user/findUser/find_user_by_id'

export const userRegister: Middleware = (_httpRequest, httpBody) => {
  const { name, email, password } = httpBody

  const unValidatedUser = { name, email, password }

  const httpResponse = pipe(
    unValidatedUser,
    createUserPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validUser => pipe(
      validUser,
      createUserService(createUserDB)(findUserByEmailDB),
      TE.chain(user => {
        return pipe(
          user.id as UUID,
          createRefreshTokenService(createRefreshTokenDB)(findUserByIdDB),
          TE.chain(refreshToken => {
            return TE.tryCatch(
              async () => {
                const services = userServices({
                  ...user.bill,
                  services: user.bill.services as string[]
                })

                const token = await createAccessToken({ ...user, services })

                return ok({
                  name: user.name,
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

  return httpResponse
}
