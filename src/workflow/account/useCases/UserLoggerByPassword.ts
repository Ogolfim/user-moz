import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../core/infra/Middleware'
import { clientError } from '../../../core/infra/HttpErrorResponse'
import { ok } from '../../../core/infra/HttpSuccessResponse'
import { createAccessToken } from '../infra/http/OAuth/create_id_token'
import { UserLoggerByPasswordPropsValidate } from '../services/validate/UserLoggerByPasswordPropsValidate'
import { findUserByEmail } from '../domain/entities/findUserByEmail'
import { verifyPassword } from '../services/password/verify'

export const userLoggerByPassword: Middleware = (_httpRequest, httpBody) => {

  const { email, password} = httpBody

  const unValidatedUser = { email, password}

  const httpResponse = pipe(
    unValidatedUser,
    UserLoggerByPasswordPropsValidate,
    E.mapLeft(error => clientError(new Error(error.message))),
    TE.fromEither,
    TE.chain(({email, password}) => {

      return pipe(
        email,
        findUserByEmail,
        TE.chain(user => {
          return TE.tryCatch(
            async () => {
              if (!user) {
                throw new Error(`Oops! Nenhuma conta com email ${email} encontrada`);
              }
    
              return user;
            },
    
            notFoundUserError => clientError(notFoundUserError as Error)
          )
        }),
        TE.chain(user => {

          return TE.tryCatch(
            async () => {
              if(!user.hash) throw new Error('Oops! Senha incorreta')
    
              const result = await verifyPassword(password, user.hash)
    
              if(!result) throw new Error('Oops! Senha incorreta')

              const token = createAccessToken(user)
    
              return ok({
                name: user.name,
                token
              })
            },
            (err) => clientError(err as Error)
          )
        })
      )
    })
  )


  return httpResponse
}
