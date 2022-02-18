import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { createUserInfoUseCase } from '@account/useCases/userInfo/createUserInfo/index.ts'
import { ensureAuthenticatedMiddleware } from '@account/infra/http/middlewares/ensure_authenticated'

export const createUserInfoController = (request: Request, response: Response) => {
  pipe(
    ensureAuthenticatedMiddleware(request, request.body),
    TE.mapLeft(httpErrorResponse => {
      const { statusCode, body } = httpErrorResponse

      response.status(statusCode).json(body)
    }),
    TE.map(({ body }) => {
      return pipe(
        createUserInfoUseCase(request, body),
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
