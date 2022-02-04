import * as TE from 'fp-ts/lib/TaskEither'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { Middleware } from '../../../../../core/infra/Middleware'
import { forbidden } from '../../../../../core/infra/HttpErrorResponse'
import { verify } from 'jsonwebtoken'
import { ok } from '../../../../../core/infra/HttpSuccessResponse'


type DecodedJwt = {
  id: string
}

export const ensureAuthenticatedMiddleware: Middleware = (httpRequest, httpBody) => {
  const bearerHeader = httpRequest.headers['authorization'];  

  const accessToken = bearerHeader.split(' ')[1];

  const httpResponse = pipe(
    E.tryCatch(
      () => {
        if(!accessToken) throw new Error('Oops! Acesso recuado')

        return accessToken
      },
      (err) => forbidden(err as Error)
    ),
    E.chain(accessToken => {
      return E.tryCatch(
        () => {
          const decoded = verify(accessToken, process.env.ACCESS_TOKEN_SECRET!) as DecodedJwt         

          return ok({...httpBody, userId: decoded.id })
        },
        (err) => forbidden(new Error('Oops! Acesso recuado'))
      )
    }),
    TE.fromEither
  )  

  return httpResponse
}