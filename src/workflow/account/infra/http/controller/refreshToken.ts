import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { refreshToken } from '../../../useCases/refreshToken'
import { sendToken } from '../middlewares/sendToken'
import { ensureValidRefreshTokenMiddleware } from '../middlewares/ensureValidRefreshToken'

export const refreshTokenController = (request: Request, response: Response) => {
  pipe(
    ensureValidRefreshTokenMiddleware(request, request.body),
    TE.mapLeft(httpErrorResponse => {
      const { statusCode, body } = httpErrorResponse

      response.status(statusCode).json(body)
    }),
    TE.map(({ body }) => {
      return pipe(
        refreshToken(request, body),
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
    })
  )()
}
