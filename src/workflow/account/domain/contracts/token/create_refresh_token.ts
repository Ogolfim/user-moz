import * as E from 'fp-ts/Either'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { UUID } from 'io-ts-types'

export type CreateRefreshTokenValidator = (userId: string) => E.Either<ValidationError, UUID>
