import { verify } from 'jsonwebtoken'
import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '@core/infra/middleware'
import { forbidden } from '@core/infra/http_error_response'
import { ok } from '@core/infra/http_success_response'

type DecodedRefreshJwt = {
  sub: string
  id: string
}

export const ensureValidRefreshTokenMiddleware: Middleware = (httpRequest, httpBody) => {
  const bearerHeader = httpRequest.headers.authorization

  const httpResponse = pipe(
    E.tryCatch(
      () => {
        if (!bearerHeader) throw new Error('Não tem permissão')

        const refreshAccessToken = bearerHeader.split(' ')[1]

        if (!refreshAccessToken) throw new Error('Não tem permissão')

        return refreshAccessToken
      },
      (err) => forbidden(err as Error)
    ),
    E.chain(refreshAccessToken => {
      return E.tryCatch(
        () => {
          const { sub, id } = verify(refreshAccessToken, process.env.REFRESH_TOKEN_SECRET!) as DecodedRefreshJwt

          return ok({ ...httpBody, userId: sub, id: id })
        },
        (_err) => forbidden(new Error('Refresh Access Token invalido'))
      )
    }),
    TE.fromEither
  )

  return httpResponse
}
