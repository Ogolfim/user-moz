import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import dayjs from 'dayjs'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { resetPasswordPropsValidate } from '@account/services/validate/user/updateUser/reset_password_props'
import { resetPasswordDB } from '@account/domain/entities/user/updateUser/reset_password'
import { updateUserPasswordService } from '@account/services/user/update/update_password'

export const resetPassword: Middleware = (_httpRequest, httpBody) => {
  const { userId, password } = httpBody

  const unValidatedUser = { userId, password }

  const httpResponse = pipe(
    unValidatedUser,
    resetPasswordPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validUser => {
      return pipe(
        validUser,
        updateUserPasswordService(resetPasswordDB),
        TE.map(user => {
          const passwordUpdatedEvent = {
            name: user.name,
            email: user.email,
            date: dayjs(new Date()).format('DD/MM/YYYY')
          }

          return ok(passwordUpdatedEvent)
        }
        )
      )
    })
  )

  return httpResponse
}
