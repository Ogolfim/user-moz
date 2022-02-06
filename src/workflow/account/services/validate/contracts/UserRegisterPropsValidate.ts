import * as E from 'fp-ts/lib/Either'
import { UserRegisterProps } from '../../../domain/requiredFields/Users/UserRegisterProps'
import { ValidationError } from '../errors/ValidationError'

interface unValidatedUser {
  name: string
  email: string
  password: string
}

export type UserRegisterPropsValidate = (data: unValidatedUser) => E.Either<ValidationError, UserRegisterProps>
