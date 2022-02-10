import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { refreshToken } from '@account/useCases/token/refresh_token'
import { sendToken } from '@account/infra/http/middlewares/send_token'
import { ensureValidRefreshTokenMiddleware } from '@account/infra/http/middlewares/ensure_valid_refresh_token'

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
