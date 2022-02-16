import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { UpdateUserPasswordService } from '@account/domain/contracts/User/UpdateUser/reset_password'
import { hashPassword } from '@account/services/password/hash'
import { DatabaseFailError } from '@account/domain/entities/errors/db_error'
import { pipe } from 'fp-ts/lib/function'
import { PasswordHashError } from '@account/services/password/errors/hash_errors'

export const updateUserPasswordService: UpdateUserPasswordService = (updateUserPasswordDB) => ({ userId, password }) => {
  return pipe(
    TE.tryCatch(
      async () => {
        const hash = await hashPassword(password)

        return { userId, hash }
      },

      (err) => {
        console.log(err)
        return fail(new PasswordHashError('Oops! A sua senha não foi criada. Por favor contacte suporte'))
      }
    ),
    TE.chain(user => TE.tryCatch(
      () => updateUserPasswordDB(user),
      err => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ))
  )
}
