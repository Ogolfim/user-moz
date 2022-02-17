import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { getUserTagsUseCase } from '@account/useCases/tags/get_user_tags'
import { ensureAuthenticatedMiddleware } from '@account/infra/http/middlewares/ensure_authenticated'

export const getUserTagsController = (request: Request, response: Response) => {
  pipe(
    ensureAuthenticatedMiddleware(request, request.body),
    TE.mapLeft(httpErrorResponse => {
      const { statusCode, body } = httpErrorResponse

      response.status(statusCode).json(body)
    }),
    TE.map(({ body }) => {
      return pipe(
        getUserTagsUseCase(request, body),
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
