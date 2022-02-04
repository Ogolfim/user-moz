import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { tagCreator } from '../../../useCases/tagCreator'
import { ensureAuthenticatedMiddleware } from '../middlewares/EnsureAuthenticated'

export const tagCreatorController = (request: Request, response: Response) => {

  pipe(
    ensureAuthenticatedMiddleware(request, request.body),
    TE.map(({body}) => {      
      return pipe(
        tagCreator(request, body),
        TE.mapLeft(httpErrorResponse => {
          response.status(httpErrorResponse.statusCode).json(httpErrorResponse.body)
        }),
        TE.map(httpSuccessResponse => {
          const { statusCode, body } = httpSuccessResponse

          response.status(statusCode).json(body)
        })
      )()
    })
  )()
}