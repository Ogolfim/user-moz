import { verify } from 'jsonwebtoken'
import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../../../core/infra/middleware'
import { forbidden } from '../../../../../core/infra/http_error_response'
import { ok } from '../../../../../core/infra/http_success_response'

export const ensureAuthenticatedMiddleware: Middleware = (httpRequest, httpBody) => {
  const bearerHeader = httpRequest.headers.authorization

  const httpResponse = pipe(
    E.tryCatch(
      () => {
        if (!bearerHeader) throw new Error('Oops! Você não está autorizado')

        const accessToken = bearerHeader.split(' ')[1]

        if (!accessToken) throw new Error('Oops! Você não está autorizado')

        return accessToken
      },
      (err) => forbidden(err as Error)
    ),
    E.chain(accessToken => {
      return E.tryCatch(
        () => {
          const decoded = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!)

          return ok({ ...httpBody, userId: decoded.sub })
        },
        (_err) => forbidden(new Error('Oops! Você não está autorizado'))
      )
    }),
    TE.fromEither
  )

  return httpResponse
}
