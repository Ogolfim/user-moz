import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { UUID } from 'io-ts-types'
import { Middleware } from '@core/infra/middleware'
import { clientError, fail } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { createAccessToken } from '@account/services/tokens/token/access'
import { createRefreshTokenDB } from '@account/domain/entities/token/create_refresh_token'
import { createOrFindUserPropsValidate } from '@account/services/validate/user/login/login_by_oauth_props'
import { createOrFindUserDB } from '@account/domain/entities/user/create_or_find_user'
import { createOrFindUserService } from '@account/services/user/login/create_or_find_user'
import { createRefreshTokenService } from '@account/services/tokens/create_refresh_token'
import { userServices } from '@account/services/bill/user_service'

export const createOrFindUserUseCase: Middleware = (httpRequest, httpBody) => {
  const { name, email } = httpBody
  const { serverName } = httpRequest.params

  const unValidatedUser = { name, email, serverName }

  const httpResponse = pipe(
    unValidatedUser,
    createOrFindUserPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validUser => {
      return pipe(
        validUser,
        createOrFindUserService(createOrFindUserDB),
        TE.chain(user => {
          return pipe(
            user.id as UUID,
            createRefreshTokenService(createRefreshTokenDB),
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
      )
    })
  )

  return httpResponse
}
