import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { clientError, fail } from '@core/infra/http_error_response'
import { DatabaseFailError, EntityAlreadyExistError } from '@account/domain/entities/errors/db_error'
import { CreateCompanyInfoService } from '@account/domain/contracts/User/UserInfo/CreateCompanyInfo'

export const createCompanyInfoService: CreateCompanyInfoService = (createCompanyInfoDB) => (getCompanyInfoByUserIdDB) => (company) => {
  const { adminId } = company

  return pipe(
    TE.tryCatch(
      async () => await getCompanyInfoByUserIdDB(adminId),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ),
    TE.chain(companyInfo => {
      return TE.tryCatch(
        async () => {
          if (companyInfo) {
            throw new EntityAlreadyExistError('Você já tem informações salvas. Podem ser atualizadas')
          }

          return companyInfo
        },

        err => clientError(err as Error)
      )
    }),
    TE.chain((_companyInfo) => TE.tryCatch(
      async () => await createCompanyInfoDB(company),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ))
  )
}
