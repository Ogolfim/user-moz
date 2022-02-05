import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { userLoggerByOauth } from '../../../useCases/userLoggerByOauth'
import { sendRefreshToken } from '../middlewares/sendRefreshToken'

export const userLoggerByOauthController = (request: Request, response: Response) => {
  pipe(
    userLoggerByOauth(request, request.body),
    TE.mapLeft(httpErrorResponse => {
      const { statusCode, body } = httpErrorResponse
      return response.status(statusCode).json(body)
    }),
    TE.map(httpSuccessResponse => {
      const { statusCode, body } = httpSuccessResponse

      sendRefreshToken(response, body.token)

      return response.status(statusCode).json(body)
    })
  )()
}
