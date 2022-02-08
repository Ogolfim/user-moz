import * as E from 'fp-ts/lib/Either'
import { ResetPasswordProps } from '@account/domain/requiredFields/Users/reset_password_props'
import { ValidationError } from '@account/services/validate/errors/validation_error'

interface unValidatedUser {
  userId: string
  password: string
}

export type ResetPasswordPropsValidate = (data: unValidatedUser) =>
E.Either<ValidationError, ResetPasswordProps>
