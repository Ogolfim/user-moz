import { ValidationError } from '@core/domain/errors/validation_error'
import { UserSupportPropsValidator } from '@user/domain/Contracts/UserSupport'
import { UserSupportPropsCodec } from '@user/domain/requiredFields/user-support'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'

export const userSupportPropsValidator: UserSupportPropsValidator = (data) => {
  return pipe(
    data,
    UserSupportPropsCodec.decode,
    E.mapLeft(errors => new ValidationError('Invalid ' + failure(errors).join(', ')))
  )
}
