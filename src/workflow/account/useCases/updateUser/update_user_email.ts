import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../../core/infra/middleware'
import { clientError } from '../../../../core/infra/http_error_response'
import { ok } from '../../../../core/infra/http_success_response'
import { updateUserEmailPropsValidate } from '../../services/validate/updateUser/update_user_email_props'
import { updateUserEmailDB } from '../../domain/entities/updateUser/update_user_email'

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
      updateUserEmailDB,
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
