import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError, fail } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { createEmployeePropsValidate } from '@account/services/validate/user/create_employee_props'
import { createEmployeeDB } from '@account/domain/entities/user/create_employee'
import { createEmployeeService } from '@account/services/user/create_employee'
import { findUserByEmailDB } from '@account/domain/entities/user/findUser/find_user_by_email'
import { userView } from '@account/services/views/user'

export const createEmployeeUseCase: Middleware = (_httpRequest, httpBody) => {
  const { name, email, userId: businessAdminId } = httpBody

  const unValidatedUser = { name, email, businessAdminId }

  const httpResponse = pipe(
    unValidatedUser,
    createEmployeePropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validEmployee => pipe(
      validEmployee,
      createEmployeeService(createEmployeeDB)(findUserByEmailDB),
      TE.chain(employee => TE.tryCatch(
        async () => {
          const user = userView(employee)
          return ok(user)
        },
        (_err) => fail(new Error('Oops! Token não foi criado'))
      )
      ))
    )
  )
  return httpResponse
}
