import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { userPerfil } from '../../../useCases/userPerfil'

export const userPerfilController = (request: Request, response: Response) => {
  pipe(
    userPerfil(request, request.body),
    TE.mapLeft(httpErrorResponse => {
      const { statusCode, body } = httpErrorResponse
      return response.status(statusCode).json(body)
    }),
    TE.map(httpSuccessResponse => {
      const { statusCode, body } = httpSuccessResponse

      return response.status(statusCode).json(body)
    })
  )()
}
