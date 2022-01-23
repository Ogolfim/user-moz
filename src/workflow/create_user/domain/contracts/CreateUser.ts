import { pipe } from 'fp-ts/lib/function'
import { clientError, HttpResponse } from '../../../../core/infra/HttpResponse'
import { genPassword } from '../../services/password'
import { User } from '../requiredFields/User'

import { Either } from './Result'

interface createdUser {
  name: string
  email: string
}


const createUser = (user: User): Either<createdUser, HttpResponse> => {

  


  const hashedPassword = genPassword(user.password)

  

  return {
    _tag: "Right",
    right: {
      name: 'name',
      email: 'email'
  } }
}


export default createUser
