import * as E from 'fp-ts/lib/Either'
import { UserRegisterProps } from '../../../../domain/requiredFields/Users/register_user_props'
import { ValidationError } from '../../errors/validation_error'

interface unValidatedUser {
  name: string
  email: string
  password: string
}

export type UserRegisterPropsValidate = (data: unValidatedUser) => E.Either<ValidationError, UserRegisterProps>
