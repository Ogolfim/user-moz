import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { userAdderToTags } from '../../../useCases/userAdderToTags'

export const userAdderToTagsController = (request: Request, response: Response) => {
  pipe(
    userAdderToTags(request, request.body),
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
