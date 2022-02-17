import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { fail } from '@core/infra/http_error_response'
import { DatabaseFailError } from '@account/domain/entities/errors/db_error'
import { CreateEmployeeInfoService } from '@account/domain/contracts/User/UserInfo/CreateEmployeeInfo'

export const createEmployeeInfoService: CreateEmployeeInfoService = (createEmployeeInfoDB) => (employee) => {
  return pipe(
    TE.tryCatch(
      async () => await createEmployeeInfoDB(employee),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    )
  )
}
