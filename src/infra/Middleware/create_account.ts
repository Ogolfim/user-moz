import { Request, Response } from 'express'
import * as E from 'fp-ts/lib/Either'
import createUser from '../../workflow/create_user/domain/contracts/CreateUser'
import { UserCodec } from '../../workflow/create_user/domain/requiredFields/User'


const createAcount = (request: Request, response: Response) => {

  const validatedUser = UserCodec.decode({
    name: 'Arli',
    email: 'arlindoboa@gmail.com',
    password: 'A1Gj?'
  })

  if(E.isLeft(validatedUser)) {
    console.log(validatedUser.left[0].message)  

    response.json('Error')
    return
  }

  createUser(validatedUser.right)
  response.json('Success')
}


export default createAcount