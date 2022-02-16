import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { forbidden } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'
import { verifyAccessToken } from '@account/services/token/access'

export const ensureAuthenticatedMiddleware: Middleware = (httpRequest, httpBody) => {
  const bearerHeader = httpRequest.headers.authorization

  const httpResponse = pipe(
    E.tryCatch(
      () => {
        if (!bearerHeader) throw new Error('Não tem permissão')

        const accessToken = bearerHeader.split(' ')[1]

        if (!accessToken) throw new Error('Não tem permissão')

        return accessToken
      },
      (err) => forbidden(err as Error)
    ),
    TE.fromEither,
    TE.chain(accessToken => {
      return TE.tryCatch(
        async () => {
          const payload = await verifyAccessToken(accessToken)

          return ok({ ...httpBody, userId: payload.sub })
        },
        (_err) => forbidden(new Error('Access Token invalido'))
      )
    })
  )

  return httpResponse
}
