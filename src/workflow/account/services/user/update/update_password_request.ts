import * as TE from 'fp-ts/lib/TaskEither'
import { fail, notFound } from '@core/infra/http_error_response'
import { UpdateUserPasswordRequestService } from '@account/domain/contracts/User/UpdateUser/update_user_password_request'
import { pipe } from 'fp-ts/lib/function'
import { DatabaseFailError, EntityNotFoundError } from '@account/domain/entities/errors/db_error'

export const updateUserPasswordRequestService: UpdateUserPasswordRequestService = (findUserByEmailDB) => (email) => {
  return pipe(
    TE.tryCatch(
      async () => await findUserByEmailDB(email),
      err => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ),
    TE.chain(user => TE.tryCatch(
      async () => {
        if (!user) throw new EntityNotFoundError('Oops! Email incorreto')

        return user
      },
      err => {
        return notFound(err as Error)
      }
    ))
  )
}
