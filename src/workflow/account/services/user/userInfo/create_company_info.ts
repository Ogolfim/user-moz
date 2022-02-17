import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { fail } from '@core/infra/http_error_response'
import { DatabaseFailError } from '@account/domain/entities/errors/db_error'
import { CreateCompanyInfoService } from '@account/domain/contracts/User/UserInfo/CreateCompanyInfo'

export const createCompanyInfoService: CreateCompanyInfoService = (createCompanyInfoDB) => (company) => {
  return pipe(
    TE.tryCatch(
      async () => await createCompanyInfoDB(company),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    )
  )
}
