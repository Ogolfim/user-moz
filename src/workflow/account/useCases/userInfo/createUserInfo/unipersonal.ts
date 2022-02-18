import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { clientError, HttpErrorResponse } from '@core/infra/http_error_response'
import { createUnipersonalInfoPropsValidate } from '@account/services/validate/user/userInfo/create_unipersonal_info_props'
import { HttpSuccessResponse, ok } from '@core/infra/http_success_response'
import { createUnipersonalInfoDB } from '@account/domain/entities/user/userInfo/create_unipersonal_info'
import { createUnipersonalInfoService } from '@account/services/user/userInfo/create_unipersonal_info'
import { UnValidatedUnipersonal } from '@account/domain/contracts/User/UserInfo/CreateUnipersonalInfo'

export const createUnipersonalInfoUseCase = (unipersonal: UnValidatedUnipersonal):
TE.TaskEither<HttpErrorResponse, HttpSuccessResponse> => {
  const httpResponse = pipe(
    unipersonal,
    createUnipersonalInfoPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain((unipersonal) => {
      return pipe(
        unipersonal,
        createUnipersonalInfoService(createUnipersonalInfoDB),
        TE.map((_userInfo) => {
          return ok()
        })
      )
    })
  )

  return httpResponse
}
