import { Request, Response } from 'express'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { clientError } from '../../../core/infra/HttpResponse'
import registerUser from '../../../workflow/registerUser/domain/user_cases/register_user'
import { validateUser } from '../validate/validate_user'


export const createAccount = (request: Request, response: Response) => {
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
        E.mapLeft(error => response.json(error.message)),
        E.map(user => response.json(user))
      )
    })
  )
}