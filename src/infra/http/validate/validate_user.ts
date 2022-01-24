import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { ValidationError } from 'io-ts'
import { User, UserCodec } from '../../../workflow/create_user/domain/requiredFields/User'

interface unValidatedUser {
  name: string
  email: string
  password: string
}


export const validateUser = (data: unValidatedUser): E.Either<ValidationError, User> => {

  return pipe(
    UserCodec.decode(data),
    E.mapLeft(errors => errors[0]),
    E.map(user => user)
  )
}
