import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../../core/infra/middleware'
import { clientError, fail } from '../../../../core/infra/http_error_response'
import { ok } from '../../../../core/infra/http_success_response'
import { resetPasswordPropsValidate } from '../../services/validate/reset_password_props'
import { resetPasswordDB } from '../../domain/entities/updateUser/reset_password'
import { hashPassword } from '../../services/password/hash'

export const resetPassword: Middleware = (_httpRequest, httpBody) => {
  const { userId, password } = httpBody

  const unValidatedUser = { userId, password }

  const httpResponse = pipe(
    unValidatedUser,
    resetPasswordPropsValidate,
    E.mapLeft(error => clientError(error)),
    TE.fromEither,
    TE.chain(validUser => {
      return pipe(
        TE.tryCatch(
          async () => {
            const { userId, password } = validUser
            const hash = await hashPassword(password)

            return { userId, hash }
          },

          (err) => {
            console.log(err)
            return fail(new Error('Oops! A sua senha não foi criada. Por favor contacte suporte'))
          }
        ),
        TE.chain(user => pipe(
          user,
          resetPasswordDB,
          TE.map((_user) => {
            return ok()
          })
        ))
      )
    })
  )

  return httpResponse
}
