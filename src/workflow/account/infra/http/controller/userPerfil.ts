import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { userPerfil } from '../../../useCases/userPerfil'


export const userPerfilController = (request: Request, response: Response) => {

  pipe(
    userPerfil(request, request.body),
    TE.mapLeft(httpErrorResponse => {
      response.status(httpErrorResponse.statusCode).json(httpErrorResponse.body)
    }),
    TE.map(httpSuccessResponse => {
      const { statusCode, body } = httpSuccessResponse

      response.status(statusCode).json(body)
    })
  )()
}
