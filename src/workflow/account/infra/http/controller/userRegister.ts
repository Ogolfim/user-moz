import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { userRegister } from '../../../useCases/userRegister'
import { sendRefreshToken } from '../OAuth/sendRefreshToken'

export const userRegisterController = (request: Request, response: Response) => {
  pipe(
    userRegister(request, request.body),
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
