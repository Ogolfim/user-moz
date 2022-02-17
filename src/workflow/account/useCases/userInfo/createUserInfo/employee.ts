import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { clientError, HttpErrorResponse } from '@core/infra/http_error_response'
import { createEmployeeInfoPropsValidate } from '@account/services/validate/user/userInfo/create_employee_info_props'
import { HttpSuccessResponse, ok } from '@core/infra/http_success_response'
import { createEmployeeInfoDB } from '@account/domain/entities/user/userInfo/create_employee_info'
import { createEmployeeInfoService } from '@account/services/user/userInfo/create_employee_info'
import { UnValidatedEmployee } from '@account/domain/contracts/User/UserInfo/CreateEmployeeInfo'

export const createEmployeeInfoUseCase = (employee: UnValidatedEmployee):
TE.TaskEither<HttpErrorResponse, HttpSuccessResponse> => {
  const httpResponse = pipe(
    employee,
    createEmployeeInfoPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain((employee) => {
      return pipe(
        employee,
        createEmployeeInfoService(createEmployeeInfoDB),
        TE.map(userInfo => {
          return ok(userInfo)
        })
      )
    })
  )

  return httpResponse
}
