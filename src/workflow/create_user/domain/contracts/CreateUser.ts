import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { genPassword } from '../../services/password'
import { User } from '../requiredFields/User'

interface createdUser {
  name: string
  email: string
}


const createUser = (user: User): E.Either<Error, createdUser> => {

  


  const hashedPassword = genPassword(user.password)

  

  return {
    _tag: "Right",
    right: {
      name: 'name',
      email: 'email'
  } }
}


export default createUser
