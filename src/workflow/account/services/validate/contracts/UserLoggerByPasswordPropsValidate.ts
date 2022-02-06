import * as E from 'fp-ts/lib/Either'
import { UserLoggerByPasswordProps } from '../../../domain/requiredFields/Users/UserLoggerByPasswordProps'
import { ValidationError } from '../errors/ValidationError'

interface unValidatedUser {
  email: string
  password: string
}

export type UserLoggerByPasswordPropsValidate = (data: unValidatedUser) =>
E.Either<ValidationError, UserLoggerByPasswordProps>
