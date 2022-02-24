import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { clientError, fail } from '@core/infra/http_error_response'
import { GetEmployeesService } from '@account/domain/contracts/User/UserInfo/GetEmployees'
import { DatabaseFailError, EntityNotFoundError } from '@account/domain/entities/errors/db_error'

export const getEmployeesService: GetEmployeesService = (getBusinessEmployeesDB) => (findBusinessByAdminIdDB) => (businessAdminId) => {
  return pipe(
    TE.tryCatch(
      async () => await findBusinessByAdminIdDB(businessAdminId),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ),
    TE.chain(business => {
      return TE.tryCatch(
        async () => {
          if (!business) {
            throw new EntityNotFoundError('Oops! A sua empresa não foi encontrada')
          }

          return business
        },

        err => clientError(err as Error)
      )
    }),
    TE.chain(business => TE.tryCatch(
      async () => await getBusinessEmployeesDB(business.id),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ))
  )
}
