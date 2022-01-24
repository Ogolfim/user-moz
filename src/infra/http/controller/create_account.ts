import { Request, Response } from 'express'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { clientError, HttpResponse } from '../../../core/infra/HttpResponse'
import createUser from '../../../workflow/create_user/domain/contracts/CreateUser'
import { validateUser } from '../validate/validate_user'


const createAccount = (request: Request, response: Response) => {
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
        createUser,
        E.mapLeft(error => response.json(error.message)),
        E.map(user => response.json(user))
      )
    })
  )

  // if(E.isLeft(validatedUser)) {
  //   const httpResponse = clientError(
  //     new Error(validatedUser.left[0].message)
  //   )

  //   response
  //   .status(httpResponse.statusCode)
  //   .json(httpResponse.body)
  //   return
  // }

}


export default createAccount