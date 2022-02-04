import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { meAdminRegister } from '../../../useCases/meAdminRegister'
import { sendRefreshToken } from '../OAuth/sendRefreshToken'


export const meAdminRegisterController = (request: Request, response: Response) => {

  pipe(
    meAdminRegister(request, request.body),
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
