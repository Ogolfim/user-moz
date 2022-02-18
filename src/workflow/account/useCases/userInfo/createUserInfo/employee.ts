import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { clientError } from '@core/infra/http_error_response'
import { createEmployeeInfoPropsValidate } from '@account/services/validate/user/userInfo/create_employee_info_props'
import { ok } from '@core/infra/http_success_response'
import { createEmployeeInfoDB } from '@account/domain/entities/user/userInfo/create_employee_info'
import { createEmployeeInfoService } from '@account/services/user/userInfo/create_employee_info'
import { Middleware } from '@core/infra/Middleware'

export const createEmployeeInfoUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId: companyAdminId, email } = httpBody

  const httpResponse = pipe(
    { companyAdminId, email },
    createEmployeeInfoPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain((employee) => {
      return pipe(
        employee,
        createEmployeeInfoService(createEmployeeInfoDB),
        TE.map((_userInfo) => {
          return ok()
        })
      )
    })
  )

  return httpResponse
}
