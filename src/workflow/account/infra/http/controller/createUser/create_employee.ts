import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { createEmployeeUseCase } from '@account/useCases/createUser/create_employee'
import { ensureAuthenticatedMiddleware } from '@account/infra/http/middlewares/ensure_authenticated'

export const createEmployeeController = (request: Request, response: Response) => {
  pipe(
    ensureAuthenticatedMiddleware(request, request.body),
    TE.mapLeft(httpErrorResponse => {
      const { statusCode, body } = httpErrorResponse

      response.status(statusCode).json(body)
    }),
    TE.map(({ body }) => {
      return pipe(
        createEmployeeUseCase(request, body),
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
