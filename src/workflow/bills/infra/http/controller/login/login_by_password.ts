import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { loginUseCase } from '@account/useCases/login/login'
import { sendToken } from '@account/infra/http/middlewares/send_token'

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
