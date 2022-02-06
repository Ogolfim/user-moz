import * as E from 'fp-ts/lib/Either'
import { UserRefreshTokenProps } from '../../../domain/requiredFields/Users/UserRefreshTokenProps'
import { ValidationError } from '../errors/ValidationError'

interface unRefreshTokenProps {
  id: string
  userId: string
}

export type UserRefreshTokenPropsValidate = (data: unRefreshTokenProps) => E.Either<ValidationError, UserRefreshTokenProps>
