import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { ValidationError } from 'io-ts'
import { UserRegisterProps, UserRegisterPropsCodec } from '../../domain/requiredFields/Users/UserRegisterProps'

interface unValidatedUser {
  name: string
  email: string
  password: string
}


export const userRegisterPropsValidate = (data: unValidatedUser): E.Either<ValidationError, UserRegisterProps> => {

  return pipe(
    UserRegisterPropsCodec.decode(data),
    E.mapLeft(errors => errors[0]),
    E.map(user => user)
  )
}
