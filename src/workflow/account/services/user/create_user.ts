import { pipe } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'
import { clientError, fail } from '@core/infra/http_error_response'
import { CreateUserService } from '@account/domain/contracts/User/CreateUser/create_user'
import { hashPassword } from '@account/services/password/hash'
import { DatabaseFailError, EntityNotFoundError } from '@account/domain/entities/errors/db_error'
import { PasswordHashError } from '../password/errors/hash_errors'

export const createUserService: CreateUserService = (createUserDB) => (findUserByEmailDB) => (validUser) => {
  return pipe(
    TE.tryCatch(
      async () => {
        const userFound = await findUserByEmailDB(validUser.email)

        if (userFound) {
          throw new EntityNotFoundError('Oops! A sua não foi encontrada')
        }

        return userFound
      },
      (err) => clientError(err as Error)
    ),
    TE.chain((_user) => TE.tryCatch(
      async () => {
        const { name, email, password, accountType } = validUser
        const hash = await hashPassword(password)

        return { name, email, accountType, hash }
      },

      (err) => {
        console.log(err)
        return fail(new PasswordHashError('Oops! A sua senha não foi criada. Por favor contacte suporte'))
      }
    )),
    TE.chain(user => TE.tryCatch(
      () => createUserDB(user),
      err => {
        console.log(err)
        return fail(new DatabaseFailError('Oops! Erro. Por favor contacte suporte'))
      }
    ))
  )
}
