import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { updateUserEmailPropsValidate } from '@account/services/validate/user/updateUser/update_user_email_props'
import { updateUserEmailDB } from '@account/domain/entities/user/updateUser/update_user_email'
import { updateUserEmailService } from '@account/services/user/update/update_user_email'
import { findUserByIdDB } from '@account/domain/entities/user/findUser/find_user_by_id'

export const updateUserEmail: Middleware = (_httpRequest, httpBody) => {
  const { email, userId } = httpBody

  const unValidatedUser = { email, userId }

  const httpResponse = pipe(
    unValidatedUser,
    updateUserEmailPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validUser => pipe(
      validUser,
      updateUserEmailService(updateUserEmailDB)(findUserByIdDB),
      TE.map(user => {
        const UserEmailUpdatedEvent = {
          email: user.email
        }

        return ok(UserEmailUpdatedEvent)
      })

    ))
  )

  return httpResponse
}
