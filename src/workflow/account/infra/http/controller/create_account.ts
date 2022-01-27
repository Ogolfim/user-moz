import { Request, Response } from 'express'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { clientError, created } from '../AccountHttpResponse'
import { registerUser } from '../../../register_user/services/register_user'
import { validateUser } from '../../validate/validate_user'
import { sendRefreshToken } from '../OAuth/sendRefreshToken'


export const CreateAccountController = (request: Request, response: Response) => {
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
        TE.map(user => {

          const { name, id_token } = user
          const httpResponse = created({ name })
      
          sendRefreshToken(response, id_token)

          response
          .status(httpResponse.statusCode)
          .json(httpResponse.body)
        })
      )()
    })
  )
}