import * as TE from 'fp-ts/lib/TaskEither'
import { clientError, fail } from '@core/infra/http_error_response'
import { UpdateUserEmailService } from '@account/domain/contracts/User/UpdateUser/update_user_email'
import { DatabaseFailError, EntityNotFoundError } from '@account/domain/entities/errors/db_error'
import { pipe } from 'fp-ts/lib/function'

export const updateUserEmailService: UpdateUserEmailService = (updateUserEmailDB) => (findUserByIdDB) => ({ email, userId }) => {
  return pipe(
    TE.tryCatch(
      async () => await findUserByIdDB(userId),
      err => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ),
    TE.chain(user => TE.tryCatch(
      async () => {
        if (!user) throw new EntityNotFoundError('Oops! A sua conta não foi encontrada')

        return user
      },
      err => {
        return clientError(err as Error)
      }
    )),
    TE.chain(user => TE.tryCatch(
      async () => await updateUserEmailDB({ email, userId }),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ))
  )
}
