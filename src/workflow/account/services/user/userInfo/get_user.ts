import * as TE from 'fp-ts/lib/TaskEither'
import { clientError, fail } from '@core/infra/http_error_response'
import { GetUserService } from '@account/domain/contracts/User/UserInfo/GetUser'
import { DatabaseFailError, EntityNotFoundError } from '@account/domain/entities/errors/db_error'
import { pipe } from 'fp-ts/lib/function'

export const getUserService: GetUserService = (getUserByIdDB) => (userId) => {
  return pipe(
    TE.tryCatch(
      async () => await getUserByIdDB(userId),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ),
    TE.chain(user => {
      return TE.tryCatch(
        async () => {
          if (!user) {
            throw new EntityNotFoundError('Oops! A sua conta não foi encontrada')
          }

          return user
        },

        notFoundUserError => clientError(notFoundUserError as Error)
      )
    })
  )
}
