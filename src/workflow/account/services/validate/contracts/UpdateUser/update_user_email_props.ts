import * as E from 'fp-ts/lib/Either'
import { UpdateUserEmailProps } from '@account/domain/requiredFields/Users/update_user_email_props'
import { ValidationError } from '@account/services/validate/errors/validation_error'

interface unValidatedUser {
  email: string
  userId: string
}

export type UpdateUserEmailPropsValidate = (data: unValidatedUser) => E.Either<ValidationError, UpdateUserEmailProps>
