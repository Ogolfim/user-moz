import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/PathReporter'
import { CreateRefreshTokenValidator } from '@account/domain/contracts/Token/create_refresh_token'
import { ValidationError } from '@account/services/validate/errors/validation_error'
import { UUID } from 'io-ts-types'

export const createRefreshTokenPropsValidator: CreateRefreshTokenValidator = (data) => {
  return pipe(
    data,
    UUID.decode,
    E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
  )
}
