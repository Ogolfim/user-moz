import * as E from 'fp-ts/lib/Either'
import { UpdateUserNameProps } from '@account/domain/requiredFields/Users/update_user_name_props'
import { ValidationError } from '@account/services/validate/errors/validation_error'

interface unValidatedUser {
  name: string
  userId: string
}

export type UpdateUserNamePropsValidate = (data: unValidatedUser) => E.Either<ValidationError, UpdateUserNameProps>
