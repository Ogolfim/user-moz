import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { clientError, fail } from '@core/infra/http_error_response'
import { DatabaseFailError, EntityAlreadyExistError } from '@account/domain/entities/errors/db_error'
import { CreateEmployeeInfoService } from '@account/domain/contracts/User/UserInfo/CreateEmployeeInfo'

export const createEmployeeInfoService: CreateEmployeeInfoService = (createEmployeeInfoDB) => (getEmployeeInfoByUserIdDB) => (employee) => {
  const { companyId } = employee

  return pipe(
    TE.tryCatch(
      async () => await getEmployeeInfoByUserIdDB(companyId),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ),
    TE.chain(employeeInfo => {
      return TE.tryCatch(
        async () => {
          if (employeeInfo) {
            throw new EntityAlreadyExistError('Você já tem informações salvas. Podem ser atualizadas')
          }

          return employeeInfo
        },

        err => clientError(err as Error)
      )
    }),
    TE.chain((_companyInfo) => TE.tryCatch(
      async () => await createEmployeeInfoDB(employee),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ))
  )
}
