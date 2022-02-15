import * as TE from 'fp-ts/lib/TaskEither'
import { clientError, fail } from '@core/infra/http_error_response'
import { LoginUserService } from '@account/domain/Contracts/User/Login/LoginUser'
import { pipe } from 'fp-ts/lib/function'
import { verifyPassword } from '@account/services/password/verify'

export const loginUserService: LoginUserService = (findUserByEmailDB) => ({ password, email }) => {
  return pipe(
    TE.tryCatch(
      () => findUserByEmailDB(email),
      err => {
        console.log(err)
        return fail(new Error('Oops! Erro. Por favor contacte suporte'))
      }
    ),
    TE.chain(user => TE.tryCatch(
      async () => {
        if (!user) {
          throw new Error(`Oops! Nenhuma conta com o email ${email} encontrada`)
        }

        return user
      },
      notFoundError => clientError(notFoundError as Error)
    )),
    TE.chain((user) => {
      return TE.tryCatch(
        async () => {
          if (!user.hash) throw new Error('Oops! Senha incorreta')

          const result = await verifyPassword(password, user.hash)

          if (!result) throw new Error('Oops! Senha incorreta')

          return user
        },
        (err) => clientError(err as Error)
      )
    })
  )
}
