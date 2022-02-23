import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError, notFound } from '@core/infra/http_error_response'
import { getUserInfoPropsValidate } from '@account/services/validate/user/userInfo/get_user_info_props'
import { getUserInfoDB } from '@account/domain/entities/user/userInfo/get_user_info'
import { userInfoService } from '@account/services/user/userInfo/user_info'
import { unipersonalView } from '@account/services/views/userInfo/unipersonal'
import { accountTypes } from '@account/domain/entities/db'
import { companyView } from '@account/services/views/userInfo/company'
import { studentView } from '@account/services/views/userInfo/student'
import { EntityNotFoundError } from '@account/domain/entities/errors/db_error'
import { ok } from '@core/infra/http_success_response'
import { employeeView } from '@account/services/views/userInfo/employee'

export const getUserInfoUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId } = httpBody

  const httpResponse = pipe(
    userId,
    getUserInfoPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain((userId) => {
      return pipe(
        userId,
        userInfoService(getUserInfoDB),
        TE.chain(user => TE.tryCatch(
          async () => {
            const { unipersonal, business, student, accountType, employee } = user

            if (!unipersonal && !business && !student && !employee) {
              throw new EntityNotFoundError('Oops! Nenhuma informação do usuário encontrada')
            }

            if (accountType === accountTypes.unipersonal) { return unipersonalView(unipersonal) }

            if (accountType === accountTypes.employee) { return employeeView(employee) }

            if (accountType === accountTypes.business) { return companyView(business) }

            if (accountType === accountTypes.student) { return studentView(student) }
          },
          err => notFound(err as Error)
        )),
        TE.map(userInfo => {
          return ok(userInfo)
        })
      )
    })
  )

  return httpResponse
}
