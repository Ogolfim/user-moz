import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { resetPasswordRequest } from '../../../../useCases/updateUser/reset_password_request'

export const resetPasswordRequestController = (request: Request, response: Response) => {
  pipe(
    resetPasswordRequest(request, request.body),
    TE.mapLeft(httpErrorResponse => {
      const { statusCode, body } = httpErrorResponse
      return response.status(statusCode).json(body)
    }),
    TE.map(httpSuccessResponse => {
      const { statusCode, body } = httpSuccessResponse

      return response.status(statusCode).json(body)
    })
  )()
}
