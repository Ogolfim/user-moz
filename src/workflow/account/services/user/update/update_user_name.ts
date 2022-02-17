import * as TE from 'fp-ts/lib/TaskEither'
import { fail, notFound } from '@core/infra/http_error_response'
import { UpdateUserNameService } from '@account/domain/contracts/User/UpdateUser/update_user_name'
import { DatabaseFailError, EntityNotFoundError } from '@account/domain/entities/errors/db_error'
import { pipe } from 'fp-ts/lib/function'

export const updateUserNameService: UpdateUserNameService = (updateNameDB) => (findUserByIdDB) => ({ name, userId }) => {
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
        return notFound(err as Error)
      }
    )),
    TE.chain((_user) => TE.tryCatch(
      async () => await updateNameDB({ name, userId }),

      (err) => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ))
  )
}
