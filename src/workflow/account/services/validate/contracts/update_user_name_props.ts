import * as E from 'fp-ts/lib/Either'
import { UpdateUserNameProps } from '../../../domain/requiredFields/Users/update_user_name_props'
import { ValidationError } from '../errors/validation_error'

interface unValidatedUser {
  name: string
  userId: string
}

export type UpdateUserNamePropsValidate = (data: unValidatedUser) => E.Either<ValidationError, UpdateUserNameProps>
