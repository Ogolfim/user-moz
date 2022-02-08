import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { userLoggerByPassword } from '../../../../useCases/login/login_by_password'
import { sendToken } from '../../middlewares/send_token'

export const userLoggerByPasswordController = (request: Request, response: Response) => {
  pipe(
    userLoggerByPassword(request, request.body),
    TE.mapLeft(httpErrorResponse => {
      const { statusCode, body } = httpErrorResponse
      return response.status(statusCode).json(body)
    }),
    TE.map(httpSuccessResponse => {
      const { statusCode, body } = httpSuccessResponse

      sendToken(response, body.token)

      return response.status(statusCode).json(body)
    })
  )()
}
