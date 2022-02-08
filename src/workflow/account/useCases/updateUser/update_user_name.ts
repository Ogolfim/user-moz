import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../../core/infra/middleware'
import { clientError } from '../../../../core/infra/http_error_response'
import { ok } from '../../../../core/infra/http_success_response'
import { updateUserNamePropsValidate } from '../../services/validate/update_user_name_props'
import { updateUserNameDB } from '../../domain/entities/updateUser/update_user_name'

export const updateUserName: Middleware = (_httpRequest, httpBody) => {
  const { name, userId } = httpBody

  const unValidatedUser = { name, userId }

  const httpResponse = pipe(
    unValidatedUser,
    updateUserNamePropsValidate,
    E.mapLeft(error => clientError(new Error(error.message))),
    TE.fromEither,
    TE.chain(validUser => pipe(
      validUser,
      updateUserNameDB,
      TE.map(user => {
        const UserNameUpdatedEvent = {
          name: user.name
        }

        return ok(UserNameUpdatedEvent)
      })

    ))
  )

  return httpResponse
}
