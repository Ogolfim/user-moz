import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError } from '@core/infra/http_error_response'
import { getUserPropsValidate } from '@account/services/validate/user/userInfo/get_user_props'
import { accountTypes } from '@account/domain/entities/db'
import { findUserByIdDB } from '@account/domain/entities/user/findUser/find_user_by_id'
import { getUserService } from '@account/services/user/userInfo/get_user'
import { createUnipersonalInfoUseCase } from '@account/useCases/userInfo/createUserInfo//unipersonal'
import { createEmployeeInfoUseCase } from '@account/useCases/userInfo/createUserInfo/employee'
import { createCompanyInfoUseCase } from '@account/useCases/userInfo/createUserInfo/company'
import { createStudentInfoUseCase } from '@account/useCases/userInfo/createUserInfo/student'

export const createUserInfoUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId, phone, address, companyId, name: companyName, bornAt, schoolName, studentId } = httpBody

  const httpResponse = pipe(
    userId,
    getUserPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain((userId) => {
      return pipe(
        userId,
        getUserService(findUserByIdDB),
        TE.chain(user => {
          const { accountType } = user

          if (accountType === accountTypes.unipersonal) {
            return createUnipersonalInfoUseCase({ userId, address, phone })
          }

          if (accountType === accountTypes.employee) {
            return createEmployeeInfoUseCase({ userId, companyId })
          }

          if (accountType === accountTypes.company) {
            return createCompanyInfoUseCase({ userId, address, phone, name: companyName })
          }

          if (accountType === accountTypes.student) {
            return createStudentInfoUseCase({ userId, address, phone, schoolName, studentId, bornAt })
          }
        })
      )
    })
  )

  return httpResponse
}
