import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { meAdminRegister } from '../../../../useCases/createMeAdmin/register_meadmin'
import { sendToken } from '../../OAuth/send_token'

export const meAdminRegisterController = (request: Request, response: Response) => {
  pipe(
    meAdminRegister(request, request.body),
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
