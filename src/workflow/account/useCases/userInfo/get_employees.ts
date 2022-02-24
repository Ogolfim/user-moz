import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError, fail } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { getEmployeesPropsValidate } from '@account/services/validate/user/userInfo/get_employees_props'
import { findBusinessEmployeesDB } from '@account/domain/entities/user/userInfo/find_business_employee'
import { getEmployeesService } from '@account/services/user/userInfo/get_employees'
import { findBusinessByAdminIdDB } from '@account/domain/entities/user/userInfo/find_business_by_admin_id'
import { manyUsers } from '@account/services/views/user'

export const getEmployeesUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId: businessAdminId } = httpBody

  const httpResponse = pipe(
    businessAdminId,
    getEmployeesPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validAdmin => pipe(
      validAdmin,
      getEmployeesService(findBusinessEmployeesDB)(findBusinessByAdminIdDB),
      TE.chain(employees => TE.tryCatch(
        async () => {
          const users = manyUsers(employees)
          return ok(users)
        },
        (_err) => fail(new Error('Oops! Token não foi criado'))
      )
      ))
    )
  )
  return httpResponse
}
