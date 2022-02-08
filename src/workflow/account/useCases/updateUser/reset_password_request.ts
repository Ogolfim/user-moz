import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import dayjs from 'dayjs'
import { pipe } from 'fp-ts/lib/function'
import { UUID } from 'io-ts-types'
import { Middleware } from '../../../../core/infra/middleware'
import { clientError } from '../../../../core/infra/http_error_response'
import { ok } from '../../../../core/infra/http_success_response'
import { resetPasswordRequestPropsValidate } from '../../services/validate/updateUser/reset_password_request_props'
import { findUserByEmailDB } from '../../domain/entities/findUser/find_user_by_email'
import { createResetPasswordToken } from '../../services/token/create_reset_password_token'

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
      TE.map(user => {
        const token = createResetPasswordToken({
          userId: user.id as UUID,
          expiresIn: '15m'
        })
        const passwordUpdateRequestedEvent = {
          name: user.name,
          email: user.email,
          date: dayjs(new Date()).format('DD/MM/YYYY'),
          token: token
        }

        return ok(passwordUpdateRequestedEvent)
      })

    ))
  )

  return httpResponse
}
