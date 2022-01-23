import { fail, HttpResponse } from '../../../../core/infra/HttpResponse'
import { genPassword } from '../../services/password'
import validateUser from '../../services/validation/validateUser'

import { Either } from './Result'
import { isLeft } from 'fp-ts/lib/Either'
import { leftTask } from 'fp-ts/lib/TaskEither'

interface createdUser {
  name: string
  email: string
}


type UnValidatedUser = {
  name: string
  email: string
  password: string
}


const createUser = (user: UnValidatedUser): Either<createdUser, HttpResponse> => {

  const validateResult = validateUser(user)

  if(isLeft(validateResult)) {
    return validateResult
  }

  const {validName, ValidEmail, validPassword} = validateResult.right

  const hashedPassword = genPassword(validPassword)

  
  
}



