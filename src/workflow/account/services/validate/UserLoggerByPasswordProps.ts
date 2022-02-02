import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { ValidationError } from 'io-ts'
import { UserLoggerByPasswordProps, UserLoggerByPasswordPropsCodec } 
from '../../domain/requiredFields/Users/UserLoggerByPasswordProps'

interface unValidatedUser {
  email: string
  password: string
}


export const UserLoggerByPasswordPropsValidate = (data: unValidatedUser): 
E.Either<ValidationError, UserLoggerByPasswordProps> => {

  return pipe(
    UserLoggerByPasswordPropsCodec.decode(data),
    E.mapLeft(errors => errors[0]),
    E.map(user => user)
  )
}