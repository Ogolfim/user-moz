import { Request, Response } from 'express'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { clientError, ok } from '../../../../../core/infra/HttpResponse'
import { userLoggerByPassword } from '../../../UserLoggers/userLoggerByPassword'
import { UserLoggerByPasswordPropsValidate } from '../../validate/UserLoggerByPasswordPropsValidate'
import { sendRefreshToken } from '../OAuth/sendRefreshToken'


export const userLoggerByPasswordController = (request: Request, response: Response) => {
  const { email, password } = request.body

  const user = { email, password }
  
  pipe(
    user,
    UserLoggerByPasswordPropsValidate,
    E.mapLeft(error => {
      const httpResponse = clientError(new Error(error.message))
      
      response
      .status(httpResponse.statusCode)
      .json(httpResponse.body)
    }),
    E.map(user => {
      
      pipe(
        user,
        userLoggerByPassword,
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