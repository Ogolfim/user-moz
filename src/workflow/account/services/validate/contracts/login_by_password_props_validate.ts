import * as E from 'fp-ts/lib/Either'
import { UserLoggerByPasswordProps } from '../../../domain/requiredFields/Users/loging_by_password_props'
import { ValidationError } from '../errors/validation_error'

interface unValidatedUser {
  email: string
  password: string
}

export type UserLoggerByPasswordPropsValidate = (data: unValidatedUser) =>
E.Either<ValidationError, UserLoggerByPasswordProps>
