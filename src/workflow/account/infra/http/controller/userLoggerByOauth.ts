import { Request, Response } from 'express'
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/function'
import { clientError, ok } from '../../../../../core/infra/HttpResponse'
import { userLoggerByOauth } from '../../../UserLoggers/userLoggerByOauth'
import { UserLoggerByOauthPropsValidate } from '../../validate/UserLoggerByOauthPropsValidate'
import { sendRefreshToken } from '../OAuth/sendRefreshToken'


export const userLoggerByOauthontroller = (request: Request, response: Response) => {
  const { name, email, serverName } = request.body

  const user = { name, email, serverName }
  
  pipe(
    user,
    UserLoggerByOauthPropsValidate,
    E.mapLeft(error => {
      const httpResponse = clientError(new Error(error.message))
      
      response
      .status(httpResponse.statusCode)
      .json(httpResponse.body)
    }),
    E.map(user => {
      
      pipe(
        user,
        userLoggerByOauth,
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