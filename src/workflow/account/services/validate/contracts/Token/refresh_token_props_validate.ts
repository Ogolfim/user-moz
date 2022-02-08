import * as E from 'fp-ts/lib/Either'
import { UserRefreshTokenProps } from '../../../../domain/requiredFields/Users/refresh_token_props'
import { ValidationError } from '../../errors/validation_error'

interface unRefreshTokenProps {
  id: string
  userId: string
}

export type UserRefreshTokenPropsValidate = (data: unRefreshTokenProps) => E.Either<ValidationError, UserRefreshTokenProps>
