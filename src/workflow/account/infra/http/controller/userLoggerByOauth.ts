import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { userLoggerByOauth } from '../../../useCases/userLoggerByOauth'
import { sendRefreshToken } from '../OAuth/sendRefreshToken'


export const userLoggerByOauthController = (request: Request, response: Response) => {

  pipe(
    userLoggerByOauth(request, request.body),
    TE.mapLeft(httpErrorResponse => {
      response.status(httpErrorResponse.statusCode).json(httpErrorResponse.body)
    }),
    TE.map(httpSuccessResponse => {
      const { statusCode, body } = httpSuccessResponse

      sendRefreshToken(response, body.token)

      response.status(statusCode).json(body)
    })
  )()
}