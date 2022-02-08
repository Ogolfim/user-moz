import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { ensureAuthenticatedMiddleware } from '../../middlewares/ensure_authenticated'
import { updateUserEmail } from '../../../../useCases/updateUser/update_user_email'

export const updateUserEmailController = (request: Request, response: Response) => {
  pipe(
    ensureAuthenticatedMiddleware(request, request.body),
    TE.mapLeft(httpErrorResponse => {
      const { statusCode, body } = httpErrorResponse

      response.status(statusCode).json(body)
    }),
    TE.map(({ body }) => {
      return pipe(
        updateUserEmail(request, body),
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
