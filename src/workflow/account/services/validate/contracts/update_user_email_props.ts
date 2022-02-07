import * as E from 'fp-ts/lib/Either'
import { UpdateUserEmailProps } from '../../../domain/requiredFields/Users/update_user_email_props'
import { ValidationError } from '../errors/validation_error'

interface unValidatedUser {
  email: string
  userId: string
}

export type UpdateUserEmailPropsValidate = (data: unValidatedUser) => E.Either<ValidationError, UpdateUserEmailProps>
