import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { clientError, fail } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { createAccessToken } from '@meAdmin/services/token/access'
import { meAdminRegisterPropsValidate } from '@meAdmin/services/validate/createUser/meadmin_register_props'
import { createAdminDB } from '@meAdmin/domain/entities/createAdmin/create_admin'
import { hashPassword } from '@meAdmin/services/password/hash'

export const meAdminRegister: Middleware = (_httpRequest, httpBody) => {
  const { name, email, password } = httpBody

  const unValidatedAdmin = { name, email, password }

  const httpResponse = pipe(
    unValidatedAdmin,
    meAdminRegisterPropsValidate,
    E.mapLeft(error => clientError(error)),
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
            createAdminDB,
            TE.chain(newAdmin => {
              return TE.tryCatch(
                async () => {
                  const token = await createAccessToken(newAdmin)

                  return ok({
                    token
                  })
                },
                (err) => {
                  console.log(err)
                  return fail(new Error('Oops! Token não foi criado'))
                }
              )
            })
          )
        })
      )
    })
  )

  return httpResponse
}
