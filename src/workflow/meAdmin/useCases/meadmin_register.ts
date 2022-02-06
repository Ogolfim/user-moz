import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../core/infra/middleware'
import { clientError, fail } from '../../../core/infra/http_error_response'
import { ok } from '../../../core/infra/http_success_response'
import { createAccessToken } from '../infra/http/OAuth/create_access_token'
import { meAdminRegisterPropsValidate } from '../services/validate/meadmin_register_props'
import { adminSaver } from '../domain/entities/admin_saver'
import { hashPassword } from '../services/password/hash'

export const meAdminRegister: Middleware = (_httpRequest, httpBody) => {
  const { name, email, password } = httpBody

  const unValidatedAdmin = { name, email, password }

  const httpResponse = pipe(
    unValidatedAdmin,
    meAdminRegisterPropsValidate,
    E.mapLeft(error => clientError(new Error(error.message))),
    TE.fromEither,
    TE.chain(validAdmin => {
      return pipe(
        TE.tryCatch(
          async () => {
            const { name, email, password } = validAdmin
            const hash = await hashPassword(password)

            return { name, email, hash }
          },

          (err) => {
            console.log(err)
            return fail(new Error('Oops! A sua senha não foi criada. Por favor contacte suporte'))
          }
        ),
        TE.chain(admin => {
          return pipe(
            admin,
            adminSaver,
            TE.map(newAdmin => {
              const token = createAccessToken(newAdmin)

              return ok({
                token
              })
            })
          )
        })
      )
    })
  )

  return httpResponse
}
