import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { tagCreator } from '../../../useCases/tagCreator'
import { ensureAuthenticatedMiddleware } from '../middlewares/ensureAuthenticated'

export const tagCreatorController = (request: Request, response: Response) => {

  pipe(
    ensureAuthenticatedMiddleware(request, request.body),
    TE.mapLeft(httpErrorResponse => {
      
      const { statusCode, body } = httpErrorResponse

      response.status(statusCode).json(body)
    }),
    TE.map(({body}) => {
      
      pipe(
        tagCreator(request, body),
        TE.mapLeft(httpErrorResponse => {
          const { statusCode, body } = httpErrorResponse
                    
          response.status(statusCode).json(body)
        }),
        TE.map(httpSuccessResponse => {
          const { statusCode, body } = httpSuccessResponse

          response.status(statusCode).json(body)
        })
      )()
    })
  )()
}