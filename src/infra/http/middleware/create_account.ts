import { Request, Response } from 'express'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { clientError, created } from '../../../core/infra/HttpResponse'
import { registerUser } from '../../../workflow/registerUser/domain/user_cases/register_user'
import { validateUser } from '../validate/validate_user'


export const CreateAccountMiddleware = (request: Request, response: Response) => {
  const { name, email, password } = request.body

  const user = { name, email,password }
  
  pipe(
    user,
    validateUser,
    E.mapLeft(error => {
      const httpResponse = clientError(new Error(error.message))
      
      response
      .status(httpResponse.statusCode)
      .json(httpResponse.body)
    }),
    E.map(user => {
      
      pipe(
        user,
        registerUser,
        TE.mapLeft(error => {
          const httpResponse = clientError(error)
      
          response
          .status(httpResponse.statusCode)
          .json(httpResponse.body)
        }),
        TE.map(() => {
          const httpResponse = created()
      
          response
          .status(httpResponse.statusCode)
          .json(httpResponse.body)
        })
      )()
    })
  )
}