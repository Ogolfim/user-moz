import { clientError, unauthorized, HttpResponse } from '../../../../core/infra/HttpResponse'
import validateUser from '../../services/validation/validateUser'

import { User } from './requiredField'
import { Either } from './Result'

interface createdUser {
  name: string
  email: string
}

type UnValidatedUser = User

const createUser = (user: UnValidatedUser): Either<createdUser, Error> => {
  const validateResult = validateUser(user)

  

}
