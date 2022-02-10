import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { userPerfil } from '@account/useCases/userInfo/user_perfil'
import { ensureAuthenticatedMiddleware } from '@account/infra/http/middlewares/ensure_authenticated'

export const userPerfilController = (request: Request, response: Response) => {
  pipe(
    ensureAuthenticatedMiddleware(request, request.body),
    TE.mapLeft(httpErrorResponse => {
      const { statusCode, body } = httpErrorResponse

      response.status(statusCode).json(body)
    }),
    TE.map(({ body }) => {
      return pipe(
        userPerfil(request, body),
        TE.mapLeft(httpErrorResponse => {
          const { statusCode, body } = httpErrorResponse
          return response.status(statusCode).json(body)
        }),
        TE.map(httpSuccessResponse => {
          const { statusCode, body } = httpSuccessResponse

          return response.status(statusCode).json(body)
        })
      )()
    })
  )()
}
