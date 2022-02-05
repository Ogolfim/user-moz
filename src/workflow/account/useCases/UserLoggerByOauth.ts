import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { findOrSaveUser } from '../domain/entities/findOrSaveOauthUser'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../core/infra/Middleware'
import { UserLoggerByOauthPropsValidate } from '../services/validate/UserLoggerByOauthProps'
import { clientError } from '../../../core/infra/HttpErrorResponse'
import { ok } from '../../../core/infra/HttpSuccessResponse'
import { createAccessToken } from '../infra/http/OAuth/createAccessToken'

export const userLoggerByOauth: Middleware = (_httpRequest, httpBody) => {
  const { name, email, serverName } = httpBody

  const unValidatedUser = { name, email, serverName }

  const httpResponse = pipe(
    unValidatedUser,
    UserLoggerByOauthPropsValidate,
    E.mapLeft(error => clientError(new Error(error.message))),
    TE.fromEither,
    TE.chain(validUser => {
      return pipe(
        validUser,
        findOrSaveUser,
        TE.map(user => {
          const token = createAccessToken(user)

          return ok({
            token
          })
        })
      )
    })
  )

  return httpResponse
}
