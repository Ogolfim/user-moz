import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { userAdderToTags } from '../../../useCases/userAdderToTags'

export const userAdderToTagsController = (request: Request, response: Response) => {

  pipe(
    userAdderToTags(request, request.body),
    TE.mapLeft(httpErrorResponse => {
      response.status(httpErrorResponse.statusCode).json(httpErrorResponse.body)
    }),
    TE.map(httpSuccessResponse => {
      const { statusCode, body } = httpSuccessResponse

      response.status(statusCode).json(body)
    })
  )()
}