import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'
import { failure } from 'io-ts/lib/PathReporter'
import { EmailCodec } from '@account/domain/requiredFields/email'
import { ResetPasswordRequestPropsValidate } from '@account/services/validate/contracts/UpdateUser/reset_password_request_props'
import { ValidationError } from '@account/services/validate/errors/validation_error'

export const resetPasswordRequestPropsValidate: ResetPasswordRequestPropsValidate = (data) => {
  return pipe(
    data,
    EmailCodec.decode,
    E.mapLeft(errors => new ValidationError(failure(errors).join(', ') + ' invalido'))
  )
}
