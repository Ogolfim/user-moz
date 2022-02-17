import * as TE from 'fp-ts/lib/TaskEither'
import { clientError, fail, notFound } from '@core/infra/http_error_response'
import { LoginUserService } from '@account/domain/Contracts/User/Login/LoginUser'
import { pipe } from 'fp-ts/lib/function'
import { verifyPassword } from '@account/services/password/verify'
import { DatabaseFailError, EntityNotFoundError } from '@account/domain/entities/errors/db_error'
import { PasswordVerifyError } from '@account/services/password/errors/hash_errors'

export const loginUserService: LoginUserService = (findUserByEmailDB) => ({ password, email }) => {
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
        if (!user) {
          throw new EntityNotFoundError(`Oops! Nenhuma conta com o email ${email} encontrada`)
        }

        return user
      },
      notFoundError => notFound(notFoundError as Error)
    )),
    TE.chain((user) => {
      return TE.tryCatch(
        async () => {
          if (!user.hash) throw new PasswordVerifyError('Oops! Senha incorreta')

          const result = await verifyPassword(password, user.hash)

          if (!result) throw new PasswordVerifyError('Oops! Senha incorreta')

          return user
        },
        (err) => clientError(err as Error)
      )
    })
  )
}
