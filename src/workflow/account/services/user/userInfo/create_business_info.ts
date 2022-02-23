import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { clientError, fail } from '@core/infra/http_error_response'
import { DatabaseFailError, EntityAlreadyExistError } from '@account/domain/entities/errors/db_error'
import { CreateBusinessInfoService } from '@account/domain/contracts/User/UserInfo/CreateBusinessInfo'

export const createBusinessInfoService: CreateBusinessInfoService = (createBusinessInfoDB) => (getBusinessInfoByUserIdDB) => (business) => {
  const { adminId } = business

  return pipe(
    TE.tryCatch(
      async () => await getBusinessInfoByUserIdDB(adminId),

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
      async () => await createBusinessInfoDB(business),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ))
  )
}
