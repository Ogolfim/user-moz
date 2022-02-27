import * as TE from 'fp-ts/lib/TaskEither'
import { clientError, fail } from '@core/infra/http_error_response'
import { CountEmployeesService } from '@bills/domain/Contracts/Business/CreateBusinessBill'
import { pipe } from 'fp-ts/lib/function'
import { EntityNotFoundError } from '@bills/domain/entities/errors/db_error'

export const countEmployeesService: CountEmployeesService = (countEmployeesDB) => (adminId) => {
  return pipe(
    TE.tryCatch(
      async () => await countEmployeesDB(adminId),
      err => {
        console.log(err)
        return fail(new Error('Oops! Erro. Por favor contacte suporte'))
      }
    ),
    TE.chain(employeesNumber => {
      return TE.tryCatch(
        async () => {
          if (!employeesNumber) {
            throw new EntityNotFoundError('Oops! Por favor, dê-nos informações da sua empresa')
          }

          return employeesNumber
        },

        err => clientError(err as Error)
      )
    })
  )
}
