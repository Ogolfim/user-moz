import { Request, Response } from 'express'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { findOrCreateCustomerUseCase } from '@bills/useCases/find_or_create_customer'

export const findOrCreateCustomerController = (request: Request, response: Response) => {
  pipe(
    findOrCreateCustomerUseCase(request, request.body),
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
