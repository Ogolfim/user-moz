import { Request, Response } from 'express'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { clientError, ok } from '../../../../../../core/infra/HttpResponse'
import { logUser } from '../../../use_form/services/log_user'
import { validateUser } from '../../validate/validate_user'
import { sendRefreshToken } from '../../../../infra/http/OAuth/sendRefreshToken'


export const LoginUsingFormController = (request: Request, response: Response) => {
  const { email, password } = request.body

  const user = { email, password }
  
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
        logUser,
        TE.mapLeft(error => {
          const httpResponse = clientError(error)
      
          response
          .status(httpResponse.statusCode)
          .json(httpResponse.body)
        }),
        TE.map(user => {

          const { name, id_token } = user
          const httpResponse = ok({ name })
      
          sendRefreshToken(response, id_token)

          response
          .status(httpResponse.statusCode)
          .json(httpResponse.body)
        })
      )()
    })
  )
}