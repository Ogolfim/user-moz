import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { clientError, HttpErrorResponse } from '@core/infra/http_error_response'
import { createEmployeeInfoPropsValidate } from '@account/services/validate/user/userInfo/create_employee_info_props'
import { HttpSuccessResponse, ok } from '@core/infra/http_success_response'
import { createEmployeeInfoDB } from '@account/domain/entities/user/userInfo/create_employee_info'
import { createEmployeeInfoService } from '@account/services/user/userInfo/create_employee_info'
import { UnValidatedEmployee } from '@account/domain/contracts/User/UserInfo/CreateEmployeeInfo'
import { getEmployeeInfoByUserIdDB } from '@account/domain/entities/user/userInfo/get_employee_by_user_id'

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
        createEmployeeInfoService(createEmployeeInfoDB)(getEmployeeInfoByUserIdDB),
        TE.map((_userInfo) => {
          return ok()
        })
      )
    })
  )

  return httpResponse
}
