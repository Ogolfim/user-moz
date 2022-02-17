import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { clientError, HttpErrorResponse } from '@core/infra/http_error_response'
import { createStudentInfoPropsValidate } from '@account/services/validate/user/UserInfo/create_student_info_props'
import { HttpSuccessResponse, ok } from '@core/infra/http_success_response'
import { createStudentInfoDB } from '@account/domain/entities/user/userInfo/create_student_info'
import { createStudentInfoService } from '@account/services/user/userInfo/create_student_info'
import { UnValidatedStudent } from '@account/domain/contracts/User/UserInfo/CreateStudentInfo'

export const createStudentInfoUseCase = (student: UnValidatedStudent):
TE.TaskEither<HttpErrorResponse, HttpSuccessResponse> => {
  const httpResponse = pipe(
    student,
    createStudentInfoPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain((student) => {
      return pipe(
        student,
        createStudentInfoService(createStudentInfoDB),
        TE.map(userInfo => {
          return ok(userInfo)
        })
      )
    })
  )

  return httpResponse
}
