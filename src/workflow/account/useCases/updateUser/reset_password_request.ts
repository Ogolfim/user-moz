import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import dayjs from 'dayjs'
import { pipe } from 'fp-ts/lib/function'
import { UUID } from 'io-ts-types'
import { Middleware } from '@core/infra/middleware'
import { clientError, fail } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { resetPasswordRequestPropsValidate } from '@account/services/validate/user/updateUser/reset_password_request_props'
import { findUserByEmailDB } from '@account/domain/entities/user/findUser/find_user_by_email'
import { createResetPasswordToken } from '@account/services/tokens/token/reset_password'

export const resetPasswordRequest: Middleware = (_httpRequest, httpBody) => {
  const { email } = httpBody

  const httpResponse = pipe(
    email,
    resetPasswordRequestPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validEmail => pipe(
      validEmail,
      findUserByEmailDB,
      TE.chain(user => {
        return TE.tryCatch(
          async () => {
            const token = await createResetPasswordToken(user.id as UUID)

            const passwordUpdateRequestedEvent = {
              name: user.name,
              email: user.email,
              date: dayjs(new Date()).format('DD/MM/YYYY'),
              token: token
            }

            return ok(passwordUpdateRequestedEvent)
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
