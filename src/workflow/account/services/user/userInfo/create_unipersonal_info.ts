import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { clientError, fail } from '@core/infra/http_error_response'
import { DatabaseFailError, EntityAlreadyExistError } from '@account/domain/entities/errors/db_error'
import { CreateUnipersonalInfoService } from '@account/domain/contracts/User/UserInfo/CreateUnipersonalInfo'

export const createUnipersonalInfoService: CreateUnipersonalInfoService = (createUnipersonalInfoDB) =>
  (getUnipersonalInfoByUserIdDB) => (unipersonal) => {
    const { userId } = unipersonal

    return pipe(
      TE.tryCatch(
        async () => await getUnipersonalInfoByUserIdDB(userId),

        (err) => {
          console.log(err)
          return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
        }
      ),
      TE.chain(UnipersonalInfo => {
        return TE.tryCatch(
          async () => {
            if (UnipersonalInfo) {
              throw new EntityAlreadyExistError('Você já tem informações salvas. Podem ser atualizadas')
            }

            return UnipersonalInfo
          },

          err => clientError(err as Error)
        )
      }),
      TE.chain((_companyInfo) => TE.tryCatch(
        async () => await createUnipersonalInfoDB(unipersonal),

        (err) => {
          console.log(err)
          return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
        }
      ))
    )
  }
