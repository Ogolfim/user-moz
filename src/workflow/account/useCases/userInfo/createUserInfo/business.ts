import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { clientError, HttpErrorResponse } from '@core/infra/http_error_response'
import { createBusinessInfoPropsValidate } from '@account/services/validate/user/userInfo/create_business_info_props'
import { HttpSuccessResponse, ok } from '@core/infra/http_success_response'
import { createBusinessInfoDB } from '@account/domain/entities/user/userInfo/create_business_info'
import { createBusinessInfoService } from '@account/services/user/userInfo/create_business_info'
import { UnValidatedBusiness } from '@account/domain/contracts/User/UserInfo/CreateBusinessInfo'
import { getBusinessInfoByUserIdDB } from '@account/domain/entities/user/userInfo/get_business_by_user_id'

export const createBusinessInfoUseCase = (business: UnValidatedBusiness):
TE.TaskEither<HttpErrorResponse, HttpSuccessResponse> => {
  const httpResponse = pipe(
    business,
    createBusinessInfoPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain((business) => {
      return pipe(
        business,
        createBusinessInfoService(createBusinessInfoDB)(getBusinessInfoByUserIdDB),
        TE.map(_userInfo => {
          return ok()
        })
      )
    })
  )

  return httpResponse
}
