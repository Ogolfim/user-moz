import * as E from 'fp-ts/lib/Either'
import { UserRefreshTokenProps } from '@account/domain/requiredFields/Users/refresh_token_props'
import { ValidationError } from '@account/services/validate/errors/validation_error'

interface unRefreshTokenProps {
  id: string
  userId: string
}

export type UserRefreshTokenPropsValidate = (data: unRefreshTokenProps) => E.Either<ValidationError, UserRefreshTokenProps>
