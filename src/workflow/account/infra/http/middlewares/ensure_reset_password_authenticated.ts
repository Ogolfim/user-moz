import { verify } from 'jsonwebtoken'
import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { forbidden } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'

export const ensureResetPasswordAuthenticatedMiddleware: Middleware = (httpRequest, httpBody) => {
  const bearerHeader = httpRequest.headers.authorization

  const httpResponse = pipe(
    E.tryCatch(
      () => {
        if (!bearerHeader) throw new Error('Não foi possível recuperar a senha')

        const resetToken = bearerHeader.split(' ')[1]

        if (!resetToken) throw new Error('Não foi possível recuperar a senha')

        return resetToken
      },
      (err) => forbidden(err as Error)
    ),
    E.chain(accessToken => {
      return E.tryCatch(
        () => {
          const decoded = verify(accessToken, process.env.RESET_PASSWORD_TOKEN_SECRET!)

          return ok({ ...httpBody, userId: decoded.sub })
        },
        (_err) => forbidden(new Error('Não foi possível recuperar a senha'))
      )
    }),
    TE.fromEither
  )

  return httpResponse
}
