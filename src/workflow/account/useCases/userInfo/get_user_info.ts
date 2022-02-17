import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError, notFound } from '@core/infra/http_error_response'
import { userPerfilPropsValidate } from '@account/services/validate/user/UserInfo/user_perfil_props'
import { getUserInfoDB } from '@account/domain/entities/user/findUser/get_user_info'
import { userInfoService } from '@account/services/user/userInfo/user_info'
import { unipersonalView } from '@account/services/views/userInfo/unipersonal'
import { accountTypes } from '@account/domain/entities/db'
import { companyView } from '@account/services/views/userInfo/company'
import { StudentView } from '@account/services/views/userInfo/student'
import { EntityNotFoundError } from '@account/domain/entities/errors/db_error'
import { ok } from '@core/infra/http_success_response'

export const getUserInfoUseCase: Middleware = (_httpRequest, httpBody) => {
  const { userId } = httpBody

  const httpResponse = pipe(
    userId,
    userPerfilPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain((userId) => {
      return pipe(
        userId,
        userInfoService(getUserInfoDB),
        TE.chain(user => {
          return TE.tryCatch(
            async () => {
              if (!user) {
                throw new Error('Oops! Conta não encontrada')
              }

              return user
            },

            notFoundUserError => clientError(notFoundUserError as Error)
          )
        }),
        TE.chain(user => TE.tryCatch(
          async () => {
            const { unipersonal, company, student, accountType } = user

            if (!unipersonal && !company && !student) {
              throw new EntityNotFoundError('Oops! Nenhuma informação do usuário encontrada')
            }

            if (accountType === accountTypes.unipersonal) { return unipersonalView(unipersonal) }

            if (accountType === accountTypes.company) { return companyView(company) }

            if (accountType === accountTypes.student) { return StudentView(student) }
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
