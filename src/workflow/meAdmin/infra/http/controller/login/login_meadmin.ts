import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { meAdminLogger } from '@meAdmin/useCases/login/login_meadmin'
import { sendToken } from '@meAdmin/infra/http/middlewares/send_token'

export const meAdminLoggerController = (request: Request, response: Response) => {
  pipe(
    meAdminLogger(request, request.body),
    TE.mapLeft(httpErrorResponse => {
      response.status(httpErrorResponse.statusCode).json(httpErrorResponse.body)
    }),
    TE.map(httpSuccessResponse => {
      const { statusCode, body } = httpSuccessResponse

      sendToken(response, body.token)

      return response.status(statusCode).json(body)
    })
  )()
}
