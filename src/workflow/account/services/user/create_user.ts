import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'
import { fail } from '@core/infra/http_error_response'
import { CreateUserService } from '@account/domain/Contracts/User/create_user'
import { hashPassword } from '@account/services/password/hash'

export const createUserService: CreateUserService = (createUserDB) => (validUser) => {
  return pipe(
    TE.tryCatch(
      async () => {
        const { name, email, password, accountType } = validUser
        const hash = await hashPassword(password)

        return { name, email, accountType, hash }
      },

      (err) => {
        console.log(err)
        return fail(new Error('Oops! A sua senha não foi criada. Por favor contacte suporte'))
      }
    ),
    TE.chain(user => TE.tryCatch(
      () => createUserDB(user),
      err => {
        console.log(err)
        return fail(new Error('Oops! Erro. Por favor contacte suporte'))
      }
    ))
  )
}
