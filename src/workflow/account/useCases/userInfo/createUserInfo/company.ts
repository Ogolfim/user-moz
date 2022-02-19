import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { clientError, HttpErrorResponse } from '@core/infra/http_error_response'
import { createCompanyInfoPropsValidate } from '@account/services/validate/user/userInfo/create_company_info_props'
import { HttpSuccessResponse, ok } from '@core/infra/http_success_response'
import { createCompanyInfoDB } from '@account/domain/entities/user/userInfo/create_business_info'
import { createCompanyInfoService } from '@account/services/user/userInfo/create_company_info'
import { UnValidatedCompany } from '@account/domain/contracts/User/UserInfo/CreateCompanyInfo'
import { getCompanyInfoByUserIdDB } from '@account/domain/entities/user/userInfo/get_company_by_user_id'

export const createCompanyInfoUseCase = (company: UnValidatedCompany):
TE.TaskEither<HttpErrorResponse, HttpSuccessResponse> => {
  const httpResponse = pipe(
    company,
    createCompanyInfoPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain((company) => {
      return pipe(
        company,
        createCompanyInfoService(createCompanyInfoDB)(getCompanyInfoByUserIdDB),
        TE.map(_userInfo => {
          return ok()
        })
      )
    })
  )

  return httpResponse
}
